import Profile from '../../../entities/profile';
import Comment from '../../../entities/comment';
import Channel, { Statuses } from '../../../entities/channel';
import Role, { Roles } from '../../../entities/role';
import findOrCreateRole from './findOrCreateRole';
import updateChannel from './updateChannel';

interface HandleCommentData {
  sender: string;
  message: string;
  channel: Channel;
}

const handleComment = async (data: HandleCommentData) => {
  try {
    const { sender, message, channel } = data;
    const profile = await Profile.findOneBy({ username: sender });
    const role = await Role.findOne({
      where: {
        profile: { id: profile.id },
        channel: { id: channel.id },
      }
    });
    
    const comment = new Comment();
    comment.profile = profile;
    comment.text = message;
    await comment.save();

    if (message[0] !== '/') return;

    const ADMIN_ROLES = [Roles.SUPERADMIN, Roles.HOST, Roles.ADMIN];
    let target;
    if (message.includes('@')) {
      const targetUsername = message.split('@').pop();
      target = await Profile.findOneBy({ username: targetUsername });
    }

    if (message.includes('/set admin')) {
      if (role.role !== Roles.HOST) return;
      await findOrCreateRole({ profile: target, channel, role: Roles.ADMIN });
    } else if (message.includes('/unset admin')) {
      if (role.role !== Roles.HOST) return;
      await findOrCreateRole({ profile: target, channel, role: Roles.GUEST });
    } else if (message.includes('/mute')) {
      if (!ADMIN_ROLES.includes(role.role)) return;
      await findOrCreateRole({ profile: target, channel, role: Roles.MUTED });
    } else if (message.includes('/unmute')) {
      if (!ADMIN_ROLES.includes(role.role)) return;
      await findOrCreateRole({ profile: target, channel, role: Roles.GUEST });
    } else if (message.includes('/ban')) {
      if (!ADMIN_ROLES.includes(role.role)) return;
      await findOrCreateRole({ profile: target, channel, role: Roles.BANNED });
    } else if (message.includes('/unban')) {
      if (!ADMIN_ROLES.includes(role.role)) return;
      await findOrCreateRole({ profile: target, channel, role: Roles.GUEST });
    } else if (message.includes('/suspend')) {
      if (role.role !== Roles.SUPERADMIN) return;
      await updateChannel({ channel, status: Statuses.SUSPENDED });
    } else if (message.includes('/set title')) {
      if (!ADMIN_ROLES.includes(role.role)) return;
      await updateChannel({ channel, title: message.split('/set title ')[1] });
    } else if (message.includes('/set description')) {
      if (!ADMIN_ROLES.includes(role.role)) return;
      await updateChannel({ channel, title: message.split('/set description ')[1] });
    }

    return message;
  } catch (err) {
    throw err;
  }
};

export default handleComment
