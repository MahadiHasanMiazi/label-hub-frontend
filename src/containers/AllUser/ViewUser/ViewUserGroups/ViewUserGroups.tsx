import "./ViewUserGroups.css";
import { Row, Table, Col } from "react-bootstrap";
import { useMemo, useState, useEffect } from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../app/store";
import { allGroupOfUser } from "../../../../features/userList/userListSlice";
import { UserGroupFilter } from "../UserGroupFilter/UserGroupFilter";


export const ViewUserGroups= () => {
  const { userGroups } = useSelector((state: RootState) => state.userList);
  const { data: grouplist,total_data_count } = userGroups;
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const [itemsPerPage] = useState(6);
  const { userId } = useParams();


  useEffect(() => {
    const userPayload = {
      userId: userId,
      page: 1,
    };
    dispatch(allGroupOfUser(userPayload));
  }, [dispatch,userId]);

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
        Header: "Group Name",
        accessor: "name",
      },
      {
        Header: "Project Name",
        accessor: "project_name",
      },
      {
        Header: "Annotation Type",
        accessor: "annotation_task.name",
      },
      {
        Header: "Assigned Data",
        accessor: "assigned_data_count",
      },
      {
        Header: "Complete Data",
        accessor: "validated_data_count",
      },

      {
        Header: "Actions",
        Cell: (props: any) => {
          const rowIdx = props.row;
          return (
            <>
              <Link
                className="btn user-group-btn"
                to={`/dashboard/projects/${rowIdx.original.project_id}/group/${rowIdx.original.id}`}
              >
                {" "}
                View
              </Link>
            </>
          );
        },
      },
    ],
    []
  );
  const data: any = useMemo(() => grouplist || [], [grouplist]);

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
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex } = state;
  return (
    <>
      <Row>
        <Col  className="usergroup-list-container my-2">
          <div className="user-group-filter">
            <UserGroupFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
            ></UserGroupFilter>
          </div>

          <div className="my-2">
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
          </div>
        </Col>
      </Row>
    </>
  );
};


