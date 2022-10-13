/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "../../../utils/test-utils";
import { LoginForm } from "../LoginForm";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

interface ILogin {
  password?: string;
  email?: string;
}
const MockLogin = () => {
  return (
    <BrowserRouter>
      <LoginForm></LoginForm>
    </BrowserRouter>
  );
};

const typeIntoForm = (props: ILogin) => {
  const { email, password } = props;
  const emailElement = screen.getByPlaceholderText("example@mail.com");
  const passElement = screen.getByPlaceholderText("******");

  if (email) {
    userEvent.type(emailElement, email);
  }
  if (password) {
    userEvent.type(passElement, password);
  }

  return {
    emailElement,
    passElement,
  };
};

const clickSubmit = () => {
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });
  userEvent.click(submitBtnElement);
};


describe("Testing Login Form", () => {
  beforeEach(() => {
    render(<MockLogin></MockLogin>);
  });

  describe("Login validation testing", () => {
    it("Should show email validation error if wrong email passed", () => {
      typeIntoForm({ email: "akibgmail.com" });
      const emailErrorMsg = screen.queryByText(
        /Please enter a valid email address!/i
      );
      expect(emailErrorMsg).toBeInTheDocument();
    });

    it("Should show password validation error if less than 6", () => {
      typeIntoForm({ password: "asdf" });
      const passwordErrorMsg = screen.queryByText(
        /Password must contain at least 6 and less than 14 characters/i
      );
      expect(passwordErrorMsg).toBeInTheDocument();
    });
    it("Should show password validation error if  not correctly formatted", () => {
      typeIntoForm({ password: "asdffghfghf456" });
      const passwordErrorMsg = screen.queryByText(
        /Please give at least one number, one lower and upper case letter, one special character/i
      );
      expect(passwordErrorMsg).toBeInTheDocument();
    });
    it("showing toast error after submit", () => {
      typeIntoForm({ email: "akb@gmail.com", password: "Akib@@123" });
      clickSubmit();
      const toastError = screen.queryByText(/Incorrect email or password/i);
      expect(toastError).not.toBeInTheDocument();
    });
  });
});
