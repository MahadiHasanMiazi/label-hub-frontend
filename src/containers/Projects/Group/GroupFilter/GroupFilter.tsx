import { useState } from "react";
import { Col } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { useAsyncDebounce } from "react-table";
import { InputField } from "../../../../components/InputField/InputField";
import "./GroupFilter.css";
interface GroupFilterProps {
  filter: string;
  setFilter: any;
}

export const GroupFilter: React.FC<GroupFilterProps> = ({
  filter,
  setFilter,
}) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 500);
  return (
    <Col xs={3}>
      <InputField
        type="text"
        value={value}
        placeholder="Group name, Annotation type"
        className="custom-input-style group-search pl-5"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      ></InputField>
      <div className="search-icon-group">
        <BiSearch></BiSearch>
      </div>
    </Col>
  );
};
