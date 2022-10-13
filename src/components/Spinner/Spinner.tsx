import { css } from "@emotion/react";
import { HashLoader } from "react-spinners";
const override = css`
  display: flex;
  position: absolute;
  top: 40%;
  left: 50%;
  z-index: 99999999;
`;
export default function Spinner() {
  return (
    <HashLoader loading css={override} color="#5A7DED" size={70}></HashLoader>
  );
}
