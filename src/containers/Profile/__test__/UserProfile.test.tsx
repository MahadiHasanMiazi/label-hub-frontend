/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "../../../utils/test-utils";
import { UserProfile } from "../UserProfile";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

const MockUserProfile = () => {
  return (
    <BrowserRouter>
      <UserProfile></UserProfile>
    </BrowserRouter>
  );
};

describe("Testing user profile Form", () => {
  beforeEach(() => {
    render(<MockUserProfile></MockUserProfile>);
  });

  describe("User profile  testing", () => {
    it("Should be able to change gender option", () => {
      const genderOptions = screen.getByLabelText(
        /Gender/i
      ) as HTMLSelectElement;
      expect(genderOptions.value).toBe("Male");
      userEvent.selectOptions(genderOptions, "Male");

      userEvent.selectOptions(genderOptions, "Female");
      expect(genderOptions.value).toBe("Female");
    });

    it("User role option should be disabled", () => {
      const userRole = screen.getByPlaceholderText(/Annotator/i);
      expect(userRole).toBeDisabled();
    });
  });
});
