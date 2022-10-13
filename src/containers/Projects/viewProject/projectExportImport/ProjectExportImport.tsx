/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import React, { useEffect, useState } from "react";
import { Modal, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../../../app/store";
import { first_group, second_group, third_group } from "../../../../constants/constant";
import { reset, serviceFileUpload } from "../../../../features/projectData/projectDataSlice";
import { allTasks } from "../../../../features/tasks/tasksSlice";
import { DataUploadAnnotationType } from "../../createProject/AnnotationType/DataUploadAnnotationType";
import { ActionButton } from "./../../../../components/Button/ActionButton";
import "./ProjectExportImport.css";

interface ProjectExportImportProps {
  show: boolean;
  setShow: any;
  projectId: number;
}
interface IFile {
  value: string;
  label: string;
}

export const ProjectExportImport: React.FC<ProjectExportImportProps> = ({
  show,
  setShow,
  projectId,
}) => {
  const { isLoading, isError, message } =
      useSelector((state: RootState) => state.projectServiceData);

  const { tasksList: annotationTypes } = useSelector(
      (state: RootState) => state.tasks
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allTasks());
  }, [dispatch]);

  const fileOptions: Array<IFile> = [
    {
      value: "CSV",
      label: "CSV",
    },
    {
      value: "XLSX",
      label: "XLSX",
    },
  ];

  const [files, setFiles] = useState<any>([]);
  const [selectedTasks, setSelectedTasks] = useState<any>([]);
  const [uploadData, setUploadData] = useState({
    dataFormat: fileOptions[0].value,
    tasks: [],
  });
  const [toggleGroupId, setToggleGroupId] = useState(null);
  const [activeAnnotatedData, setActiveAnnotatedData] = useState(false)
  const [disableTasks, setDisableTasks] = useState([])
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

  // const first_group = [
  //   "pos",
  //   "ner",
  //   "shallow",
  //   "dependency",
  //   "lemma",
  //   "text_classification",
  //   "coreference_resolution",
  //   "paraphrasing",
  //   "wsd",
  //   "question_answer",
  // ];
  // const second_group = ["semantic_similarity"];
  // const third_group = ["bd_lexicon"];
  const handleClose = () => {
    setShow(false);
    setTaskList(initialState);
    setSelectedTasks([]);
    setFiles([])
    removeAll();
  };
  useEffect(() => {
    if (isError || message) {
      toast.error(message)
    }
    dispatch(reset());
  }, [isError, message, dispatch]);

  const removeAll = () => {
    if (acceptedFiles) {
      acceptedFiles.length = 0;
      acceptedFiles.splice(0, acceptedFiles.length);
     
    }
  };

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({

    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file, key) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const filedata = acceptedFiles.map((file: any, key) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUploadData({ ...uploadData, [name]: value });
  };
  const toggleAnnotationTag = (taskName: any, groupId: any) => {
    setToggleGroupId(groupId);
    //adding tags if not exists
    if (
      first_group.includes(taskName) ||
      second_group.includes(taskName) ||
      third_group.includes(taskName)
    ) {
      const tastExist = selectedTasks.some(
        (element: any) => element === taskName
      );
      if (!tastExist) {
        setSelectedTasks([...selectedTasks, taskName]);
      } else {
        setSelectedTasks(
          selectedTasks.filter((items: any) => items !== taskName)
        );
      }
    }
  };
  useEffect(() => {
    const taskItem = [...taskList];
    if (selectedTasks.length === 0) {
      setTaskList(initialState);
    } else {
      const selectedItem = taskItem.map((item, key) => {
        if (item.groupId === toggleGroupId) {
          return { ...item, disabled: false };
        } else {
          return { ...item, disabled: true };
        }
      });
      setTaskList(selectedItem);
    }
  }, [selectedTasks, toggleGroupId]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const uploadPayload = {
      filetype: uploadData.dataFormat,
      tasksList: selectedTasks,
      file: files[0],
      projectId: projectId,
    };
    dispatch(serviceFileUpload(uploadPayload))

    handleClose();

  };
  const openFile = () => {
    setFiles([])
  }

  const changeAnnotation = (id: any) => {
    const taskExist = selectedTasks.some((element: any) => element.id === id);
    if (!taskExist) {
      annotationTypes.map((data: any, key: number) => {
        if (data.id === id) {
          setSelectedTasks([
            ...selectedTasks,
            {
              id: data.id,
              tags: [],
              taskNames: data.name
            },
          ]);
        }
      });
    } else {
      setSelectedTasks(selectedTasks.filter((items: any) => items.id !== id));

    }
  };

  useEffect(() => {
    let disableTasks: any = []

    if(selectedTasks?.every((element: any) => first_group.includes(element.taskNames))){
      disableTasks = second_group.concat(third_group)
    }
    if (selectedTasks?.every((element: any) => second_group.includes(element.taskNames))){
      disableTasks = first_group.concat(third_group)
    }
    if (selectedTasks?.every((element: any) => third_group.includes(element.taskNames))){
      disableTasks = first_group.concat(second_group)
    }
    if(selectedTasks.length === 0){
      disableTasks = []
    }
    setDisableTasks(disableTasks)
  }, [selectedTasks])


  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header className="upload-project-modal-header mt-5">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="upload-project-modal-title "
          >
            Upload Data
          </Modal.Title>
          <div className='active-inactive-learning'>
            <span className='mr-1 active-learning-label'>Annotated Data</span>
            <BootstrapSwitchButton
                onChange={() => setActiveAnnotatedData(!activeAnnotatedData)}
                checked={activeAnnotatedData}
                size="xs"
            />
          </div>

          <IoMdClose onClick={handleClose} className="closeIcon"></IoMdClose>
        </Modal.Header>
        <Modal.Body className="edit-modal-body">
          <div className="row p-2">
            <div className="col">
              <section className="row my-3">
                {/*<div className="col-lg-5">*/}
                {/*  <SelectField*/}
                {/*    onChange={handleChange}*/}
                {/*    label="Data format"*/}
                {/*    name="dataFormat"*/}
                {/*    value={uploadData.dataFormat}*/}
                {/*    options={fileOptions}*/}
                {/*  ></SelectField>*/}
                {/*</div>*/}
                <div className="col-12 ">
                  <div className="my-2 upload-data-tasks">
                    {/*{taskList.map((group) => {*/}
                    {/*  const { data, groupId, disabled } = group;*/}
                    {/*  return data.map((task, index) => {*/}
                    {/*    return (*/}
                    {/*      <span key={index}>*/}
                    {/*        <Badge*/}
                    {/*          as="button"*/}
                    {/*          className={`mx-2 my-1   ${*/}
                    {/*            disabled*/}
                    {/*              ? "diaabled-badge"*/}
                    {/*              : " dataupload-badge"*/}
                    {/*          } `}*/}
                    {/*          bg="transparent"*/}
                    {/*          onClick={() => {*/}
                    {/*            toggleAnnotationTag(task, groupId);*/}
                    {/*          }}*/}
                    {/*          disabled={disabled}*/}
                    {/*        >*/}
                    {/*          {task}*/}
                    {/*        </Badge>*/}
                    {/*        {selectedTasks.map((tasks: any, index: number) => {*/}
                    {/*          if (task === tasks) {*/}
                    {/*            return (*/}
                    {/*              <AiFillCloseCircle*/}
                    {/*                key={index}*/}
                    {/*                className="task-close-icon"*/}
                    {/*                onClick={() => {*/}
                    {/*                  toggleAnnotationTag(task, groupId);*/}
                    {/*                }}*/}
                    {/*              ></AiFillCloseCircle>*/}
                    {/*            );*/}
                    {/*          }*/}
                    {/*        })}*/}
                    {/*      </span>*/}
                    {/*    );*/}
                    {/*  });*/}
                    {/*})}*/}
                    <Row>
                      <div className='annotation-tasks col-6'>
                        <DataUploadAnnotationType
                            className = 'project-data-upload'
                            annotationTypes={annotationTypes}
                            selectedTasks={selectedTasks}
                            changeAnnotation={changeAnnotation}
                            isAnnotatedData={activeAnnotatedData}
                            disableTasks={disableTasks}
                        ></DataUploadAnnotationType>
                      </div>
                      <div className='data-format pl-5 col-6'>
                        <span className='choose-file-format-title mb-5'>Choose Format</span>
                        <div className='mt-2'>
                          {!activeAnnotatedData ? (fileOptions.map((format: any, key:number) => {
                            return(
                                <div key={key}>
                                  <input
                                      type="radio"
                                      className="form-check-input ml-1"
                                      value={format.value}
                                      name='format'
                                      id={format.value}
                                      // checked=''
                                      // onChange={(e) => handleRadiokBox(e)}
                                  /> <label className='ml-4' htmlFor={format.value}>{format.label}</label>
                                </div>
                            )
                          })) :  (
                              <>
                                <input
                                    type="radio"
                                    className="form-check-input ml-1"
                                    value='JSON'
                                    name='format'
                                    id='format'
                                /> <label className='ml-4' htmlFor="format">JSON</label>
                              </>
                              )}
                        </div>
                      </div>
                    </Row>
                  </div>
                </div>

                <div className="container dnd-file-upload">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input  {...getInputProps()} />
                    <h5 className="dnd-text">
                      <FiUploadCloud className="dnd-file-icon"></FiUploadCloud>
                      Drag and Drop here or{" "}
                    </h5>
                    <span onClick={openFile}>
                      <Link to="#" onClick={open}>
                        Browse file
                      </Link>
                    </span>
                  </div>
                  <aside>
                    <p className="file-data">{filedata}</p>
                  </aside>
                </div>
              </section>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="createProject-modal-footer">
          <ActionButton
            onClick={handleSubmit}
            className="btn createProject-btn mx-3 mb-3 px-4"
            disabled={(selectedTasks.length === 0 || files.length === 0)}
          >
            {/*<AiOutlineUpload></AiOutlineUpload> Upload Data*/}
            <FiUploadCloud></FiUploadCloud> Upload Data
          </ActionButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};
