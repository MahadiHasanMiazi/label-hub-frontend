import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FiDownloadCloud } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { ActionButton } from "../../../../../components/Button/ActionButton";
import "./ExportGroup.css";
interface ExportGroupProps {
  show: boolean;
  setShow?: any;
  unassignedData: any;
}

export const ExportGroup: React.FC<ExportGroupProps> = ({
  show,
  setShow,
  unassignedData,
}) => {
  const [selectedExportType, setSelectedExportType] = useState("JSON");
  const fileOptions = [
    {
      value: "JSON",
      label: "JSON",
    },
    {
      value: "CSV",
      label: "CSV",
    },
  ];
  const handleClose = () => {
    setShow(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
  };
 //handling  radio event
 const handleRadioBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedExportType(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="mx-3">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="export-project-modal-title "
          >
            Export Data
          </Modal.Title>

          <IoMdClose onClick={handleClose} className="closeIcon"></IoMdClose>
        </Modal.Header>
        <Modal.Body className="export-modal-body">
          <section className="row my-3 export-modal-container">
            <div className="col-5 export-data-section">
              <h4 className="export-type-title">Choose Format</h4>

              {fileOptions.map((expType: any, index: number) => {
                return (
                  <div className="d-flex mx-2" key={index}>
                    <input
                      className="form-check-radio mt-1"
                      type="radio"
                      value={expType.value}
                      name={expType.label}
                      id={expType.value}
                      checked={expType.label === selectedExportType}
                      onChange={handleRadioBox}
                    />
                    <label
                      className="form-check-label mx-2"
                      htmlFor={expType.label}
                    >
                      {expType.label}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="col-5 export-annotation-section ">
              <div className=" mx-3">
                <h4 className="export-type-title">Available Data</h4>
                <h1 className="text-center">{unassignedData?.unassigned_data_count}</h1>
              </div>
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer className="createProject-modal-footer">
          <ActionButton
            onClick={handleSubmit}
            className="btn exportProject-btn mx-3 mb-3 px-4"
          >
            <FiDownloadCloud></FiDownloadCloud> Export Data
          </ActionButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};


