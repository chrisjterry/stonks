import Validator from 'validator';

import validText from './validText';

interface IFollowProps {
  profileId: string;
}

const validateInputs = (data: IFollowProps) => {
  let { profileId } = data;

  profileId = validText(profileId) ? profileId : "";

  if (Validator.isEmpty(profileId)) {
    return { message: "Profile ID field is required", isValid: false };
  }

  return {
    message: "",
    isValid: true
  };
};

export default validateInputs;
