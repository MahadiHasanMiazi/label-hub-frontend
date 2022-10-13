import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ActionButton } from "./../../../../../components/Button/ActionButton";
import { IoMdClose } from "react-icons/io";
import "./AssignNerData.css";
import { InputField } from "../../../../../components/InputField/InputField";
import { toast } from "react-toastify";
import { assignNerData } from "./../../../../../features/nerData/nerDataSlice";
import { useDispatch } from "react-redux";
interface AssignNerDataProps {
  show: boolean;
  setShow: (show: boolean) => void;
  groupId: number;
  projectId: number;
  unassignedData: any;
}

export const AssignNerData: React.FC<AssignNerDataProps> = ({
  show,
  setShow,
  groupId,
  projectId,
  unassignedData,
}) => {
  const dispatch = useDispatch();
  const [assignData, setAssignData] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleClose = () => {
    setShow(false);
    setAssignData(null);
    setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignPayload = {
      group_id: groupId,
      assign_data_count: assignData,
      project_id: projectId,
    };
    if (assignData > unassignedData?.unassigned_data_count) {
      toast.warning("Don't have enough data to assign");
    } else {
      dispatch(assignNerData(assignPayload));
      setAssignData(null);
    }
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value && value > unassignedData?.unassigned_data_count) {
      setErrorMessage("Input value is greater than available data");
    } else if (!value) {
      setErrorMessage("");
    }
    setAssignData(parseInt(value));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="ner-modal-header">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="assign-ner-modal-title "
          >
            Assign Data
          </Modal.Title>
          <IoMdClose onClick={handleClose} className="closeIcon"></IoMdClose>
        </Modal.Header>
        <Modal.Body className="ner-asign-modal-body">
          <div className="row p-2">
            <div className="col">
              <section className="row ">
                <div className="col-lg-10">
                  <span className="available-assign-data">
                    Available: {unassignedData?.unassigned_data_count}
                  </span>
                  <InputField
                    type="number"
                    label="Ner"
                    value={assignData}
                    name="assign_data_count"
                    onChange={handleChange}
                    className="custom-input-style"
                  ></InputField>
                  {errorMessage && (
                    <p className="assign-data-error">{errorMessage}</p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="assign-data-modal-footer ">
          <ActionButton
            onClick={handleSubmit}
            className="btn assigndata-btn mx-3 mb-3 "
            disabled={!assignData}
          >
            Assign Data
          </ActionButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};
