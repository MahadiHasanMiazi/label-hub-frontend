import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { ActionButton } from "../../components/Button/ActionButton";
import { InputField } from "../../components/InputField/InputField";
import { LogoWithTitle } from "../../components/LogoWithTitle/LogoWithTitle";
import { login, resetAuth } from "../../features/auth/authSlice";
import { Branding } from "./../../components/Branding/Branding";
import { PasswordShowHide } from "./../../components/PasswordShowHide/PasswordShowHide";
import Spinner from "./../../components/Spinner/Spinner";
import { IformData } from "./inputType";
import "./LoginForm.css";
export const LoginForm = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState<IformData>({
    username: "",
    password: "",
  });
  const { username, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (message) {
      toast.error(message[0].msg);
    }
    if (isSuccess) {
      navigate("/dashboard");
    }
    dispatch(resetAuth());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(login(userData));
    dispatch(resetAuth());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center align-items-center login-form ">
            <Col xs={5} className="box-shadow  login-container">
              <div className="text-center ">
                <LogoWithTitle title="Label Hub"></LogoWithTitle>
              </div>

              <Form onSubmit={handleSubmit}>
                <div className="my-3">
                  <InputField
                    onChange={handleChange}
                    type="text"
                    label="Email"
                    placeholder="example@mail.com"
                    value={formData.username}
                    name="username"
                    className="login-inputs"
                  ></InputField>
                  <div className="password-showhide my-3">
                    <InputField
                      onChange={handleChange}
                      type={passwordType}
                      name="password"
                      label="Password"
                      placeholder="******"
                      value={formData.password}
                      className="login-inputs"
                    ></InputField>
                    <PasswordShowHide
                      passwordType={passwordType}
                      setPasswordType={setPasswordType}
                    ></PasswordShowHide>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <Link
                    to="/forgot_password"
                    className="text-right forgot-pass"
                  >
                    {" "}
                    Forget Password
                  </Link>
                </div>

                <Link to="/forgot_password" className="text-right forgot-pass">
                  {" "}
                  <span>Forget Password</span>
                </Link>
                <ActionButton
                  className="btn btn-block my-3 custom-btn"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!formData.username || !formData.password}
                >
                  Submit
                </ActionButton>
                <div className="text-center my-3">
                  <span className="dont-have-acc">
                    Don't have an account?{" "}
                    <Link className="signup-link" to="/signup">
                      Sign up
                    </Link>
                  </span>
                </div>
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
