import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import Profile from '../../entities/profile';
import validateInputs from '../../validators/loginProfile';


interface ProfileData {
  email: string;
  password: string;
}

const loginProfile = async (data: ProfileData) => {
  try {
    const { message, isValid } = validateInputs(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { email, password } = data;

    const profile = await Profile.findOneBy({ email });

    if (!profile) {
      throw new Error("Incorrect email or password");
    }

    const isMatch = await bcrypt.compare(password, profile.password);

    if (!isMatch) {
      throw new Error("Incorrect email or password");
    }

    const token = jwt.sign({ id: profile.id }, process.env.SECRET_OR_KEY);

    return { token, loggedIn: true, ...profile, password: null };
  } catch (err) {
    throw err;
  }
};

export default loginProfile;
