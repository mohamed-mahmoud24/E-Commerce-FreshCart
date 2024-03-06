import { useFormik } from "formik";
import React from "react";

export default function SignupcustomValidation() {
  function validate(values) {
    let phoneRegex = /^[1-5]{5}$/;
    let errors = {};
    if (!values.name) {
      errors.name = "name is required";
    } else if (values.name.length < 3) {
      errors.name = " Name minimum lenght is 3  ";
    } else if (values.name.length > 10) {
      errors.name = "Name maximum lenght is 10  ";
    }
    if (!values.phone) {
      errors.phone = "phone is required";
    }
    if (!phoneRegex.test(values.phone)) {
      errors.phone = "not required";
    }
    return errors;
  }
  let Register = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      //send data to api
    },
  });

  return (
    <div>
      <div className="w-75 m-auto my-4 text-start">
        <h2>Register Now:</h2>
        <form onSubmit={Register.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            placeholder="type your name..."
            type="text"
            name="name"
            value={Register.values.name}
            onChange={Register.handleChange}
            className="form-control mb-3"
            id="name"
          />
          {Register.errors.name && Register.touched.name ? (
            <div className="alert my-2 py-2 alert-danger">
              {Register.errors.name}
            </div>
          ) : (
            console.log("no")
          )}

          <label htmlFor="email">Email:</label>
          <input
            placeholder="type your email..."
            type="text"
            name="email"
            value={Register.values.email}
            onChange={Register.handleChange}
            className="form-control mb-3"
            id="email"
          />
          <label htmlFor="phone">Phone:</label>
          <input
            placeholder="type your phone..."
            type="text"
            name="phone"
            value={Register.values.phone}
            onChange={Register.handleChange}
            className="form-control mb-3"
            id="phone"
          />
          {Register.errors.phone && Register.touched.phone ? (
            <div className="alert my-2 py-2 alert-danger">
              {Register.errors.phone}
            </div>
          ) : (
            console.log("no")
          )}

          <label htmlFor="password">Password:</label>
          <input
            placeholder="type your password..."
            type="text"
            name="password"
            value={Register.values.password}
            onChange={Register.handleChange}
            className="form-control mb-3"
            id="password"
          />
          <label htmlFor="rePassword">rePassword:</label>
          <input
            placeholder="confirm your password ..."
            type="text"
            name="rePassword"
            value={Register.values.rePassword}
            onChange={Register.handleChange}
            className="form-control mb-3"
            id="rePassword"
          />
          <button className="btn bg-main text-white" type="submit">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}
