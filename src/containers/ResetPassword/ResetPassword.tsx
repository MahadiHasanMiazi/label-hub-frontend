import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { ActionButton } from "../../components/Button/ActionButton";
import { InputField } from "../../components/InputField/InputField";
import { PasswordShowHide } from "../../components/PasswordShowHide/PasswordShowHide";
import { resetAuth, resetPassword } from "../../features/auth/authSlice";
import { IError } from "../../utils/validationType";
import { Branding } from "./../../components/Branding/Branding";
import { ErrorMessage } from "./../../components/ErrorMessage/ErrorMessage";
import { LogoWithTitle } from "./../../components/LogoWithTitle/LogoWithTitle";
import Spinner from "./../../components/Spinner/Spinner";
import { validate } from "./../../utils/validationFunction";
import "./ResetPassword.css";
interface ICngPassData {
  reset_token: string;
  new_password: string;
  confirm_password: string;
}

export const ResetPassword = () => {
  let [searchParams] = useSearchParams();
  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [resetPassData, setResetPassData] = useState<ICngPassData>({
    reset_token: "",
    new_password: "",
    confirm_password: "",
  });
  const [formErrors, setFormErrors] = useState<IError>({} as IError);
  const dispatch = useDispatch();
  const { isLoading, isError, message, isPassChanged } = useSelector(
    (state: RootState) => state.auth
  );
  const tokenFromUrl = searchParams.get("reset_token");
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (message[0]) {
      toast.error(message[0].msg);
    }

    if (!isError && isPassChanged) {
      toast.success("Password changed successfully");
      navigate("/login");
    }

    dispatch(resetAuth());
  }, [isError, message, dispatch, isPassChanged, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setResetPassData({ ...resetPassData, [name]: value });

    setFormErrors(validate(name, value));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const passWithtoken: ICngPassData = {
      reset_token: tokenFromUrl,
      new_password: resetPassData.new_password,
      confirm_password: resetPassData.confirm_password,
    };
    dispatch(resetPassword(passWithtoken));
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center align-items-center reset-form ">
            <Col lg={5} className="shadow-lg reset-container">
              <div className="text-center ">
                <LogoWithTitle title="Reset password"></LogoWithTitle>
              </div>

              <Form onSubmit={handleSubmit}>
                <div className="password-showhide">
                  <InputField
                    onChange={handleChange}
                    type={oldPasswordType}
                    name="new_password"
                    label="New Password"
                    placeholder="*******"
                    value={resetPassData.new_password}
                    className="reset-inputs "
                  ></InputField>
                  <PasswordShowHide
                    passwordType={oldPasswordType}
                    setPasswordType={setOldPasswordType}
                  ></PasswordShowHide>
                </div>
                <ErrorMessage>{formErrors?.password}</ErrorMessage>
                <div className="password-showhide">
                  <InputField
                    onChange={handleChange}
                    type={newPasswordType}
                    name="confirm_password"
                    label="Confirm Password"
                    placeholder="*******"
                    value={resetPassData.confirm_password}
                    className="reset-inputs "
                  ></InputField>
                  <PasswordShowHide
                    passwordType={newPasswordType}
                    setPasswordType={setNewPasswordType}
                  ></PasswordShowHide>
                </div>

                <ActionButton
                  className="btn btn-block my-3 custom-btn"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={
                    !resetPassData.new_password ||
                    !resetPassData.confirm_password
                  }
                >
                  Reset Password
                </ActionButton>
                <Link to="/login" className="text-center returnto_signin">
                  {" "}
                  <span>Return to signin</span>
                </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Branding></Branding>
      </section>
    </>
  );
};
