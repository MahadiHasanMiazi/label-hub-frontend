import { useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { InputField } from "../../../components/InputField/InputField";
import { SelectField } from "../../../components/SelectField/SelectField";
import "./AdminNer.css";

export const AdminNer = () => {
  const [nerStatus, setNerStatus] = useState(0);
  const nerDataStatusOptions: any = [
    {
      value: 0,
      label: "All",
    },
    {
      value: 1,
      label: "Validated",
    },
    {
      value: 2,
      label: "Not Validated",
    },
  ];
  const handleNerStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNerStatus(parseInt(value));
  };
  return (
    <section className="admin-ner-section py-5 my-5">
      <div className="ner-search-filter">
        <div className="mr-3">
          <SelectField
            options={nerDataStatusOptions}
            value={nerStatus}
            onChange={handleNerStatusChange}
            name="nerStatus"
          ></SelectField>
        </div>
        <div className="mr-3">
          <Col className="mr-5">
            <InputField
              type="text"
              value=""
              placeholder="Search by text"
              className="custom-input-style user-search pl-5"
              onChange={(e) => console.log(e)}
            ></InputField>
            <div className="search-icon-group">
              <BiSearch></BiSearch>
            </div>
          </Col>
        </div>
      </div>
      <Row className="justify-content-center">
        <Col lg={11}>
          <Table bordered className="ner-table ">
            <thead>
              <tr>
                <th>Text</th>
                <th colSpan={3}>আমি ভাত খাই।</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="ner-table-annotator">
                  <div className="row">
                    <Col lg={6}>Mahisha Islam</Col>
                    <Col lg={6}>
                      <span className="ner-short-label">A</span>
                    </Col>
                  </div>
                </td>
                <td className="d-flex">
                  <div className="single-word-ner">
                    আমি <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    ভাত <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    খাই। <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="ner-table-annotator">
                  <div className="row">
                    <Col lg={6}> Shahida Alam</Col>
                    <Col lg={6}>
                      <span className="ner-short-label">A</span>
                    </Col>
                  </div>
                </td>

                <td className="d-flex">
                  <div className="single-word-ner">
                    আমি <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    ভাত <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    খাই। <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="ner-table-annotator">
                  <div className="row">
                    <Col lg={6}> Marzia Rahman </Col>
                    <Col lg={6}>
                      <span className="ner-short-label">A</span>
                    </Col>
                  </div>
                </td>

                <td className="d-flex">
                  <div className="single-word-ner">
                    আমি <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    ভাত <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    খাই। <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="ner-table-annotator">
                  <div className="row">
                    <Col lg={6}>
                      {" "}
                      <span className="ner-name-label-final">
                        Final Label
                      </span>{" "}
                    </Col>
                    <Col lg={6}>
                      <span className="ner-short-label-final">M</span>
                    </Col>
                  </div>
                </td>
                <td className="d-flex">
                  <div className="single-word-ner">
                    আমি <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    ভাত <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    খাই। <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>

          <Table bordered className="ner-table ">
            <thead>
              <tr>
                <th>Text</th>
                <th colSpan={3}>
                  সুজন হালদার ঢাকার পুলিশ হেডকোয়াটার্সে রিপোটিং করতে গেলেন।
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="ner-table-annotator">
                  <div className="row">
                    <Col lg={6}> Marzia Rahman </Col>
                    <Col lg={6}>
                      <span className="ner-short-label">A</span>
                    </Col>
                  </div>
                </td>
                <td className="d-flex">
                  <div className="single-word-ner">
                    সুজন <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    হালদার <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    ঢাকার<span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    পুলিশ<span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    হেডকোয়াটার্সে
                    <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-untagged">রিপোটিং</div>
                  <div className="single-untagged">করতে</div>
                  <div className="single-untagged">গেলেন।</div>
                </td>
              </tr>
              <tr>
                <td className="ner-table-annotator">
                  <div className="row">
                    <Col lg={6}> Marzia Rahman </Col>
                    <Col lg={6}>
                      <span className="ner-short-label">A</span>
                    </Col>
                  </div>
                </td>
                <td className="d-flex">
                  <div className="single-word-ner">
                    সুজন <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    হালদার <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    ঢাকার<span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    পুলিশ<span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    হেডকোয়াটার্সে
                    <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-untagged">রিপোটিং</div>
                  <div className="single-untagged">করতে</div>
                  <div className="single-untagged">গেলেন।</div>
                </td>
              </tr>
              <tr>
                <td className="ner-table-annotator">
                  <div className="row">
                    <Col lg={6}>
                      {" "}
                      <span className="ner-name-label-final">
                        Final Label
                      </span>{" "}
                    </Col>
                    <Col lg={6}>
                      <span className="ner-short-label-final">V</span>
                    </Col>
                  </div>
                </td>
                <td className="d-flex">
                  <div className="single-word-ner">
                    সুজন <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    হালদার <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    ঢাকার<span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    পুলিশ<span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-word-ner">
                    হেডকোয়াটার্সে
                    <span className="colored-ner-subcategory">NNP</span>{" "}
                  </div>
                  <div className="single-untagged">রিপোটিং</div>
                  <div className="single-untagged">করতে</div>
                  <div className="single-untagged">গেলেন।</div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </section>
  );
};
