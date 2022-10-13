import { useEffect, useState } from "react";
import { ActionButton } from "./../../../../components/Button/ActionButton";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./ProjectGroup.css";
import { ModalBox } from "./../../../../components/Modal/ModalBox";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { ModalRole } from "../../../../enums/ModalEnums";
import { useDispatch } from "react-redux";
import { viewGroup } from "../../../../features/projectGroup/projectGroupSlice";
import { Link } from "react-router-dom";

export const ProjectGroup = ({ item }: any) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showLockUnlock, setShowLockUnlock] = useState(false);
  const [groupId, setGroupId] = useState(null);
  const [projectId, setProjectId] = useState(null);

  const handleShowDelete = () => setShowDelete(true);
  const handleShowLockUnlock = () => setShowLockUnlock(true);

  let projectGroup = {
    groupId: groupId,
    projectId: projectId,
  };
  let groupLockUnlock = {
    groupId: groupId,
    is_locked: item?.is_locked,
    projectId: projectId,
  };

  return (
    <>
      <ModalBox
        show={showDelete}
        setShow={setShowDelete}
        actionData={projectGroup}
        role={ModalRole.GROUP_DELETE}
        modalText="Are you want to delete this group?"
      ></ModalBox>
      <ModalBox
        show={showLockUnlock}
        setShow={setShowLockUnlock}
        actionData={groupLockUnlock}
        role={ModalRole.LOCK_UNLOCK_GROUP}
        modalText={`Are you want to ${
          item?.is_locked ? "unlock" : "lock"
        } this group?`}
      ></ModalBox>
      <div className="box-shadow project-overview-container rounded p-3">
        <div className="project-group-short-infos">
          <div>
            <div className="group-project-heading">
              <div
                className={`group-project-header ${
                  item.is_locked && "group-locked"
                }`}
              >
                <h4 className="project-overview-heading">{item?.name}</h4>
                <span className="text-success project-group-header-status">
                  .Success
                </span>
              </div>
              <ActionButton
                onClick={() => {
                  handleShowLockUnlock();
                  setProjectId(item.project_id);
                  setGroupId(item.id);
                }}
                className="btn lock-btn"
              >
                {item.is_locked ? <FaLock></FaLock> : <FaLockOpen></FaLockOpen>}
              </ActionButton>
            </div>
          </div>
          <div className="py-2 group-project-description">
            <p className="p-0 mb-0">
              Annotation type:{" "}
              <span className="group-info"> {item?.annotation_task?.name}</span>
            </p>
            <p className="p-0 mb-0">
              No. of annotators:{" "}
              <span className="group-info">{item?.num_annotators}</span>{" "}
            </p>
            <p className="p-0 mb-0">
              No. of validators:{" "}
              <span className="group-info">{item?.num_validators}</span>{" "}
            </p>
            <p className="p-0 mb-0">
              Annotated data:{" "}
              <span className="group-info">
                {" "}
                {item?.num_annotated_data} / {item?.num_assigned_data}
              </span>
            </p>
          </div>
        </div>

        <div
          className={`row project-group-btns ${
            item.is_locked && "group-locked"
          }`}
        >
          <Link
            to={`/dashboard/project/${item.project_id}/group/${item.id}`}
            className="btn project-overview-btn mx-2"
            onClick={() => {
              setGroupId(item.id);
              setProjectId(item.project_id);
            }}
          >
            view
          </Link>
          <ActionButton
            onClick={() => {
              handleShowDelete();
              setGroupId(item.id);
              setProjectId(item.project_id);
            }}
            className="btn project-overview-delete-btn mx-2"
          >
            <RiDeleteBin5Line></RiDeleteBin5Line>
          </ActionButton>
        </div>
      </div>
    </>
  );
};
