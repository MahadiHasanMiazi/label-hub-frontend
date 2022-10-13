import { useState } from "react";
import { Col } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { useAsyncDebounce } from "react-table";
import { InputField } from "../../../../components/InputField/InputField";
import './UserGroupFilter.css';
interface GroupFilterProps {
  filter: string;
  setFilter: any;
}

export const UserGroupFilter: React.FC<GroupFilterProps> = ({
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
        className="custom-input-style project-search"
        value={value}
        placeholder="search"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      ></InputField>
      <div className="search-icon-project">
        <BiSearch></BiSearch>
      </div>
    </Col>
  );
};
