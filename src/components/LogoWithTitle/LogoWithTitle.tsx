import { Image } from "../Image/Image";
import "./LogoWithTitle.css";
import corpus_logo from "../../assets/images/corpus-logo.svg";
interface LogoWithTitleProps {
  title: string;
}

export const LogoWithTitle: React.FC<LogoWithTitleProps> = ({ title }) => {
  return (
    <>
      <Image src={corpus_logo} className="my-3 main-logo"></Image>
      <h1 className="heading-title  my-4">{title}</h1>
    </>
  );
};
