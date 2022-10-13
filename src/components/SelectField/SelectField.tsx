import React from "react";
import { Form } from "react-bootstrap";

interface SelectFieldProps {
  options: any;
  label?: string;
  value: string | number;
  onChange: any;
  name: string;
  className?: string;
}
interface ISelect {
  value: string | number;
  label: string;
}
export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  className,
}) => {
 
  return (
    <>
      <Form.Group>
        <Form.Label className="form-label">{label} </Form.Label>
        <Form.Select
          aria-label={name}
          onChange={onChange}
          value={value}
          name={name}
          className={`form-control custom-select-style`}
        >
          {options.map((item: ISelect, index: number) => {
            return (
              <option key={index} value={item.value} className="select-option">
                {item.label}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>
    </>
  );
};
