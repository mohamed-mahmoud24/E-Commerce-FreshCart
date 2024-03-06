import React from "react";
import visa from "../../assets/images/card-visa.svg";
import img2 from "../../assets/images/card-mastercard.svg";

import img4 from "../../assets/images/cod-en.svg";
import img5 from "../../assets/images/google-play.svg";
import img6 from "../../assets/images/valu_v2.svg";
import img7 from "../../assets/images/card-amex.svg";
export default function Footer() {
  return (
    <div className=" footer mt-auto bg-body-tertiary p-5">
      <div className="row">
        <div className="col-md-12 text-start">
          <h2>Get The FreshCart app</h2>
          <p>
            We Will Send You a link ,Open it In Your Phone to Download the app.
          </p>
        </div>
        <div className="col-md-12 d-flex  justify-content-between ">
          <div
            className=" ps-3 py-2"
            style={{
              width: "85%",
            }}
          >
            <input
              placeholder="type your Email..."
              type="text"
              className="form-control mb-3 "
              id="footerEmail"
            />
          </div>
          <div
            className="py-2"
            style={{
              width: "15%",
            }}
          >
            <button className="btn bg-main text-white" type="submit">
              Share App Link
            </button>
          </div>
        </div>
        <div className="col-md-12 d-flex justify-content-between text-start px-5 border-bottom  border-top py-3">
          <div className="d-flex pt-2 ">
            <div className="mx-2">
              {" "}
              <p>paymet partners</p>
            </div>
            <div className="">
              {" "}
              <img src={visa} alt="" />
              <img src={img2} alt="" />
              <img src={img4} alt="" />
              <img src={img6} alt="" />
              <img src={img7} alt="" />
            </div>
          </div>
          <div className="d-flex  pt-2">
            <div className="mx-2">
              {" "}
              <p>Get deliveries with FreshCart</p>
            </div>
            <div className="mx-2">
              {" "}
              <img src={img5} alt=" " className="mx-2" />
              <img src={img5} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
