import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { getAllStatus } from "../../../features/projectStat/projectStatSlice";
import { AnottedInfo } from "../AnottedInfo/AnottedInfo";
import "./AnottedData.css";

export const AnottedData = () => {
  const { projectStatInformation, isError, isSuccess, isLoading } = useSelector(
    (state: RootState) => state.projectStatus
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStatus());
  }, [dispatch]);

  return (
    <Col md={12} lg={10} xl={8} sm={12}>
      <div className="anotted-container p-3 rounded box-shadow">
        <h3 className="anotted-heading">Available Annotated Data</h3>
        <div className="anotted-info py-3">
          {projectStatInformation.map((projectStat: any) => {
            return (
              <AnottedInfo
                key={projectStat.task_id}
                heading={projectStat.task_name}
                now={
                  (projectStat.num_of_annotated_date * 100) /
                  projectStat.num_of_assigned_data
                }
                label={
                  projectStat.num_of_assigned_data -
                  projectStat.num_of_annotated_date
                }
              ></AnottedInfo>
            );
          })}
        </div>
      </div>
    </Col>
  );
};
