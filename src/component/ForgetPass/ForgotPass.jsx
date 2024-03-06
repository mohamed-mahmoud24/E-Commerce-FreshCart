import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
export default function ForgotPass() {
  let naviagte = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  let validateScheme = yup.object({
    email: yup
      .string()
      .email("email is invalid")
      .required("email is required "),
  });
  async function forgotPassDataToApi(values) {
    setLoading(false);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      console.log(data);
      if (data.statusMsg == "success") {
        toast.success(data.message);
        naviagte("/restCode");
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
  let forgetPass = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validateScheme,
    onSubmit: (values) => {
      console.log(values);
      //send data to api
      forgotPassDataToApi(values);
    },
  });

  return (
    <div>
      <div className="w-75 m-auto my-4 text-start">
        <h2>Forget password:</h2>
        <form onSubmit={forgetPass.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="type your email..."
            type="text"
            name="email"
            value={forgetPass.values.email}
            onChange={forgetPass.handleChange}
            className="form-control mb-3"
            id="email"
          />
          {forgetPass.errors.email && forgetPass.touched.email ? (
            <div className="alert my-2 py-2 alert-danger">
              {forgetPass.errors.email}
            </div>
          ) : (
            ""
          )}

          <div className="d-flex  justify-content-between">
            <button
              disabled={!(forgetPass.isValid && forgetPass.dirty)}
              className="btn bg-main text-white"
              type="submit"
            >
              {loading ? (
                " send code"
              ) : (
                <i className="fa fa-spinner fa-spin"> </i>
              )}
            </button>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
}
