import "./MemberInfo.css";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";

interface MemberInfoProps {
  member: any;
  percentageOfAnnotatedData?: (a?: any, b?: any) => any;
}

export const MemberInfo: React.FC<MemberInfoProps> = ({
  member,
  percentageOfAnnotatedData,
}) => {
  return (
    <>
      {percentageOfAnnotatedData ? (
        <Col xl={4} lg={6} md={6} className="my-2">
          <div className=" group-annotator-details">
            <Col lg={6} className="px-3 group-annotation-type-title">
              <h6 className="member-title mx-2"> {member.name}</h6>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>Annotated data 0 and Assigned data 0</Tooltip>
                }
              >
                <span className="member-annotation-info">0/0</span>
              </OverlayTrigger>
            </Col>
            <Col lg={6}>
              <div></div>
              <p className="member-data-annotation-percentage">0 %</p>
              <p className="accuracy">accuracy</p>
            </Col>
          </div>
        </Col>
      ) : (
        <Col xl={3} lg={3} md={4} className="my-2">
          <div className="group-validator-details">
            <Row>
              <Col className="px-3 d-flex">
                <h6 className="member-title mx-2"> {member.name}</h6>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>Annotated data 0 and Assigned data 0</Tooltip>
                  }
                >
                  <span className="member-validation-info">0/0</span>
                </OverlayTrigger>
              </Col>
            </Row>
          </div>
        </Col>
      )}
    </>
  );
};
