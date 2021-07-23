import React from "react";

interface IFormErrrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErrrorProps> = ({ errorMessage }) => (
  <span className="font-medium text-red-500">{errorMessage}</span>
);
