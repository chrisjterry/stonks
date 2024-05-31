import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import validateInputs from '../../validators/registerProfile';
import Profile from '../../entities/profile';

interface ProfileData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

const registerProfile = async (data: ProfileData) => {
  try {
    const { message, isValid } = validateInputs(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { fullName, username, email, password, avatar } = data;
    const existingProfile = await Profile.findOneBy({ email });
    const existingUsername = await Profile.findOneBy({ username });

    if (existingProfile) {
      throw new Error("This profile already exists");
    }

    if (existingUsername) {
      throw new Error("This username is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profile = new Profile();
    profile.fullName = fullName;
    profile.username = username;
    profile.email = email;
    profile.password = hashedPassword;
    if (avatar) profile.avatar = avatar;
    await profile.save();

    const token = jwt.sign({ id: profile.id }, process.env.SECRET_OR_KEY);

    return { token, loggedIn: true, ...profile, password: null };
  } catch (err) {
    throw err;
  }
};

export default registerProfile;
