import React from "react";

const CloseIcon = () => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 48 48"
      fill="red"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" fill="white" fill-opacity="0.01" />
      <path
        d="M14 14L34 34"
        stroke="#333"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 34L34 14"
        stroke="#333"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
