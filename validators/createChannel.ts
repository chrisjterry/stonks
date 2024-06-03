import Validator from 'validator';

import validText from './validText';

interface IChannelProps {
  title: string;
  description: string;
}

const validateInputs = (data: IChannelProps) => {
  let { title, description } = data;

  title = validText(title) ? title : "";
  description = validText(title) ? title : "";

  if (Validator.isEmpty(title)) {
    return { message: "Title field is required", isValid: false };
  }

  if (Validator.isEmpty(description)) {
    return { message: "Description field is required", isValid: false };
  }

  return {
    message: "",
    isValid: true
  };
};

export default validateInputs;
