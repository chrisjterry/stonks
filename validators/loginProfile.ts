import Validator from 'validator';

import validText from './validText';

interface IProfileProps {
  email: string;
  password: string;
}

const validateInputs = (data: IProfileProps) => {
  let { email, password } = data;

  email = validText(email) ? email : "";
  password = validText(password) ? password : "";

  if (!Validator.isEmail(email)) {
    return { message: "Email is invalid", isValid: false };
  }

  if (Validator.isEmpty(email)) {
    return { message: "Email field is required", isValid: false };
  }

  if (Validator.isEmpty(password)) {
    return { message: "Password field is required", isValid: false };
  }

  return {
    message: "",
    isValid: true
  };
};

export default validateInputs;
