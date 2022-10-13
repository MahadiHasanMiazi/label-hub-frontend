import { IError } from "./validationType";
import { passwordValidate, emailValidate } from "./validationSchema";
export const validate = (name: string, value: string) => {
  const errors: IError = {} as IError;

  if (name === "username") {
    if (!value) {
      errors.username = emailValidate.required.message;
    } else if (!emailValidate.pattern.value.test(value)) {
      errors.username = emailValidate.pattern.message;
    }
  }
  if (name === "email") {
    if (!value) {
      errors.email = emailValidate.required.message;
    } else if (!emailValidate.pattern.value.test(value)) {
      errors.email = emailValidate.pattern.message;
    }
  }
  if (name === "password" || name === "new_password") {
    if (!value) {
      errors.password = passwordValidate.required.message;
    } else if (value.length < passwordValidate.minLength.value) {
      errors.password = passwordValidate.minLength.message;
    } else if (!passwordValidate.pattern.value.test(value)) {
      errors.password = passwordValidate.pattern.message;
    }
  }

  return errors;
};
