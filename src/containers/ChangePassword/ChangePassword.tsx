import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { ActionButton } from "../../components/Button/ActionButton";
import { InputField } from "../../components/InputField/InputField";
import { PasswordShowHide } from "../../components/PasswordShowHide/PasswordShowHide";
import Spinner from "../../components/Spinner/Spinner";
import { changeUserPassword, resetUser } from "./../../features/user/userSlice";
import "./ChangePassword.css";
import { IError } from "./../../utils/validationType";
import { validate } from "./../../utils/validationFunction";
import { ErrorMessage } from "./../../components/ErrorMessage/ErrorMessage";
interface IPassData {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
export const ChangePassword = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [changePassData, setChangePassData] = useState<IPassData>({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [formErrors, setFormErrors] = useState<IError>({} as IError);

  const { isLoading, isError, message } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      toast.error(message);
    }

    dispatch(resetUser());
  }, [isError, message, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setChangePassData({ ...changePassData, [name]: value });

    setFormErrors(validate(name, value));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(changeUserPassword(changePassData));
  };

  //**************** loading screen *********** */
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <section className="cngpass-section">
        <div className="d-flex cngpass-info">
          <div className=" mx-3">
            <h6 className="cngpass-name p-0">Change Password</h6>
          </div>
        </div>

        <Container className="py-4">
          <Row>
            <Col className="box-shadow rounded" lg={6}>
              <div className="row p-5">
                <div className="col-lg">
                  <div className="password-showhide">
                    <InputField
                      onChange={handleChange}
                      type={oldPasswordType}
                      name="old_password"
                      label="Old Password"
                      placeholder="******"
                      value={changePassData.old_password}
                    ></InputField>
                    <PasswordShowHide
                      passwordType={oldPasswordType}
                      setPasswordType={setOldPasswordType}
                    ></PasswordShowHide>
                  </div>

                  <div className="password-showhide">
                    <InputField
                      onChange={handleChange}
                      type={passwordType}
                      name="new_password"
                      label="New Password"
                      placeholder="******"
                      value={changePassData.new_password}
                    ></InputField>
                    <PasswordShowHide
                      passwordType={passwordType}
                      setPasswordType={setPasswordType}
                    ></PasswordShowHide>
                  </div>
                  <ErrorMessage>{formErrors?.password}</ErrorMessage>
                  <div className="password-showhide">
                    <InputField
                      onChange={handleChange}
                      type={confirmPasswordType}
                      name="confirm_password"
                      label="Confirm Password"
                      placeholder="******"
                      value={changePassData.confirm_password}
                    ></InputField>
                    <PasswordShowHide
                      passwordType={confirmPasswordType}
                      setPasswordType={setConfirmPasswordType}
                    ></PasswordShowHide>
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <ActionButton
                  onClick={handleSubmit}
                  className="btn update-pass-btn mx-5 mb-3"
                  disabled={
                    !changePassData.old_password ||
                    !changePassData.new_password ||
                    !changePassData.confirm_password
                  }
                >
                  Update Password
                </ActionButton>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
