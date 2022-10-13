import { Col } from "react-bootstrap";
import { ActionButton } from "../../Button/ActionButton";
import "./OverviewCard.css";
import { Link } from "react-router-dom";

interface OverviewCardProps {
  heading: string;
  count: number;
  path?: string;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({
  heading,
  count,
  path,
}) => {
  return (
    <>
      <Col lg={3} md={4} className="my-2">
        <div className="box-shadow overview-container rounded p-3">
          <p className="overview-heading">{heading}</p>
          <h1 className="overview-count text-center p-3">{count}</h1>
          <Link to={path || "/"}>
            <ActionButton className="btn btn-block overview-btn">
              view
            </ActionButton>
          </Link>
        </div>
      </Col>
    </>
  );
};
