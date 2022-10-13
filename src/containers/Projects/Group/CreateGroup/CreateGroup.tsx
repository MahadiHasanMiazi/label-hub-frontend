/* eslint-disable array-callback-return */
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import React, { useEffect, useMemo, useState } from "react";
import { Form, Modal, Row, Table } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../../app/store";
import { InputField } from "../../../../components/InputField/InputField";
import { PillBadge } from "../../../../components/PillBadge/PillBadge";
import { SearchBox } from "../../../../components/SearchBox/SearchBox";
import { UserRole } from "../../../../enums/UserRoleEnums";
import { createGroupofProject } from "../../../../features/projectGroup/projectGroupSlice";
import { ActionButton } from "./../../../../components/Button/ActionButton";
import { SelectField } from "./../../../../components/SelectField/SelectField";
import { allUser } from "./../../../../features/userList/userListSlice";
import { FiUsers } from "react-icons/fi"
import "@fontsource/nunito-sans";

import "./CreateGroup.css";
interface createGroupProps {
  show: boolean;
  setShow: (value: any) => void;
  projectId: number;
  annotationConfig?: any;
}
interface IRole {
  value: number;
  label: string;
}
export const CreateGroup: React.FC<createGroupProps> = ({
                                                          show,
                                                          setShow,
                                                          projectId,
                                                          annotationConfig,
                                                        }) => {
  const { users }: any = useSelector((state: RootState) => state.userList);
  const { isGroupSuccess, isGroupError, isGroupLoading }: any =
      useSelector((state: RootState) => state.projectGroupList);

  const dispatch = useDispatch();
  const { data: allUsers } = users || {};
  const initialstate = {
    name: "",
    annotationId: annotationConfig ? annotationConfig[0]?.id : null,
    description: "",
  };

  const [searchQuery, setSearchQuery] = useState("");
  const roleOptions: Array<IRole> = [
    {
      value: UserRole.ANNOTATOR,
      label: "Annotator",
    },
    {
      value: UserRole.VALIDATOR,
      label: "Validator",
    },
  ];

  const [createGroupData, setCreateGroupData] = useState(initialstate);
  const [annotationTypes, setAnnotationTypes] = useState(
      annotationConfig || []
  );

  const [userList, setUserList] = useState(
      null
      // users?.filter((user: any) => user.role === UserRole.ANNOTATOR || user.role === UserRole.VALIDATOR)
  );

  useEffect(() => {
    const list = allUsers?.filter(
        (user: any) =>
            user.role === UserRole.ANNOTATOR || user.role === UserRole.VALIDATOR
    );
    setUserList(list);
  }, [allUsers]);

  const [validatorList, setValidatorList] = useState(null);
  const [annotatorList, setAnnotatorList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [canGoBack, setCanGoBack] = useState(false);
  const [checkedUser, setCheckedUser] = useState({ checked: false, id: null });
  const [selectedUsers, setSelectedUsers] = useState(roleOptions[0].value);
  const [currentItems, setCurrentItems] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentUsers, setCurrentUsers] = useState(null);
  const [annotatorNameList, setAnnotatorNameList] = useState([])
  const [validatorNameList, setValidatorNameList] = useState(undefined)

  //getting all user data
  useEffect(() => {
    const userPayload = {
      user_role: selectedUsers,
      user_status: 2,
    };
    dispatch(allUser(userPayload));
  }, [dispatch, selectedUsers]);

  const handleClose = () => {
    setShow(false);
    setAnnotatorList([]);
    setValidatorList(null);
    setCreateGroupData(initialstate);
    setUserList(allUsers?.filter((user: any) => user.role === 3));
    setValidatorNameList(undefined);
    setAnnotatorNameList([])
    setSelectedUsers(UserRole.ANNOTATOR)
  };


  //handling  change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateGroupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handling  change event
  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setCheckedUser({
        checked: true,
        id: value,
      });
      setAnnotatorList([...annotatorList, parseInt(value)]);
      setAnnotatorNameList([...annotatorNameList, {
        id: parseInt(value),
        name: userNameFromId(parseInt(value)),
      }])
    } else {
      setCheckedUser({
        checked: false,
        id: value,
      });
      setAnnotatorList(
          annotatorList.filter((data: any) => data !== parseInt(value))
      );
      setAnnotatorNameList(
          annotatorNameList.filter((data: any) => data.id !== parseInt(value)))
    }
  };
  //handling  change event
  const handleRadiokBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setValidatorList(parseInt(value));
      setValidatorNameList({
        id: parseInt(value),
        name: userNameFromId(parseInt(value))
      })
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, annotationId, description } = createGroupData;

    const groupPayload = {
      name: name,
      description: description,
      project_id: projectId,
      project_task_uuid: `${projectId}_${parseInt(annotationId)}`,
      annotators: annotatorList,
      validator: validatorList,
    };
    if (groupPayload.name === "") {
      toast.warning("Please fill out all the fields");
    } else if (groupPayload.annotators.length === 0) {
      toast.warning("Atleast one annotator is required");
    } else {
      dispatch(createGroupofProject(groupPayload));
      handleClose();
    }
  };

  //filtering on role change
  const handleFilterRole = (roleValue: any) => {
    setSelectedUsers(roleValue);
    const usersData = [...allUsers];
    const filteredData = usersData.filter((item: any) => {
      if (item.role === parseInt(roleValue)) {
        return item;
      }
    });
    setUserList(filteredData);
  };
  //get name from userId
  const userNameFromId = (userId: any): any => {
    const usersData = allUsers.find((item: any) => {
      if (item.id === userId) {
        return item;
      }
    });

    return usersData?.full_name;
  };

  // creating new object for annotation type
  const annotationOptions = useMemo(
      () =>
          annotationTypes.map((item: any) => {
            return {
              label: item.name,
              value: item.id,
            };
          }),
      [annotationTypes]
  );



  useEffect(() => {
    const endOffset = itemOffset + 3;
    setCurrentItems(allUsers?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allUsers?.length / 3));
  }, [itemOffset, allUsers]);

  // const handlePageClick = async (data: any) => {
  //   let currentPage = data.selected + 1;
  //   setPageNo(currentPage);
  // };

  const handlePageClick = (event: any) => {
    const pageNumber = event.selected;
    const newOffset = (pageNumber * 5) % allUsers.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setCurrentUsers(currentItems);
  }, [currentItems]);

  const handleCancel = (userId: number) => {
    setAnnotatorList(annotatorList.filter((data: any) => data !== userId));
    setAnnotatorNameList(
        annotatorNameList.filter((data:any) => data.id !== userId)
    );
  };

  const handleCancelValidator = (userId: number) => {
    setValidatorList(null)
    setValidatorNameList(undefined)
  }


  return (
      <Modal className='create-group-modal' show={show} onHide={handleClose} centered size="lg">
        <IoMdClose onClick={handleClose} className="closeIcon"></IoMdClose>
        <Modal.Header className="update-project-modal-header mt-3">
          <Modal.Title id="contained-modal-title-vcenter" className="group-title">
            Create Group
          </Modal.Title>
          <div className="active-inactive-learning">
            <span className="mr-1 active-learning-label">Active Learning</span>
            <BootstrapSwitchButton
                // onChange={() => setActive(!active)}
                checked={true}
                size="xs"
            />
          </div>
        </Modal.Header>
        <Modal.Body className="update-modal-body">
          <div className="row p-2">
            <div className="col">
              <Row>
                <div className="col-5">
                  <InputField
                      className="custom-input-style"
                      onChange={handleChange}
                      type="text"
                      name="name"
                      label="Name"
                      labelClass='input-label'
                      placeholder="Group name"
                      value={createGroupData.name}
                  ></InputField>
                </div>
                <div className="col-5 task-select">
                  <SelectField
                      className="select-custom-design form-select"
                      onChange={handleChange}
                      name="annotationId"
                      label="Annotation type"
                      value={createGroupData.annotationId}
                      options={annotationOptions}
                  ></SelectField>
                </div>
              </Row>
              <section className="userGroup-section">
                <h5 className="">User List</h5>
                <div className="userGroup-list">
                  <div className="group-search-filter justify-content-end">
                    <div className="group-select-filter">
                      <Form.Select
                          className="form-control select-custom-design"
                          size="sm"
                          aria-label="Default select example"
                          name="selectedUsers"
                          onChange={(e: any) => handleFilterRole(e.target.value)}
                      >
                        {roleOptions.map((role) => (
                            <option value={role.value} key={role.value}>
                              {role.label}
                            </option>
                        ))}
                      </Form.Select>
                    </div>

                    <SearchBox
                        className="search-group"
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        placeholder="Name, Email"
                    ></SearchBox>
                  </div>

                  <div className="container">
                    <Row>
                      <div className="col userGroup-table">
                        <Table borderless>
                          <thead className="userGroup-header">
                          <tr className="row user-list-header">
                            <th className="header-check" scope="col">
                              <input type='checkbox' disabled={true}/>
                            </th>
                            <th className="col-3 header-name" scope="col">
                              Name
                            </th>
                            <th className="col-3" scope="col">
                              Email
                            </th>
                            <th className="col-3" scope="col">
                              Assign Data
                            </th>
                            <th className="col-2" scope="col">
                              Annotated data
                            </th>
                          </tr>
                          </thead>
                          <tbody>
                          {currentUsers &&
                              currentUsers
                                  .filter((filteredUser: any) => {
                                    if (searchQuery === "") {
                                      return filteredUser;
                                    } else if (
                                        filteredUser.full_name
                                            ?.toLowerCase()
                                            ?.includes(searchQuery.toLowerCase())
                                    ) {
                                      return filteredUser;
                                    }else if (
                                        filteredUser.email
                                            ?.toLowerCase()
                                            ?.includes(searchQuery.toLowerCase())
                                    ) {
                                      return filteredUser;
                                    }
                                  })
                                  .map((user: any, index: any) => {
                                    return (
                                        <tr className="row table-body-row" key={user.id}>
                                          <td className="" style={{width: '20px'}}>
                                            {user.role === 3 ? (
                                                <input
                                                    type="checkbox"
                                                    checked={annotatorList.includes(parseInt(user.id))}
                                                    className="form-check-input ml-1"
                                                    value={user.id}
                                                    onChange={(e) => handleCheckBox(e)}
                                                />
                                            ) : (
                                                <input
                                                    type="radio"
                                                    className="form-check-input ml-1"
                                                    value={user.id}
                                                    name={user.name}
                                                    checked={user.id === validatorList}
                                                    onChange={(e) => handleRadiokBox(e)}
                                                />
                                            )}
                                          </td>
                                          <td className="col-3 group-user-name">
                                            {user.full_name}
                                          </td>
                                          <td className="col-3">{user.email}</td>
                                          <td className="col-3">{user.id}</td>
                                          <td className="col-2">{user.id}</td>
                                        </tr>
                                    );
                                  })}
                          </tbody>
                        </Table>

                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination justify-content-end"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active"}
                        />
                      </div>
                    </Row>
                  </div>
                </div>
              </section>

              <section className="row p-3">
                <div className=" annotator-section">
                  <h5>Annotators</h5>
                  {annotatorNameList?.map((user: any) => {
                    return (
                        <PillBadge
                            key={user.id}
                            name={user.name}
                            id={user.id}
                            cross="AiOutlineClose"
                            className="pillBadge-and-cross"
                            handleCancel={handleCancel}
                        ></PillBadge>
                    );
                  })}
                </div>
                <div className="validator-section">
                  <h5>Validator</h5>
                  {validatorNameList && (
                      <PillBadge
                          key={validatorList}
                          name={validatorNameList.name}
                          cross="AiOutlineClose"
                          className="pillBadge-and-cross-for-validator"
                          handleCancel={handleCancelValidator}
                      ></PillBadge>
                  )}
                </div>
              </section>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="update-modal-footer">
          <ActionButton
              onClick={handleSubmit}
              className="btn create-group-btn mx-3 mb-3 px-4"
          >
            <FiUsers></FiUsers>
            Create Group
          </ActionButton>
        </Modal.Footer>
      </Modal>
  );
};
