import BootstrapSwitchButton from "bootstrap-switch-button-react";
import React, { useCallback, useEffect, useState } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { TokenAnnotator } from "react-text-annotate";
import { ModalBox } from "../../../components/Modal/ModalBox";
import { ModalRole } from "../../../enums/ModalEnums";
import { ActionButton } from "./../../../components/Button/ActionButton";
import "./AnnotatorNer.css";
import rejectIcon from "../../../assets/images/reject-withbg.svg";
import nullSubmitIcon from "../../../assets/images/null-submit-bg.svg";
export const AnnotatorNer = () => {
  const [showReject, setShowReject] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [annotationInfo, setAnnotationInfo] = useState<any>({
    value: [],
    tag: "PER",
  });
  const [position, setPosition] = useState<any>();
  const [positionEnd, setPositionEnd] = useState<any>();
  const annotationCategory = [
    {
      id: 1,
      name: "PERSON",
      subCategory: [
        {
          id: 1,
          text: "PER",
        },
      ],
    },
    {
      id: 2,
      name: "ORGANIZATION",
      subCategory: [
        {
          id: 1,
          text: "ORG",
        },
      ],
    },
    {
      id: 3,
      name: "LOCATION",
      subCategory: [
        {
          id: 1,
          text: "LOC",
        },
      ],
    },
    {
      id: 4,
      name: "OBJECT",
      subCategory: [
        {
          id: 1,
          text: "OBJ",
        },
      ],
    },
    {
      id: 5,
      name: "FACILITY",
      subCategory: [
        {
          id: 1,
          text: "FC",
        },
      ],
    },
    {
      id: 6,
      name: "EVENT",
      subCategory: [
        {
          id: 1,
          text: "EV",
        },
      ],
    },
    {
      id: 7,
      name: "WORK OF ART",
      subCategory: [
        {
          id: 1,
          text: "WOA",
        },
      ],
    },
    {
      id: 8,
      name: "NUMBER",
      subCategory: [
        {
          id: 1,
          text: "NUM",
        },
      ],
    },
    {
      id: 9,
      name: "TIMESTAMP",
      subCategory: [
        {
          id: 1,
          text: "DATE",
        },
        {
          id: 2,
          text: "TIME",
        },
      ],
    },
    {
      id: 10,
      name: "UNIT",
      subCategory: [
        {
          id: 1,
          text: "U",
        },
      ],
    },
    {
      id: 11,
      name: "OTHER",
      subCategory: [
        {
          id: 1,
          text: "MISC",
        },
      ],
    },
    {
      id: 12,
      name: "OTHER",
      subCategory: [
        {
          id: 1,
          text: "MISC",
        },
      ],
    },
  ];
  const TAG_COLORS: any = {
    ORG: "#00ffa2",
    EV: "#84d2ff",
    PER: "#169254",
    LOC: "#924816",
  };
  var TEXT = `On Monday night Fallon will have Monday The rapper Cardi B who just released her first album`;

  const handleClickTag = useCallback(
    (e: any) => {
      setAnnotationInfo({ ...annotationInfo, tag: e.target.innerText });
    },
    [annotationInfo]
  );
  const handleShow = () => setShowReject(true);
  useEffect(() => {
    let selectedData = document.querySelectorAll("mark");
   // var selection = window.getSelection();
    selectedData.forEach((data) => {
      let selecttext = data?.firstChild?.nodeValue;
      setPosition(TEXT.indexOf(selecttext));
      setPositionEnd(TEXT.indexOf(selecttext) + selecttext.length - 1);
    });
  }, [handleClickTag, TEXT]);

  return (
    <>
      <ModalBox
        show={showReject}
        setShow={setShowReject}
        actionData={1}
        role={ModalRole.NER_REJECT}
        modalText="Are you sure to reject?"
        modalIcon={rejectIcon}
      ></ModalBox>
      <ModalBox
        show={showSkip}
        setShow={setShowSkip}
        role={ModalRole.NULL_SUBMIT}
        modalText="Null submit not accepted  ,at least one token must be annotated."
        modalIcon={nullSubmitIcon}
      ></ModalBox>

      <section className="ner-view-header">
        <Row>
          <Col lg={6} className="ner-group-header mx-3">
            <h4 className="mr-2 ner-heading-text">Group 1</h4>
            <span className="ner-header-status">Running</span>
            <span className="annotation-type-ner mx-2">NER</span>
          </Col>
        </Row>
      </section>
      <section className="py-3 mx-3">
        <Row>
          <Col className="py-3" lg={12}>
            <Row className="ner-tag-toggle">
              <span className="mx-2">Tag first</span>
              <BootstrapSwitchButton size="xs" />
            </Row>
          </Col>
          <Col className="py-3">
            <Row>
              {annotationCategory.map((cat) => {
                const { name, id, subCategory } = cat;
                return (
                  <Col
                    key={id}
                    lg={3}
                    md={4}
                    className="annotation-type-container"
                  >
                    <div>
                      <h6 className="annotation-type-title">{name}</h6>
                      {subCategory.map((subCat: any, index: number) => {
                        return (
                          <Badge
                            key={index}
                            className={
                              annotationInfo.tag === subCat.text
                                ? "ner-sub-category-badge-selected"
                                : "ner-sub-category-badge"
                            }
                            onClick={(e) => handleClickTag(e)}
                            bg="transparent"
                          >
                            {subCat.text}
                          </Badge>
                        );
                      })}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </section>
      <section className="py-3">
        <Row className="ner-main-section">
          <Col lg={12} className="ner-annotaion-types-section">
            <TokenAnnotator
              style={{}}
              className="ner-annotaion-text"
              tokens={TEXT.split(" ")}
              value={annotationInfo.value}
              onChange={(value) =>
                setAnnotationInfo({ ...annotationInfo, value })
              }
              getSpan={(span) => ({
                ...span,
                tag: annotationInfo.tag,
                color: TAG_COLORS[annotationInfo.tag],
              })}
            />
            <span>starting position: {position}</span>
            <span>end position: {positionEnd}</span>
            <pre style={{ fontSize: 12, lineHeight: 1.2 }}>
              {JSON.stringify(annotationInfo, null, 2)}
            </pre>
            <Row className="justify-content-center">
              <ActionButton
                onClick={() => setShowSkip(true)}
                className=" ner-submit-button mx-2 my-3"
              >
                Submit
              </ActionButton>
              <button className="ner-skip-button mx-2 my-3">Skip</button>
              <button
                onClick={() => handleShow()}
                className="ner-reject-button mx-2 my-3"
              >
                Reject
              </button>
            </Row>
          </Col>
        </Row>
      </section>
    </>
  );
};
