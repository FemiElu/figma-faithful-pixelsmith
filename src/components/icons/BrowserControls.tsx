import React from "react";

export const BrowserControls: React.FC = () => {
  return (
    <svg
      width="52"
      height="12"
      viewBox="0 0 52 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex items-start gap-[8px]"
    >
      <circle
        cx="6"
        cy="6"
        r="5.75"
        fill="#FF5E5D"
        stroke="#E14942"
        strokeWidth="0.5"
      ></circle>
      <circle
        cx="26"
        cy="6"
        r="5.75"
        fill="#FFBC4F"
        stroke="#E1A325"
        strokeWidth="0.5"
      ></circle>
      <circle
        cx="46"
        cy="6"
        r="5.75"
        fill="#22CB58"
        stroke="#3EAF3F"
        strokeWidth="0.5"
      ></circle>
    </svg>
  );
};
