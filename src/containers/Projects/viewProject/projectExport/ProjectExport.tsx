import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FiDownloadCloud } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { ActionButton } from "../../../../components/Button/ActionButton";
import "./ProjectExport.css";
interface ProjectExportProps {
  show: boolean;
  setShow?: any;
}

export const ProjectExport: React.FC<ProjectExportProps> = ({
  show,
  setShow,
}) => {
  const initialState = [
    {
      data: [
        "pos",
        "ner",
        "shallow",
        "dependency",
        "lemma",
        "text_classification",
        "coreference_resolution",
        "paraphrasing",
        "wsd",
        "question_answer",
      ],
      groupId: 1,
      disabled: false,
    },
    {
      data: ["semantic_similarity"],
      groupId: 2,
      disabled: false,
    },
    {
      data: ["bd_lexicon"],
      groupId: 3,
      disabled: false,
    },
  ];
  const [taskList, setTaskList] = useState(initialState);
  const [selectedExportType, setSelectedExportType] = useState("JSON");

  const fileOptions= [
    {
      value: "JSON",
      label: "JSON",
    },
    {
      value: "XLSX",
      label: "XLSX",
    },
    {
      value: "CSV",
      label: "CSV",
    },
    {
      value: "CONLL",
      label: "CONLL",
    },
    {
      value: "PENIN",
      label: "PENIN",
    },
  ];
  const annotationTypeOptions= [
    {
      value: "PoS",
      label: "PoS",
    },
    {
      value: "NER",
      label: "NER",
    },
    {
      value: "DP",
      label: "DP",
    },
    {
      value: "WSD",
      label: "WSD",
    },
    {
      value: "QA",
      label: "QA",
    },
    {
      value: "BD Lexicon",
      label: "BD Lexicon",
    },
  ];

  const handleClose = () => {
    setShow(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    setSelectedExportType(e.target.value);
  };

  //handling  radio event
  const handleRadioBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedExportType(value);
    }
  };
  //handling  radio event
  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
  
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
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
              <div className="my-2  mx-3">
                <h4 className="export-type-title">Annotation Type</h4>
                {annotationTypeOptions.map((annotationType: any, index: number) => {
                return (
                  <div className="d-flex mx-2" key={index}>
                    <input
                      className="form-check-radio mt-1"
                      type="checkbox"
                      value={annotationType.value}
                      name={annotationType.label}
                      id={annotationType.value}
                      onChange={(e) =>handleCheckBox(e)}
                    />
                    <label
                      className="form-check-label mx-2"
                      htmlFor={annotationType.label}
                    >
                      {annotationType.label}
                    </label>
                  </div>
                );
              })}
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
