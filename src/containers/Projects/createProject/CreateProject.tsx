/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Badge, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { InputField } from "../../../components/InputField/InputField";
import { TextArea } from "../../../components/TextArea/TextArea";
import {
  addtags,
  removeAllTasks,
} from "../../../features/projectCreate/projectCreateSlice";
import {
  createProject,
  resetProject,
} from "../../../features/projectList/projectListSlice";
import { ActionButton } from "./../../../components/Button/ActionButton";
import { allTasks } from "./../../../features/tasks/tasksSlice";
import { AnnotationType } from "./AnnotationType/AnnotationType";
import "./CreateProject.css";
import { CreateProjectProps } from "./CreateProjectType";
import { SelectedTypeWithTags } from "./SelectedTypeWithTags/SelectedTypeWithTags";

export const CreateProject: React.FC<CreateProjectProps> = ({
  show,
  setShow,
}) => {
  const { tasksList: annotationTypes } = useSelector(
    (state: RootState) => state.tasks
  );
  const { isProjectError, projectMessage } = useSelector(
    (state: RootState) => state.projectList
  );
  const { tagList } = useSelector((state: RootState) => state.projectCreate);

  const dispatch = useDispatch();
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
  });
  const [taskNameForTag, setTaskNameForTag] = useState("");
  const [taskTagList, setTaskTagList] = useState([]);

  useEffect(() => {
    dispatch(allTasks());
  }, [dispatch]);
  useEffect(() => {
    tagList.length > 0 &&
      setTaskTagList(tagList[tagList.length - 1]?.currentTags);
  }, [tagList]);

  useEffect(() => {
    if (isProjectError || projectMessage) {
      toast.error(projectMessage);
      dispatch(resetProject());
    }
  }, [isProjectError, projectMessage, dispatch]);

  const handleClose = () => {
    setShow(false);
    setSelectedTasks([]);
    dispatch(removeAllTasks());
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedTasksObg = tagList.map((selectedTasks: any) => {
      return {
        id: selectedTasks.id,
        tags: selectedTasks.tags,
      };
    });
    const createprojectData = {
      name: projectData.name,
      description: projectData.description,
      tasks: selectedTasksObg,
    };

 

    if (createprojectData.name === "" || createprojectData.description === "") {
      toast.warning("Please fill out all the fields");
      return;
    } else if (createprojectData?.tasks?.length === 0) {
      toast.warning("At least one task has to be picked");
      return;
    } else {
      dispatch(createProject(createprojectData));
      handleClose();
    }
  };
  
  //check tag name by tag id
  const checkTagByname = (tagId: any): any => {
    return annotationTypes.map((annotation: any) => {
      return annotation.tags.map((tag: any) => {
        if (tag.id === tagId) {
          return tag.short_form;
        }
      });
    });
  };
  //check tag name by tag id
  const checkTaskName = (taskId: any): any => {
    return annotationTypes.find((annotation: any) => {
      return annotation.id === taskId;
    });
  };

  
  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header className="creat-project-modal-header">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="create-project-modal-title"
          >
            Create Project
          </Modal.Title>
          <IoMdClose onClick={handleClose} className="closeIcon"></IoMdClose>
        </Modal.Header>
        <Modal.Body className="edit-modal-body">
          <div className="row p-2">
            <div className="col">
              <div className="col-lg-6 px-0">
                <InputField
                  onChange={handleChange}
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="Label Hub"
                  value={projectData.name}
                  className="custom-input-style"
                ></InputField>
              </div>
              <TextArea
                onChange={handleChange}
                name="description"
                label="Description"
                placeholder="Write here..."
                value={projectData.description}
                className="create-project-textarea"
              ></TextArea>
              <section className="row  justify-content-center my-3">
                <AnnotationType
                  annotationTypes={annotationTypes}
                  tagList={tagList}
                  setTaskTagList={setTaskTagList}
                  setTaskNameForTag={setTaskNameForTag}
                ></AnnotationType>
                {tagList.length > 0 && (
                  <div className="col-7">
                    <span className="form-label">Tag Selection</span>
                    <div className=" p-3 annotation-tags">
                      <div className="my-2 ">
                        <h6 className="current-annotation-type mx-2">
                          {taskNameForTag}
                        </h6>
                        

                        {taskTagList?.map((singleTag: any, index: number) => {
                          return (
                            <span key={index}>
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>{singleTag.name}</Tooltip>}
                              >
                                <Badge
                                  as="button"
                                  className={`mx-2 my-1  annotation-tag-badge`}
                                  bg="none"
                                  onClick={() => {
                                    dispatch(
                                      addtags({
                                        selectedTag: singleTag.id,
                                        selectedTasks: singleTag.task_id,
                                      })
                                    );
                                  }}
                                >
                                  {singleTag.short_form}
                                  {tagList?.map((tasks: any) => {
                                    if (tasks.tags.includes(singleTag.id)) {
                                      return (
                                        <span
                                          className="selected-tagToggle"
                                          key={singleTag.id}
                                        >
                                          <AiOutlineClose className="ml-1"></AiOutlineClose>
                                        </span>
                                      );
                                    }
                                  })}
                                </Badge>
                              </OverlayTrigger>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {tagList.length > 0 && (
                <section className="annotation-type-tags mt-5 py-3">
                  <SelectedTypeWithTags
                    checkTagByname={checkTagByname}
                  ></SelectedTypeWithTags>
                </section>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="createProject-modal-footer">
          <ActionButton
            onClick={handleSubmit}
            className="btn createProject-btn mx-3 mb-3 px-4"
          >
            Create
          </ActionButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};
