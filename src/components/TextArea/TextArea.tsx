import { Form } from "react-bootstrap";

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value: any;
  name?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  placeholder,
  onChange,
  name,
  className,
}) => {
  return (
    <>
      <Form.Group>
        <Form.Label className="form-label">{label} </Form.Label>

        <Form.Control
          as="textarea"
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className={className}
        />
      </Form.Group>
    </>
  );
};
