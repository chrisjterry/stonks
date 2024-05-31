import Profile from '../entities/profile';
import * as jwt from 'jsonwebtoken';

interface ITokenProps {
  token: string;
}

const verifyProfile = async (data: ITokenProps) => {
  try {
    const { token } = data;
    const decoded = jwt.verify(token, process.env.SECRET_OR_KEY);
    const { id } = decoded;

    const profile = await Profile.findOneBy({ id });
    return profile;
  } catch (err) {
    return false;
  }
};

export default verifyProfile;
