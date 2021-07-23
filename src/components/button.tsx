import React from "react";

interface IButton {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButton> = ({
  canClick,
  loading,
  actionText
}) => (
  <button
    role="btn"
    className={`mt-3 py-3 font-medium text-white transition-colors focus:outline-none ${
      canClick
        ? "bg-lime-600  hover:bg-lime-800"
        : "bg-gray-300 pointer-events-none"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
