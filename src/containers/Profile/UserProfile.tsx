import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FiEdit3 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import ProfilePicture from "../../assets/images/profile-picture.svg";
import { ActionButton } from "../../components/Button/ActionButton";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { InputField } from "../../components/InputField/InputField";
import { PasswordShowHide } from "../../components/PasswordShowHide/PasswordShowHide";
import { SelectField } from "../../components/SelectField/SelectField";
import Spinner from "../../components/Spinner/Spinner";
import {
  changeUserPassword,
  resetUser,
  updateCurrentUser,
} from "../../features/user/userSlice";
import { IUpdateProfile } from "../../Interfaces/IUserProfile";
import { passwordValidate } from "../../utils/validationSchema";
import { IGender } from "./currentUserType";
import "./UserProfile.css";

export const UserProfile = () => {
  const { logedinUser, isLoading, isError, message } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<IUpdateProfile>({
    fullName: logedinUser?.full_name || "",
    mobile: logedinUser?.phone_number || "",
    birthday: logedinUser?.dob || "",
    gender: logedinUser?.gender || "",
    institution: logedinUser?.institution_name || "",
    educationalQualification: logedinUser?.qualification || "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [confirmPasswordFocus, setConfirmPasswordFocus] =
    useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [clickChange, setClickChange] = useState<boolean>(false);
  const [validConfirmPassword, setValidConfirmPassword] =
    useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [passwordType, setPasswordType] = useState("password");

  const handleEdit = () => setEdit(true);
  const handleChangePassword = () => setClickChange(true);

  const handleUpdateProfile = (event: any) => {
    event.preventDefault();
    const profileInformation = {
      full_name: userData.fullName,
      phone_number: userData.mobile,
      dob: userData.birthday,
      gender: userData.gender,
      institution_name: userData.institution,
      qualification: userData.educationalQualification,
    };
    const userPassword = {
      old_password: userData.currentPassword,
      new_password: userData.password,
      confirm_password: userData.confirmPassword,
    };

    if (validPassword) {
      dispatch(changeUserPassword(userPassword));
      setUserData({
        ...userData,
        currentPassword: "",
        password: "",
        confirmPassword: "",
      });
      setEdit(false);
    } else {
      dispatch(updateCurrentUser(profileInformation));
      setEdit(false);
    }
  };
  const options: Array<IGender> = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setValidPassword(passwordValidate.pattern.value.test(userData.password));
    setValidConfirmPassword(userData.password === userData.confirmPassword);
  }, [userData.password, userData.confirmPassword]);

  useEffect(() => {
    if (isError || message) {
      toast.error(message);
    }
    dispatch(resetUser());
  }, [isError, message, dispatch]);

  //**************** loading screen *********** */
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <section className="profile-section">
      <Container className="py-4">
        <Row className="profile-card">
          <Col className="box-shadow rounded">
            <div className="row p-5">
              <div className="col">
                <div className="row">
                  <div className="pr-0 user-profile-picture">
                    <img src={ProfilePicture} alt="profile icon"></img>
                  </div>
                  <div className="pl-0 ml-4 user-name-email">
                    <h3>
                      <b>{logedinUser.full_name}</b>
                    </h3>
                    <span>{logedinUser.email}</span>
                  </div>
                </div>
              </div>
              <div className="col edit-profile-button">
                {!edit ? (
                  <ActionButton
                    className="btn btn-primary"
                    type="button"
                    onClick={handleEdit}
                  >
                    <FiEdit3></FiEdit3> Edit
                  </ActionButton>
                ) : (
                  <ActionButton
                    className="btn btn-primary"
                    type="button"
                    onClick={handleUpdateProfile}
                  >
                    Save
                  </ActionButton>
                )}
              </div>
            </div>
            {!edit ? (
              <div>
                <div className="row p-5 user-information">
                  <div className="col">
                    <span>Full Name</span>
                    <h5 className="mt-1">{userData.fullName}</h5>
                  </div>
                  <div className="col">
                    <span>Gander</span>
                    <h5 className="mt-1">{userData.gender}</h5>
                  </div>
                  <div className="col">
                    <span>Date of Birth</span>
                    <h5 className="mt-1">{userData.birthday}</h5>
                  </div>
                </div>
                <div className="row px-5 pb-5 pt-0 user-information">
                  <div className="col">
                    <span>Educational Qualification</span>
                    <h5 className="mt-1">
                      {userData.educationalQualification}
                    </h5>
                  </div>
                  <div className="col">
                    <span>Institution</span>
                    <h5 className="mt-1">{userData.institution}</h5>
                  </div>
                  <div className="col">
                    <span>Mobile</span>
                    <h5 className="mt-1">{userData.mobile}</h5>
                  </div>
                </div>
                <div className="row px-5 pb-5 pt-0 user-information">
                  <div className="col">
                    <span>Password</span>
                    <h5 className="mt-1">********</h5>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="row p-5 user-information">
                  <div className="col">
                    <InputField
                      onChange={handleChange}
                      type="text"
                      label="Full Name"
                      placeholder="Name"
                      value={userData.fullName}
                      name="fullName"
                      required
                      className="profile-inputs"
                    ></InputField>
                  </div>
                  <div className="col edit-gander-select">
                    <SelectField
                      onChange={handleChange}
                      name="gender"
                      label="Gender"
                      value={userData.gender}
                      options={options}
                      className="profile-select"
                    ></SelectField>
                  </div>
                  <div className="col">
                    <InputField
                      onChange={handleChange}
                      type="date"
                      label="Birthday"
                      placeholder="dd/mm/yyyy"
                      value={userData.birthday}
                      name="birthday"
                      className="profile-inputs"
                    ></InputField>
                  </div>
                </div>
                <div className="row px-5 pb-5 pt-0 user-information">
                  <div className="col">
                    <InputField
                      onChange={handleChange}
                      type="text"
                      label="Educational Qualification"
                      placeholder="Educational Qualification"
                      value={userData.educationalQualification}
                      name="educationalQualification"
                      className="profile-inputs"
                    ></InputField>
                  </div>
                  <div className="col">
                    <InputField
                      onChange={handleChange}
                      type="text"
                      label="Institution"
                      placeholder="Institution"
                      value={userData.institution}
                      name="institution"
                      className="profile-inputs"
                    ></InputField>
                  </div>
                  <div className="col">
                    <InputField
                      onChange={handleChange}
                      type="text"
                      label="Mobile Number"
                      placeholder="Mobile Number"
                      value={userData.mobile}
                      name="mobile"
                      className="profile-inputs"
                    ></InputField>
                  </div>
                </div>
                <div className="row px-5 pb-5 pt-0 user-information">
                  <div className="col-4">
                    {!clickChange ? (
                      <div>
                        <InputField
                          onChange={handleChange}
                          type="password"
                          label="password"
                          placeholder="Password"
                          value="**********"
                          name="birthday"
                          className="profile-inputs"
                          disabled={true}
                        ></InputField>
                        <span
                          className="change-password-link"
                          onClick={handleChangePassword}
                        >
                          Change
                        </span>
                      </div>
                    ) : (
                      <div>
                        <div className="password-showhide my-3">
                          <InputField
                            onChange={handleChange}
                            type="password"
                            label="Current password"
                            placeholder="Current Password"
                            value={userData.currentPassword}
                            name="currentPassword"
                            className="profile-inputs"
                          ></InputField>
                        </div>
                      </div>
                    )}
                  </div>
                  {clickChange && (
                    <>
                      <div className="col-4">
                        <div className="password-showhide my-3">
                          <InputField
                            onChange={handleChange}
                            onFocus={() => setPasswordFocus(true)}
                            type={passwordType}
                            label="New password"
                            placeholder="New Password"
                            value={userData.password}
                            name="password"
                            className="profile-inputs"
                          ></InputField>
                          <PasswordShowHide
                            passwordType={passwordType}
                            setPasswordType={setPasswordType}
                          ></PasswordShowHide>
                        </div>
                        <ErrorMessage
                          display={
                            passwordFocus && userData.password && !validPassword
                              ? "d-block"
                              : "d-none"
                          }
                        >
                          Password must contain at least 6 characters and Please
                          give at least one number, one lower and upper case
                          letter, one special character
                        </ErrorMessage>
                      </div>
                      <div className="col-4">
                        <div className="password-showhide my-3">
                          <InputField
                            onChange={handleChange}
                            onFocus={() => setConfirmPasswordFocus(true)}
                            type={confirmPasswordType}
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            value={userData.confirmPassword}
                            name="confirmPassword"
                            className="profile-inputs"
                          ></InputField>
                          <PasswordShowHide
                            passwordType={confirmPasswordType}
                            setPasswordType={setConfirmPasswordType}
                          ></PasswordShowHide>
                        </div>
                        <ErrorMessage
                          display={
                            confirmPasswordFocus &&
                            userData.confirmPassword &&
                            !validConfirmPassword
                              ? "d-block"
                              : "d-none"
                          }
                        >
                          Password don’t match
                        </ErrorMessage>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};
