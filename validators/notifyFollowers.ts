import Validator from 'validator';

import validText from './validText';

interface IFollowProps {
  text: string;
}

const validateInputs = (data: IFollowProps) => {
  let { text } = data;

  text = validText(text) ? text : "";

  if (Validator.isEmpty(text)) {
    return { message: "Text field is required", isValid: false };
  }

  return {
    message: "",
    isValid: true
  };
};

export default validateInputs;
