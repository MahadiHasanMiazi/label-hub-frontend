import { Container, Row, Col } from "react-bootstrap";
import { Image } from "../Image/Image";
import bcclogo from "../../assets/images/bcc.svg";
import banglac from "../../assets/images/bangla.svg";
import ictdiv from "../../assets/images/ictdiv.svg";
import  './Branding.css'
export const Branding = () => {
  return (
    <Container>
      <Row className="justify-content-center align-items-center ">
        <Col xs={5}>
          <Row className="justify-content-center align-items-center ">
            <Image
              className="branding-logos"
              src={ictdiv}
              alt="ict division"
            ></Image>
            <Image className="branding-logos" src={bcclogo} alt="bcc"></Image>
            <Image
              className="branding-logos"
              src={banglac}
              alt="Bangla Corpus"
            ></Image>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
