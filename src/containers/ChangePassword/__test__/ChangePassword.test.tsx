/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "../../../utils/test-utils";
import { ChangePassword } from "../ChangePassword";
import userEvent from "@testing-library/user-event";

interface ICngPass {
  password?: string;
}
const MockChangePass = () => {
  return <ChangePassword></ChangePassword>;
};

const typeIntoForm = (props: ICngPass) => {
  const { password } = props;
  const passElement = screen.getByLabelText('New Password')

  if (password) {
    userEvent.type(passElement, password);
  }

  return {
    passElement,
  };
};


describe("Testing change password Form", () => {
  beforeEach(() => {
    render(<MockChangePass></MockChangePass>);
  });

  describe("Change password  testing", () => {
    it("Should disable  update password button initially", () => {
      const changePassBtn = screen.getByRole("button", {
        name: /Update Password/i,
      });
      expect(changePassBtn).toBeDisabled();
    });

    it("Should show change password validation error if less than 6", () => {
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
