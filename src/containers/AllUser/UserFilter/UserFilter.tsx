import { useState } from "react";
import { Col } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { useAsyncDebounce } from "react-table";
import { InputField } from "../../../components/InputField/InputField";
import "./UserFilter";
interface UserFilterProps {
  filter: string;
  setFilter: any;
}

export const UserFilter: React.FC<UserFilterProps> = ({
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
        placeholder="User name,Email"
        className="custom-input-style user-search pl-5"
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
