import Profile from '../../../entities/profile';
import Channel from '../../../entities/channel';
import Role, { Roles } from '../../../entities/role';

interface RoleData {
  profile: Profile;
  channel: Channel;
  role: Roles;
}

const findOrCreateRole = async (data: RoleData) => {
  try {
    const { profile, channel, role } = data;

    const existingRole = await Role.findOne({
      where: {
        profile: { id: profile.id },
        channel: { id: channel.id },
      }
    })

    if (existingRole) {
      existingRole.role = role;
      await existingRole.save();
      return existingRole;
    } else {
      const newRole = new Role();
      newRole.profile = profile;
      newRole.channel = channel;
      newRole.role = role;
      await newRole.save();
      return newRole
    }
  } catch (err) {
    throw err;
  }
};

export default findOrCreateRole;
