import Validator from 'validator';

import validText from './validText';

interface IProfileProps {
  fullName: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

const validateInputs = (data: IProfileProps) => {
  let { fullName, username, email, password } = data;

  fullName = validText(fullName) ? fullName : "";
  username = validText(username) ? username : "";
  email = validText(email) ? email : "";
  password = validText(password) ? password : "";

  if (Validator.isEmpty(fullName)) {
    return { message: "Full Name field is required", isValid: false };
  }

  if (Validator.isEmpty(username)) {
    return { message: "Username field is required", isValid: false };
  }

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
