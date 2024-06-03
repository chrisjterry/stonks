import validateInputs from '../../validators/notifyFollowers';
import verifyProfile from '../../validators/verifyProfile';
import Notification from '../../entities/notification';
import notificationMailer from '../../utils/email/notificationMailer';

interface NotificationData {
  token: string;
  text: string;
}

const notifyFollowers = async (data: NotificationData) => {
  try {
    const profile = await verifyProfile(data);
    const { message, isValid } = validateInputs(data);

    if (!profile) {
      throw new Error('Invalid Profile');
    }
    if (!isValid) {
      throw new Error(message);
    }

    const follows = profile.followers;
    let notifications = []

    follows.forEach(follow => {
      const { follower } = follow;
      const { text } = data;

      if (follower.active) {
        notifications.push({
          text,
          profile: follower
        });
      } else {
        notificationMailer({
          senderUsername: profile.username,
          recipient: follower.email,
          content: text, 
        })
      }
    });

    const bulkNotifications = Notification.create(notifications)
    await Notification.insert(bulkNotifications);

    return { notifications: bulkNotifications };
  } catch (err) {
    throw err;
  }
};

export default notifyFollowers;
