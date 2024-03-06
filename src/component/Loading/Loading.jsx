import React from "react";

export default function Loading() {
  return (
    <div
      className=""
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <span class="loader"></span>
    </div>
  );
}
