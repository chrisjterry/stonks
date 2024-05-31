import validateInputs from '../../validators/notifyFollowers';
import verifyProfile from '../../validators/verifyProfile';
import Notification from '../../entities/notification';

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
      notifications.push({
        text: data.text,
        profile: follow.follower
      });
    });

    const bulkNotifications = Notification.create(notifications)
    await Notification.insert(bulkNotifications);

    return { notifications: bulkNotifications };
  } catch (err) {
    throw err;
  }
};

export default notifyFollowers;
