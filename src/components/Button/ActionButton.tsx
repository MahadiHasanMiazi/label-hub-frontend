import React from "react";
import "./button.css"

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

export const ActionButton: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
