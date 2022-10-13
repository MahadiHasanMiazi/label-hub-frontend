/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "../../../utils/test-utils";
import { ForgetPassword } from "../ForgetPassword";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

interface IForgetPass {
  email?: string;
}
const MockForgetPass = () => {
  return (
    <BrowserRouter>
      <ForgetPassword></ForgetPassword>
    </BrowserRouter>
  );
};

const typeIntoForm = (props: IForgetPass) => {
  const { email } = props;
  const emailElement =  screen.getByLabelText('Email')
  if (email) {
    userEvent.type(emailElement, email);
  }
  return {
    emailElement,
  };
};

describe("Testing Forget Password Form", () => {
  beforeEach(() => {
    render(<MockForgetPass></MockForgetPass>);
  });

  it("Should disable  link send button initially", () => {
    const linkSendBtn = screen.getByRole("button", {
      name: /Send Reset Link/i,
    });
    expect(linkSendBtn).toBeDisabled();
  });

  it("Should show  validation error if wrong email given", () => {
    typeIntoForm({ email: "akibgmail.com" });
    const emailErrorMsg = screen.queryByText(
      /Please enter a valid email address/i
    );
  
    expect(emailErrorMsg).toHaveStyle({ display: 'block' });
  });
});
