import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
export default function Changepass() {
  let naviagte = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  let passwordRegex = /^[A-Z][a-z0-9]{5,10}$/;
  let validateScheme = yup.object({
    email: yup
      .string()
      .email("email is invalid")
      .required("email is required "),

    newPassword: yup
      .string()
      .matches(passwordRegex, "password is invalid")
      .required("password is required"),
  });

  async function sendNewPassDataToApi(values) {
    setLoading(false);
    try {
      let response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      //   let { data } = await axios.put(
      //     "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      //     values
      //   );
      if (response.status >= 200 && response.status < 300) {
        // Successful response
        console.log(response.data);
        toast.success("password changed successfully");
        localStorage.removeItem("token");
        naviagte("/home");
        localStorage.setItem("token", response.data.token);
      } else {
        // Non-successful response
        console.error("API Error:", response.data);
        setErrorMsg("Error resetting password. Please try again."); // Set an appropriate error message
      }
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error("Network Error:", error);
      setErrorMsg("Network error. Please try again."); // Set an appropriate error message
    } finally {
      setLoading(false);
    }
  }
  let changePass = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validateScheme,
    onSubmit: (values) => {
      console.log(values);
      //send data to api
      sendNewPassDataToApi(values);
    },
  });

  return (
    <div>
      <div className="w-75 m-auto my-4 text-start">
        <h2>New password:</h2>
        <form onSubmit={changePass.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="type your email..."
            type="text"
            name="email"
            value={changePass.values.email}
            onChange={changePass.handleChange}
            className="form-control mb-3"
            id="email"
          />
          {changePass.errors.email && changePass.touched.email ? (
            <div className="alert my-2 py-2 alert-danger">
              {changePass.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="newPassword">newPassword:</label>
          <input
            placeholder="type your new password..."
            type="text"
            name="newPassword"
            value={changePass.values.newPassword}
            onChange={changePass.handleChange}
            className="form-control mb-3"
            id="newPassword"
          />
          {changePass.errors.newPassword && changePass.touched.newPassword ? (
            <div className="alert my-2 py-2 alert-danger">
              {changePass.errors.newPassword}
            </div>
          ) : (
            ""
          )}

          {errorMsg ? (
            <div className="alert alert-danger my-2 py-2">{errorMsg}</div>
          ) : (
            ""
          )}
          <div className="d-flex  justify-content-between">
            <button
              disabled={!(changePass.isValid && changePass.dirty)}
              className="btn bg-main text-white"
              type="submit"
            >
              {loading ? (
                " Change Password"
              ) : (
                <i className="fa fa-spinner fa-spin"> </i>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
