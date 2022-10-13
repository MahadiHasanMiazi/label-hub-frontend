import React from "react";

interface ErrorMessageProps {
  children: React.ReactNode;
  display?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  display,
}) => {
  return <p className={`text-danger py-2 mb-0 ${display}`}>{children}</p>;
};
