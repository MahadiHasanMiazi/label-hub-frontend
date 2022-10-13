import { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Switch from "react-switch";

import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { RootState } from "../../app/store";
import delIcon from "../../assets/images/delete-with-bg.svg";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ActionButton } from "../../components/Button/ActionButton";
import { ModalBox } from "../../components/Modal/ModalBox";
import Pagination from "../../components/Pagination/Pagination";
import { SelectField } from "../../components/SelectField/SelectField";
import { ModalRole } from "../../enums/ModalEnums";
import { PaginationCount } from "../../enums/PaginationEnums";
import { UserRole } from "../../enums/UserRoleEnums";
import { UserStatus } from "../../enums/UserStatusEnums";
import {
  allUser,
  updateUserStatus,
} from "../../features/userList/userListSlice";
import { roleCheck } from "../../utils/userRoles";
import Spinner from "./../../components/Spinner/Spinner";
import { AddUser } from "./AddUser/AddUser";
import "./AllUserList.css";
import { IRole, IUserStatus } from "./AllUserListType";
import { UserFilter } from "./UserFilter/UserFilter";

export const AllUserList = () => {
  const { users, isLoading } = useSelector(
    (state: RootState) => state.userList
  );
  const { data: allUserList, total_data_count } = users || [];
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [role, setRole] = useState(0);
  const [userStatus, setUserStatus] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [userID, setUserID] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const handleShowEdit = () => setShowEdit(true);
  const handleShow = () => setShowDelete(true);
  const itemsPerPage = PaginationCount.USER_PERPAGE;
  useEffect(() => {
    const userPayload = {
      page: pageNo,
      user_role: role,
      user_status: userStatus,
    };
    dispatch(allUser(userPayload));
  }, [dispatch, role, userStatus, pageNo]);

  const userIdSet = (rowIdx: any) => {
    setUserID(rowIdx.id);
  };
  const crumbsLinks = [
    {
      path: "/dashboard",
      name: "Dashboard",
      active: false,
    },
    {
      path: "#",
      name: "Users",
      active: true,
    },
  ];
  const userStatusOptions: Array<IUserStatus> = [
    {
      value: 0,
      label: "All",
    },
    {
      value: UserStatus.ACTIVE,
      label: "Active",
    },
    {
      value: UserStatus.PENDING,
      label: "Pending",
    },
  ];
  const userRoleOptions: Array<IRole> = [
    {
      value: 0,
      label: "All",
    },
    {
      value: UserRole.MANAGER,
      label: "Manager",
    },
    {
      value: UserRole.ANNOTATOR,
      label: "Annotator",
    },
    {
      value: UserRole.VALIDATOR,
      label: "Validator",
    },
    {
      value: UserRole.GUEST,
      label: "Guest",
    },
  ];
  const columns: any = useMemo(
    () => [
      {
        Header: "NO",
        disableFilters: true,
        Cell: (props: any) => {
          return (
            <>
              <span className="">{props.row.index + 1}</span>
            </>
          );
        },
      },
      {
        Header: " Name",
        accessor: "full_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone_number",
      },
      {
        Header: "User Type",
        accessor: "role",
        Cell: (props: any) => {
          return (
            <>
              <span className="">{roleCheck(props.value)}</span>
            </>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (props: any) => {
          return (
            <>
              {(() => {
                if (props.value === UserStatus.ACTIVE) {
                  return (
                    <span className="text-success cursor-pointer">
                      <GoPrimitiveDot></GoPrimitiveDot> Active
                    </span>
                  );
                } else if (props.value === UserStatus.DELETED) {
                  return (
                    <span className="text-danger cursor-pointer">
                      <GoPrimitiveDot></GoPrimitiveDot> Inctive
                    </span>
                  );
                } else {
                  return (
                    <span className="text-warning cursor-pointer">
                      <GoPrimitiveDot></GoPrimitiveDot> Pending
                    </span>
                  );
                }
              })()}
            </>
          );
        },
      },
      {
        Header: "Created Date",
        accessor: "dob",
      },
      {
        Header: "Actions",
        Cell: (props: any) => {
          const rowIdx = props.row;
          return (
            <div className="d-flex">
              <span className="mt-2">
                <Switch
                  onChange={() => {
                    dispatch(updateUserStatus(rowIdx.original.id));
                  }}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onColor="#605dec"
                  checked={rowIdx.original.status === UserStatus.ACTIVE}
                  className="react-switch"
                  disabled={rowIdx.original.status === UserStatus.ACTIVE}
                />
              </span>
              <span className="mx-2 action-icons-eye">
                <Link to={`/users/${rowIdx.original.id}`}>
                  {" "}
                  <AiOutlineEye></AiOutlineEye>
                </Link>
              </span>
              <span
                className="mx-2  action-icons-trash"
                onClick={() => {
                  handleShow();
                  userIdSet(rowIdx.original);
                }}
              >
                <RiDeleteBin5Line></RiDeleteBin5Line>
              </span>
            </div>
          );
        },
      },
    ],

    [dispatch]
  );
  const data: any = useMemo(() => allUserList || [], [allUserList]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    pageOptions,
    state,
    pageCount,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: pageNo,
        pageSize: itemsPerPage,
      },
      manualPagination: true,
      pageCount: Math.ceil(total_data_count / itemsPerPage),
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;
  const noOfPages = Math.ceil(total_data_count / itemsPerPage);

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRole(parseInt(value));
  };

  const handleUserStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserStatus(parseInt(value));
  };
  useEffect(() => {
    role >= 0 && setPageNo(1);
  }, [noOfPages, role]);
  //pagination change side effect
  useEffect(() => {
    noOfPages === pageNo ? setCanGoNext(false) : setCanGoNext(true);
    pageNo === 1 ? setCanGoBack(false) : setCanGoBack(true);
  }, [noOfPages, pageNo, role]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <ModalBox
        show={showDelete}
        setShow={setShowDelete}
        actionData={userID}
        role={ModalRole.DELETE_USER}
        modalIcon={delIcon}
        modalText="Are you want to delete this user?"
      ></ModalBox>
      <AddUser show={showEdit} setShow={setShowEdit}></AddUser>
      <section className="userList-section-container mb-5">
        <BreadCrumbs crumbsLinks={crumbsLinks}></BreadCrumbs>
        <div className="user-heading-section">
          <h1 className="userList-header">Users</h1>
          <h6 className="user-conunt"> ({allUserList && total_data_count})</h6>
        </div>

        <div className="my-4">
          <ActionButton
            className="btn userList-btn"
            onClick={() => handleShowEdit()}
          >
            <AiOutlinePlus></AiOutlinePlus> Add User
          </ActionButton>
        </div>

        <div className="userList-section">
          <div className="my-3 row justify-content-end">
            <div className="mr-3">
              <SelectField
                options={userRoleOptions}
                value={role}
                onChange={handleRoleChange}
                name="role"
              ></SelectField>
            </div>
            <div>
              <SelectField
                options={userStatusOptions}
                value={userStatus}
                onChange={handleUserStatusChange}
                name="userStatus"
              ></SelectField>
            </div>

            <UserFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
            ></UserFilter>
          </div>
          <div className="my-3">
            <Table borderless hover {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? "▼"
                              : "▲"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Pagination
              setPageNo={setPageNo}
              canGoBack={canGoBack}
              previousPage={previousPage}
              nextPage={nextPage}
              canGoNext={canGoNext}
              pageCount={pageCount}
              pageOptions={pageOptions}
              pageNo={pageNo}
            ></Pagination>
          </div>
        </div>
      </section>
    </>
  );
};
