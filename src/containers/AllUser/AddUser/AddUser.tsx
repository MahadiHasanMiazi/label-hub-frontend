import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { ActionButton } from "../../../components/Button/ActionButton";
import { InputField } from "../../../components/InputField/InputField";
import { SelectField } from "../../../components/SelectField/SelectField";
import { UserRole } from "../../../enums/UserRoleEnums";
import { resetUser } from "../../../features/user/userSlice";
import { createUser } from "../../../features/userList/userListSlice";
import {
  emailValidate,
  passwordValidate,
  phoneNumberValidate
} from "../../../utils/validationSchema";
import { ICurrentUser, IGender, IRole } from "../AllUserListType";
import { ErrorMessage } from "./../../../components/ErrorMessage/ErrorMessage";
import "./AddUser.css";
interface EditUserProps {
  show: boolean;
  setShow: any;
}

export const AddUser: React.FC<EditUserProps> = ({ show, setShow }) => {
  const { isError, message } = useSelector(
    (state: RootState) => state.userList
  );
  const { logedinUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [active, setActive] = useState<boolean>(true);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [validemail, setValidemail] = useState<boolean>(false);
  const [phoneFocus, setPhoneFocus] = useState<boolean>(false);
  const [validPhone, setValidPhone] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<ICurrentUser>({
    dob: null,
    email: "",
    full_name: "",
    gender: "Male",
    institution_name: null,
    phone_number: null,
    qualification: null,
    password: "",
    role: UserRole.GUEST,
  });
  const genderOptions: Array<IGender> = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];

  const roleOptionsAdmin: Array<IRole> = [
    {
      value: UserRole.MANAGER,
      label: "MANAGER",
    },
    {
      value: UserRole.ANNOTATOR,
      label: "ANNOTATOR",
    },
    {
      value: UserRole.VALIDATOR,
      label: "VALIDATOR",
    },
    {
      value: UserRole.GUEST,
      label: "GUEST",
    },
  ];
  const roleOptionsManager: Array<IRole> = [
    {
      value: UserRole.ANNOTATOR,
      label: "ANNOTATOR",
    },
    {
      value: UserRole.VALIDATOR,
      label: "VALIDATOR",
    },
    {
      value: UserRole.GUEST,
      label: "GUEST",
    },
  ];
  let roleOptions;
  if (logedinUser.role === UserRole.ADMIN) {
    roleOptions = roleOptionsAdmin;
  } else if (logedinUser.role === UserRole.MANAGER) {
    roleOptions = roleOptionsManager;
  }

  useEffect(() => {
    setValidemail(emailValidate.pattern.value.test(userInfo.email));
  }, [userInfo.email]);
  useEffect(() => {
    setValidPassword(passwordValidate.pattern.value.test(userInfo.password));
  }, [userInfo.password]);
  useEffect(() => {
    setValidPhone(
      phoneNumberValidate.pattern.value.test(userInfo.phone_number)
    );
  }, [userInfo.phone_number]);

  useEffect(() => {
    if (isError || message) {
      toast.error(message);
    }
    dispatch(resetUser());
  }, [isError, message, dispatch]);

  const handleClose = () => setShow(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      dob: userInfo.dob,
      email: userInfo.email,
      full_name: userInfo.full_name,
      gender: userInfo.gender,
      institution_name: userInfo.institution_name,
      phone_number: userInfo.phone_number,
      qualification: userInfo.qualification,
      password: userInfo.password,
      role: userInfo.role,
    };

    if (
      userInfo.email === "" ||
      userInfo.full_name === "" ||
      userInfo.password === ""
    ) {
      toast.warning("Please fill out Name,Email and Password");
      return;
    } else {
      dispatch(createUser(userData));
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header className="edit-modal-header px-4">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="user-add-modal-title"
          >
            Add User
          </Modal.Title>       
          <IoMdClose onClick={handleClose} className="closeIcon"></IoMdClose>
        </Modal.Header>
        <Modal.Body className="edit-modal-body">
          <div className="row p-2">
            <div className="col">
              <InputField
                onChange={handleChange}
                type="text"
                name="full_name"
                label="Name"
                placeholder="Label Hub"
                value={userInfo.full_name}
                className="custom-input-style"
              ></InputField>
              <SelectField
                onChange={handleChange}
                label="Gender"
                name="gender"
                value={userInfo.gender}
                options={genderOptions}
              ></SelectField>

              <InputField
                onChange={handleChange}
                type="text"
                name="institution_name"
                label="Institutions"
                placeholder="University of Dhaka"
                value={userInfo.institution_name}
                className="custom-input-style"
              ></InputField>
              <InputField
                onChange={handleChange}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                type="password"
                name="password"
                label="Password"
                placeholder="******"
                value={userInfo.password}
                className="custom-input-style"
              ></InputField>
              <ErrorMessage
                display={
                  passwordFocus && userInfo.password && !validPassword
                    ? "d-block"
                    : "d-none"
                }
              >
                Password must contain at least 6 characters and Please give at
                least one number, one lower and upper case letter, one special
                character
              </ErrorMessage>
              <SelectField
                onChange={handleChange}
                name="role"
                label="User Type"
                value={userInfo.role}
                options={roleOptions}
              ></SelectField>
            </div>
            <div className="col">
              <InputField
                onChange={handleChange}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                type="email"
                name="email"
                label="Email"
                placeholder="example@gmail.com"
                value={userInfo.email}
                className="custom-input-style"
              ></InputField>
              <ErrorMessage
                display={
                  emailFocus && userInfo.email && !validemail
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
                value={userInfo.dob}
                name="dob"
                className="custom-input-style"
              ></InputField>
              <InputField
                onChange={handleChange}
                type="text"
                label="Education Qualification"
                placeholder="BSc in Computer Science and Engineering"
                value={userInfo.qualification}
                name="qualification"
                className="custom-input-style"
              ></InputField>
              <InputField
                onChange={handleChange}
                onFocus={() => setPhoneFocus(true)}
                onBlur={() => setPhoneFocus(false)}
                type="number"
                label="Mobile"
                placeholder="xxxxxxxxxxx"
                value={userInfo.phone_number}
                name="phone_number"
                className="custom-input-style"
              ></InputField>
              <ErrorMessage
                display={
                  phoneFocus && userInfo.phone_number && !validPhone
                    ? "d-block"
                    : "d-none"
                }
              >
                Please enter a valid phone number
              </ErrorMessage>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="edit-modal-footer">
          <ActionButton
            onClick={handleSubmit}
            className="btn adduser-btn mx-3 mb-3"
            disabled={!validemail || !validPassword ? true : false}
          >
            Add
          </ActionButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};


