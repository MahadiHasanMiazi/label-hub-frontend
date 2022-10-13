import React from "react";
import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { deleteGroupofProject } from "../../features/projectGroup/projectGroupSlice";
import { deleteProject } from "../../features/projectList/projectListSlice";
import {
  deleteUser,
  updateUserStatus,
} from "../../features/userList/userListSlice";
import { ActionButton } from "../Button/ActionButton";
import "./ModalBox.css";
import { lockUnlockGroupofProject } from "./../../features/projectGroup/projectGroupSlice";
import { ModalRole } from "../../enums/ModalEnums";
interface IMOdalBox {
  show: boolean;
  setShow: any;
  actionData?: any;
  modalText: string;
  modalIcon?: any;
  modalColor?: string;
  role:
    | ModalRole.ACTIVE_USER
    | ModalRole.DELETE_USER
    | ModalRole.ACTIVE_USER
    | ModalRole.DELETE_PROJECT
    | ModalRole.LOCK_UNLOCK_GROUP
    | ModalRole.GROUP_DELETE
    | ModalRole.NER_REJECT
    | ModalRole.NULL_SUBMIT;
}

export const ModalBox: React.FC<IMOdalBox> = ({
  show,
  setShow,
  actionData,
  modalText,
  modalIcon,
  modalColor,
  role,
}) => {
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();

  const handleDispatchEvent = () => {
    if (role === ModalRole.DELETE_USER) {
      dispatch(deleteUser(actionData));
    }
    if (role === ModalRole.ACTIVE_USER) {
      dispatch(updateUserStatus(actionData));
    }
    if (role === ModalRole.DELETE_PROJECT) {
      dispatch(deleteProject(actionData));
    }
    if (role === ModalRole.GROUP_DELETE) {
      dispatch(deleteGroupofProject(actionData));
    }
    if (role === ModalRole.LOCK_UNLOCK_GROUP) {
      dispatch(lockUnlockGroupofProject(actionData));
    }
    if (role === ModalRole.NER_REJECT) {
      //ner reject action will go here
    }
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="modalHeader">
          <IoMdClose onClick={handleClose} className="closeIcon"></IoMdClose>

          {modalIcon && (
            <img src={modalIcon} alt="icon" className="modal-type"></img>
          )}
        </Modal.Header>
        <Modal.Body>
          <span className="main-text">{modalText} </span>
        </Modal.Body>
        {actionData && (
          <Modal.Footer>
            <ActionButton
              onClick={handleDispatchEvent}
              className="success-action-btn"
            >
              {" "}
              Yes
            </ActionButton>
            <ActionButton onClick={handleClose} className="close-action-btn">
              {" "}
              No
            </ActionButton>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};
