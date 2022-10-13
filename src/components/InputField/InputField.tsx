import React from "react";
import { Form } from "react-bootstrap";

export interface InputFieldProps {
  type: "text" | "email" | "password" | "number" | "date" | any;
  label?: string;
  placeholder?: string;
  value: any;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClass?: string
  id?: any;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  placeholder,
  required,
  onChange,
  name,
  onFocus,
  onBlur,
  className,
  labelClass,
  disabled,
}) => {
  return (
    <>
      <Form.Group>
        <Form.Label htmlFor={name} className={`form-label ${labelClass}`}>
          {label}{" "}
        </Form.Label>
        {required && <span className="text-danger">*</span>}
        <Form.Control
          value={value}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          id={name}
          className={className}
        />
      </Form.Group>
    </>
  );
};
