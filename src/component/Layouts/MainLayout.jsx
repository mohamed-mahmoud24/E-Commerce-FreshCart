import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import MainSlider from "../MainSlider/MainSlider";
import Footer from "../Footer/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}
