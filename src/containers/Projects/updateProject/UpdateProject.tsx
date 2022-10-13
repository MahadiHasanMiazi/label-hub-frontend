import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../app/store";
import { InputField } from "../../../components/InputField/InputField";
import { updateProject } from "../../../features/projectList/projectListSlice";
import { ActionButton } from "./../../../components/Button/ActionButton";
import { TextArea } from "./../../../components/TextArea/TextArea";
import "./UpdateProject.css";

interface UpdateProjectProps {
  show: boolean;
  setShow: (value: any) => void;
  projectId: number;
}
export const UpdateProject: React.FC<UpdateProjectProps> = ({
  show,
  setShow,
  projectId,
}) => {
  const dispatch = useDispatch();

  const { projectList } = useSelector((state: RootState) => state.projectList);
  const { data: allProject } = projectList || [];

  const [projectName, setprojectName] = useState("");
  const [projectDescription, setprojectDescription] = useState("");
  useEffect(() => {
    const editedProject = allProject?.find(
      (item: any) => item.id === projectId
    );
    setprojectName(editedProject?.name);
    setprojectDescription(editedProject?.description);
  }, [projectId, allProject]);

  const handleClose = () => setShow(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateprojectData = {
      name: projectName,
      description: projectDescription,
      projectId: projectId,
    };
    if (projectName === "" || projectDescription === "") {
      toast.warning("Please fill out all the fields");
      return;
    }
    dispatch(updateProject(updateprojectData));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header className="update-project-modal-header">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="update-project-modal-title "
        >
          Edit
        </Modal.Title>
        <IoMdClose onClick={handleClose} className="closeIcon"></IoMdClose>
      </Modal.Header>
      <Modal.Body className="update-modal-body">
        <div className="row p-2">
          <div className="col">
            <div className="col-lg-6 px-0">
              <InputField
                onChange={(e) => setprojectName(e.target.value)}
                type="text"
                name="name"
                label="Name"
                placeholder="Label Hub"
                value={projectName}
                className="custom-input-style"
              ></InputField>
            </div>
            <TextArea
              onChange={(e) => setprojectDescription(e.target.value)}
              name="description"
              label="Description"
              placeholder="Write here..."
              value={projectDescription}
              className="update-project-textarea"
            ></TextArea>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="update-modal-footer">
        <ActionButton
          onClick={handleSubmit}
          className="btn updateProject-btn mx-3 mb-3 px-4"
        >
          update
        </ActionButton>
      </Modal.Footer>
    </Modal>
  );
};


