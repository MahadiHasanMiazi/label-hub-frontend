import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./AvailableAnottedData.css";
import { getAllStatus } from "./../../../features/projectStat/projectStatSlice";
import { RootState } from "../../../app/store";
import { useEffect } from "react";

export const AvailableAnottedData = () => {
  const { projectStatInformation } = useSelector(
    (state: RootState) => state.projectStatus
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStatus());
  }, [dispatch]);

  return (
    <>
      <h3 className="annotation-data-heading">Annotated Data</h3>
      <Container className="shadow-lg">
        <Row>
          {projectStatInformation &&
            projectStatInformation.map((projectStat: any) => {
              return (
                <Col
                  lg={2}
                  className="annotation-type-container"
                  key={projectStat.task_id}
                >
                  <div>
                    <h6 className="annotation-type-title">
                      {projectStat.task_name}
                    </h6>
                    <h5 className="annotation-type-count">
                      {projectStat.num_of_annotated_date}
                    </h5>
                  </div>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};
