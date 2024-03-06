import React from "react";
import { jwtDecode } from "jwt-decode";
export default function Profile() {
  let encodedToken = localStorage.getItem("token"); //getting token from local
  let decodedToken = jwtDecode(encodedToken);
  console.log(decodedToken);
  return (
    <>
      <h1
        className="text-main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        Hello {decodedToken.name}
      </h1>
    </>
  );
}
