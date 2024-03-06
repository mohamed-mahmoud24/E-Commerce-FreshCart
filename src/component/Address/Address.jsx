import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { StoreContext } from "../../Context/StoreContext";
export default function Address() {
  let { id } = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  let { pay } = useContext(StoreContext);

  async function sendPayDataToApi(values) {
    setLoading(false);
    let data = await pay(id, values).catch((err) => console.log(err));
    console.log(data);
    setLoading(true);
    if (data.status == "success") {
      window.location.href = data.session.url;
    }
  }
  let Address = useFormik({
    initialValues: {
      phone: "",
      details: "",
      city: "",
    },
    onSubmit: (values) => {
      console.log(values);
      //send data to api
      sendPayDataToApi(values);
    },
  });

  return (
    <div>
      <div className="w-75 m-auto my-5 text-start">
        <h2 className="">Address Now:</h2>
        <form onSubmit={Address.handleSubmit}>
          <label htmlFor="phone">phone:</label>
          <input
            placeholder="type your phone..."
            type="text"
            name="phone"
            value={Address.values.phone}
            onChange={Address.handleChange}
            className="form-control mb-3"
            id="phone"
          />

          <label htmlFor="details">details:</label>
          <textarea
            placeholder="type your details..."
            type="text"
            name="details"
            value={Address.values.details}
            onChange={Address.handleChange}
            className="form-control mb-3"
            id="details"
          />

          <label htmlFor="city">city:</label>
          <input
            placeholder="type your city..."
            type="text"
            name="city"
            value={Address.values.city}
            onChange={Address.handleChange}
            className="form-control mb-3"
            id="city"
          />

          {errorMsg ? (
            <div className="alert alert-danger my-2 py-2">{errorMsg}</div>
          ) : (
            ""
          )}
          <button className="btn bg-main text-white" type="submit">
            {loading ? " Pay" : <i className="fa fa-spinner fa-spin"> </i>}
          </button>
        </form>
      </div>
    </div>
  );
}
