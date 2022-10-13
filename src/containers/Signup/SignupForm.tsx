/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { Branding } from "../../components/Branding/Branding";
import { ActionButton } from "../../components/Button/ActionButton";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { InputField } from "../../components/InputField/InputField";
import { LogoWithTitle } from "../../components/LogoWithTitle/LogoWithTitle";
import { SelectField } from "../../components/SelectField/SelectField";
import { register, resetAuth } from "../../features/auth/authSlice";
import { emailValidate, passwordValidate } from "../../utils/validationSchema";
import Spinner from "./../../components/Spinner/Spinner";
import "./SignupForm.css";
import { IGender, ISignupData } from "./signupInputType";
import { PasswordShowHide } from "./../../components/PasswordShowHide/PasswordShowHide";

export const SignupForm = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const [signupData, setSignupData] = useState<ISignupData>({
    fullName: "",
    email: "",
    mobile: "",
    birthday: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [validemail, setValidemail] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] =
    useState<boolean>(false);
  const [validconfirmPassword, setValidconfirmPassword] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isRegistered, message } = useSelector(
    (state: RootState) => state.auth
  );
  const options: Array<IGender> = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];
  useEffect(() => {
    setValidemail(emailValidate.pattern.value.test(signupData.email));
  }, [signupData.email]);
  useEffect(() => {
    setValidPassword(passwordValidate.pattern.value.test(signupData.password));
    setValidconfirmPassword(signupData.password === signupData.confirmPassword);
  }, [signupData.confirmPassword, signupData.password]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (message) {
      toast.error(message[0].msg);
    }
    if (isRegistered) {
      toast.success("Registration successful");
      navigate("/login");
    }

    //dispatch(reset());
  }, [isError, isRegistered, message, navigate, dispatch]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const signupInfo = {
      full_name: signupData.fullName,
      email: signupData.email,
      phone_number: signupData.mobile,
      dob: signupData.birthday,
      gender: signupData.gender,
      password: signupData.password,
    };
    dispatch(register(signupInfo));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="my-2">
        <Container>
          <Row className="justify-content-center align-items-center signup-form ">
            <Col xs={7} lg={7} className="box-shadow signup-container">
              <div className="text-center ">
                <LogoWithTitle title="Sign up"></LogoWithTitle>
                <div className="text-center already-have-acc">
                  <span>
                    Already Have an Account?{" "}
                    <Link className="signin-link" to="/login">
                      Sign In
                    </Link>
                  </span>
                </div>
              </div>

              <div className="row py-4">
                <div className="col-lg-6">
                  {" "}
                  <InputField
                    onChange={handleChange}
                    type="text"
                    label="Full Name"
                    placeholder="Corpus"
                    value={signupData.fullName}
                    name="fullName"
                    required
                    className="signup-inputs"
                  ></InputField>
                  <SelectField
                    onChange={handleChange}
                    name="gender"
                    label="Gender"
                    value={signupData.gender}
                    options={options}
                    className="signup-select"
                  ></SelectField>
                  <InputField
                    onChange={handleChange}
                    type="number"
                    label="Mobile"
                    placeholder="xxxxxxxxxxx"
                    value={signupData.mobile}
                    name="mobile"
                    className="signup-inputs"
                  ></InputField>
                  <div className="password-showhide my-3">
                    <InputField
                      onChange={handleChange}
                      onFocus={() => setConfirmPasswordFocus(true)}
                      onBlur={() => setConfirmPasswordFocus(false)}
                      value={signupData.confirmPassword}
                      name="confirmPassword"
                      type={confirmPasswordType}
                      placeholder="******"
                      label="Confirm Password"
                      required
                      className="signup-inputs"
                    ></InputField>
                    <PasswordShowHide
                      passwordType={confirmPasswordType}
                      setPasswordType={setConfirmPasswordType}
                    ></PasswordShowHide>
                  </div>
                  <ErrorMessage
                    display={
                      confirmPasswordFocus &&
                      signupData.confirmPassword &&
                      !validconfirmPassword
                        ? "d-block"
                        : "d-none"
                    }
                  >
                    Must match the first password input field.
                  </ErrorMessage>
                </div>
                <div className="col-lg-6">
                  <InputField
                    onChange={handleChange}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="example@mail.com"
                    value={signupData.email}
                    required
                    className="signup-inputs"
                  ></InputField>
                  <ErrorMessage
                    display={
                      emailFocus && signupData.email && !validemail
                        ? "d-block"
                        : "d-none"
                    }
                  >
                    Please enter a valid email address
                  </ErrorMessage>
                  <InputField
                    onChange={handleChange}
                    type="date"
                    label="Birthday"
                    placeholder="dd/mm/yyyy"
                    value={signupData.birthday}
                    name="birthday"
                    className="signup-inputs"
                  ></InputField>

                  <div className="password-showhide my-3">
                    <InputField
                      onChange={handleChange}
                      onFocus={() => setPasswordFocus(true)}
                      onBlur={() => setPasswordFocus(false)}
                      value={signupData.password}
                      type={passwordType}
                      name="password"
                      placeholder="******"
                      label="Password"
                      required
                      className="signup-inputs"
                    ></InputField>
                    <PasswordShowHide
                      passwordType={passwordType}
                      setPasswordType={setPasswordType}
                    ></PasswordShowHide>
                  </div>

                  <ErrorMessage
                    display={
                      passwordFocus && signupData.password && !validPassword
                        ? "d-block"
                        : "d-none"
                    }
                  >
                    Password must contain at least 6 characters, at least one number,
                    one lower case, one upper case letter and a one
                    special character.
                  </ErrorMessage>
                </div>

                <ActionButton
                  className="btn  m-3 signup-btn"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={
                    !validemail || !validPassword || !validconfirmPassword
                      ? true
                      : false
                  }
                >
                  Sign up
                </ActionButton>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="my-2">
        <Branding></Branding>
      </section>
    </>
  );
};
