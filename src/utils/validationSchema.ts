export const passwordValidate = {
  required: {
    value: true,
    message: "Password is required!",
  },
  minLength: {
    value: 6,
    message: "Password must contain at least 6 and less than 14 characters",
  },
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+=?;,./{}|":<>[\]\\'~_`-])[A-Za-z\d!@#$%^&*()+=?;,./{}|":<>[\]\\'~_`-]{6,14}$/,
    message:
      "Please give at least one number, one lower and upper case letter, one special character",
  },
};
export const emailValidate = {
  required: {
    value: true,
    message: "Email is required!",
  },
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address!",
  },
};
export const phoneNumberValidate = {
  required: {
    value: true,
    message: "Email is required!",
  },
  pattern: {
    value: /^(?:\+?88|\+88)?01[1-9]\d{8}$/,
    message: "Please enter a valid phone number!",
  },
};
