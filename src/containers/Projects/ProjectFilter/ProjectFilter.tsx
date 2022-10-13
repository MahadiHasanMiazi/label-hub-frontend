import { useState } from "react";
import { Col } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { useAsyncDebounce } from "react-table";
import { InputField } from "../../../components/InputField/InputField";
import './ProjectFilter.css';
interface ProjectFilterProps {
  filter: string;
  setFilter: any;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  filter,
  setFilter,
}) => {
  const [value, setValue] = useState(filter);
  const handleChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <Col xs={3}>
        
      <InputField
        type="text"
        className="custom-input-style project-search"
        value={value}
        placeholder="Project name, Created by"
        onChange={(e) => {
          setValue(e.target.value);
          handleChange(e.target.value);
        }}
      ></InputField>
      <div className="search-icon-project">
        <BiSearch></BiSearch>
      </div>
    </Col>
  );
};
