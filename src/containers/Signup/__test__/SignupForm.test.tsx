/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "../../../utils/test-utils";
import { SignupForm } from "../SignupForm";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
interface ISignup {
  password?: string;
  email?: string;
  confirmPassword?: string;
}
const MockSignup = () => {
  return (
    <BrowserRouter>
      <SignupForm></SignupForm>
    </BrowserRouter>
  );
};

const typeIntoSignupForm = (props: ISignup) => {
  const { email, password, confirmPassword } = props;
  const emailElement = screen.queryByLabelText("Email");
  const passElement = screen.queryByLabelText("Password");
  const confpassElement = screen.queryByLabelText("Confirm Password");

  if (email) {
    userEvent.type(emailElement, email);
  }
  if (password) {
    userEvent.type(passElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confpassElement, confirmPassword);
  }

  return {
    emailElement,
    passElement,
    confpassElement,
  };
};

describe("Testing signup Form", () => {
  beforeEach(() => {
    render(<MockSignup></MockSignup>);
  });

  describe("Signup validation testing", () => {
    it("signup email validation error if wrong email passed", () => {
      typeIntoSignupForm({ email: "akibgmail.com" });
      const emailErrorMsg = screen.queryByText(
        /Please enter a valid email address/i
      );
      expect(emailErrorMsg).toBeVisible();
    });

    it("Should show password validation error if not correctly formatted", () => {
      typeIntoSignupForm({ password: "Akib123" });
      const passwordErrorMsg = screen.queryByText("Password must contain at least 6 characters and Please give at least one number, one lower and upper case letter, one special character"
      );

      expect(passwordErrorMsg).toBeVisible();
    });
  });
});
