import React from "react";

const Error = ({ children }) => {
  return (
    <p
      style={{
        color: "red",
        fontSize: ".8rem",
        margin: "0.25rem 0rem 0rem .3rem",
      }}
    >
      {children}
    </p>
  );
};

export default Error;
