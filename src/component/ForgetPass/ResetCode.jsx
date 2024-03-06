import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
export default function ResetCode() {
  let naviagte = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  let validateScheme = yup.object({
    resetCode: yup.string().required("code is required "),
  });
  async function sendCodeDataToApi(values) {
    setLoading(false);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      console.log(data);
      if (data.status == "Success") {
        toast.success(data.status);
        naviagte("/changePass");
      }
    } catch (error) {
      console.error("API Error:", error.data);
      console.error("API Error message:", error.response.data.message);
      setErrorMsg(error.response.data.message);
      setLoading(true);
      const detailedErrors = error.response.data.errors;
      console.log("Detailed Errors:", detailedErrors);
    }
  }
  let codePass = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validateScheme,
    onSubmit: (values) => {
      console.log(values);
      //send data to api
      sendCodeDataToApi(values);
    },
  });

  return (
    <div>
      <div className="w-75 m-auto my-4 text-start">
        <h2>Reset Code:</h2>
        <form onSubmit={codePass.handleSubmit}>
          <label htmlFor="resetCode"></label>
          <input
            placeholder="Enter Code..."
            type="text"
            name="resetCode"
            value={codePass.values.resetCode}
            onChange={codePass.handleChange}
            className="form-control mb-3"
            id="resetCode"
          />
          {codePass.errors.resetCode && codePass.touched.resetCode ? (
            <div className="alert my-2 py-2 alert-danger">
              {codePass.errors.resetCode}
            </div>
          ) : (
            ""
          )}

          <div className="d-flex  justify-content-between">
            <button
              disabled={!(codePass.isValid && codePass.dirty)}
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
        </form>
      </div>
    </div>
  );
}
