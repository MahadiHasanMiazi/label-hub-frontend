import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import "./PasswordShowHide.css";
interface PasswordShowHideProps {
  passwordType: string;
  setPasswordType: any;
}

export const PasswordShowHide: React.FC<PasswordShowHideProps> = ({
  passwordType,
  setPasswordType,
}) => {
  const togglePassword = (e: any) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <div className="password-showhide-btn">
      <button className="password-showhide-icon" onClick={togglePassword}>
        {passwordType === "password" ? (
          <HiOutlineEyeOff></HiOutlineEyeOff>
        ) : (
          <HiOutlineEye></HiOutlineEye>
        )}
      </button>
    </div>
  );
};
