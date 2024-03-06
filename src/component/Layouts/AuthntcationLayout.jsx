import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink } from "react-router-dom";
import Footer from "../Footer/Footer";
export default function AuthntcationLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3 px-3 ">
        <div className="container-fluid ">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item position-relative">
                <NavLink className="nav-link" to="/signup">
                  Register
                </NavLink>
              </li>
              <li className="nav-item position-relative">
                <NavLink className="nav-link" to="/signin">
                  Sign in
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet></Outlet>
      <Footer />
    </>
  );
}
