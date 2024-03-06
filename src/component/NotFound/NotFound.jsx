import React from "react";
import error from "../../assets/images/error.svg";
export default function NotFound() {
  return (
    <div
      className="d-flex align-items-center justify-content-center "
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <img src={error} alt="" className="" />
    </div>
  );
}
