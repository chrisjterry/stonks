import validateInputs from '../../validators/toggleFollow';
import verifyProfile from '../../validators/verifyProfile';
import Follow from '../../entities/follow';
import Profile from '../../entities/profile';

interface FollowData {
  token: string;
  profileId: string;
}

const unfollowProfile = async (data: FollowData) => {
  try {
    const follower = await verifyProfile(data);
    const { message, isValid } = validateInputs(data);

    if (!follower) {
      throw new Error('Invalid Profile');
    }
    if (!isValid) {
      throw new Error(message);
    }

    const followed = await Profile.findOneBy({ id: Number(data.profileId) });

    const follow = await Follow.findOne({
      where: {
        follower: { id: follower.id },
        followed: { id: followed.id },
      },
    });
    await Follow.remove(follow);

    return {};
  } catch (err) {
    throw err;
  }
};

export default unfollowProfile;
