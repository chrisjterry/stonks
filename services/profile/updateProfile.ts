import verifyProfile from '../../validators/verifyProfile';

interface ProfileData {
  token: string;
  fullName: string;
  username: string;
  avatar?: string;
}

const updateProfile = async (data: ProfileData) => {
  try {
    const profile = await verifyProfile(data);

    if (!profile) {
      throw new Error('Invalid Profile');
    }

    const { fullName, username, avatar } = data;

    if (fullName) profile.fullName = fullName;
    if (username) profile.username = username;
    if (avatar) profile.avatar = avatar;
    await profile.save();

    return { ...profile, password: null };
  } catch (err) {
    throw err;
  }
};

export default updateProfile;
