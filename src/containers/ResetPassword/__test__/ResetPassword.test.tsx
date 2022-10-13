/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "../../../utils/test-utils";
import { ResetPassword } from "../ResetPassword";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

interface IResetPass {
  password?: string;
}
const MockResetPass = () => {
  return (
    <BrowserRouter>
      <ResetPassword></ResetPassword>
    </BrowserRouter>
  );
};

const typeIntoForm = (props: IResetPass) => {
  const { password } = props;
  const passElement = screen.getByLabelText("New Password");

  if (password) {
    userEvent.type(passElement, password);
  }

  return {
    passElement,
  };
};

describe("Testing change password Form", () => {
  beforeEach(() => {
    render(<MockResetPass></MockResetPass>);
  });

  describe("Reset password  testing", () => {
    it("Should disable  Reset password button initially", () => {
      const resetPassBtn = screen.getByRole("button", {
        name: /Reset Password/i,
      });
      expect(resetPassBtn).toBeDisabled();
    });

    it("Should show reset password validation error if less than 6", () => {
      typeIntoForm({ password: "123" });
      const passwordErrorMsg = screen.queryByText(
        /Password must contain at least 6 and less than 14 characters/i
      );
      expect(passwordErrorMsg).toBeInTheDocument();
    });
    it("Should show incorrectly formatted password error", () => {
      typeIntoForm({ password: "123hhyt" });
      const passwordErrorMsg = screen.queryByText(
        /Please give at least one number, one lower and upper case letter, one special character/i
      );
      expect(passwordErrorMsg).toBeInTheDocument();
    });
  });
});
