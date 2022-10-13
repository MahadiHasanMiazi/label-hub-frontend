import { ProgressBar } from "react-bootstrap";
import "./AnottedInfo.css";
interface AnottedInfoProps {
  heading: string;
  label: number;
  now: number;
}

export const AnottedInfo: React.FC<AnottedInfoProps> = ({
  heading,
  label,
  now,
}) => {
  return (
    <div className="anotted-data">
      <p>{heading} </p>
      <ProgressBar className="anotted-progress" now={now} label={label} />
    </div>
  );
};
