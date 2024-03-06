import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Helmet } from "react-helmet";
export default function Signin() {
  let naviagte = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  let passwordRegex = /^[A-Z][a-z0-9]{5,10}$/;
  let validateScheme = yup.object({
    email: yup
      .string()
      .email("email is invalid")
      .required("email is required "),

    password: yup
      .string()
      .matches(passwordRegex, "password is invalid")
      .required("password is required"),
  });

  async function sendSignInDataToApi(values) {
    setLoading(false);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log(data);
      if (data.message == "success") {
        toast.success(" Login Success ");
        localStorage.setItem("token", data.token);
        naviagte("/home");
      }
    } catch (error) {
      console.error("API Error:", error.response.data);
      console.error("API Error message:", error.response.data.message);
      setErrorMsg(error.response.data.message);
      setLoading(true);
      const detailedErrors = error.response.data.errors;
      console.log("Detailed Errors:", detailedErrors);
    }
  }
  let Login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateScheme,
    onSubmit: (values) => {
      console.log(values);
      //send data to api
      sendSignInDataToApi(values);
    },
  });

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" content="Signin" />
        <title>SignIn</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="w-75 m-auto my-4 text-start">
        <h2>Login Now:</h2>
        <form onSubmit={Login.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="type your email..."
            type="text"
            name="email"
            value={Login.values.email}
            onChange={Login.handleChange}
            className="form-control mb-3"
            id="email"
          />
          {Login.errors.email && Login.touched.email ? (
            <div className="alert my-2 py-2 alert-danger">
              {Login.errors.email}
            </div>
          ) : (
            console.log("no")
          )}

          <label htmlFor="password">Password:</label>
          <input
            placeholder="type your password..."
            type="text"
            name="password"
            value={Login.values.password}
            onChange={Login.handleChange}
            className="form-control mb-3"
            id="password"
          />
          {Login.errors.password && Login.touched.password ? (
            <div className="alert my-2 py-2 alert-danger">
              {Login.errors.password}
            </div>
          ) : (
            console.log("")
          )}

          {errorMsg ? (
            <div className="alert alert-danger my-2 py-2">{errorMsg}</div>
          ) : (
            ""
          )}
          <div className="d-flex  justify-content-between">
            <button
              disabled={!(Login.isValid && Login.dirty)}
              className="btn bg-main text-white"
              type="submit"
            >
              {loading ? " Signin" : <i className="fa fa-spinner fa-spin"> </i>}
            </button>
            <Link to={"/forgotPass"} className="fs-5 text-main">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
