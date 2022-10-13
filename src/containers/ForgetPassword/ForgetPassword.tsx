import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { Branding } from "../../components/Branding/Branding";
import { ActionButton } from "../../components/Button/ActionButton";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { InputField } from "../../components/InputField/InputField";
import { LogoWithTitle } from "../../components/LogoWithTitle/LogoWithTitle";
import { forgotPassword, resetAuth } from "../../features/auth/authSlice";
import { emailValidate } from "../../utils/validationSchema";
import Spinner from "./../../components/Spinner/Spinner";
import "./ForgetPassword.css";
export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [validemail, setValidemail] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    setValidemail(emailValidate.pattern.value.test(email));
  }, [email]);

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message.detail);
      setEmail("");
    }

    dispatch(resetAuth());
  }, [isError, isSuccess, message, dispatch]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center align-items-center forgetpass-form ">
            <Col xs={5} className="shadow-lg forgetpass-container">
              <div className="text-center ">
                <LogoWithTitle title="Forget password"></LogoWithTitle>
              </div>

              <Form onSubmit={handleSubmit}>
                <InputField
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  type="email"
                  label="Email"
                  placeholder="example@mail.com"
                  value={email}
                  name="email"
                  className="forgetpass-inputs"
                ></InputField>
                <ErrorMessage
                  display={
                    emailFocus && email && !validemail ? "d-block" : "d-none"
                  }
                >
                  Please enter a valid email address
                </ErrorMessage>
                <ActionButton
                  className="btn btn-block my-3 custom-btn"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!validemail}
                >
                  Send Reset Link
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
