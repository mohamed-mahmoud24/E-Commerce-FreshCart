import React from "react";
import CategoriesSlider from "../MainSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";

import Products from "../products/Products";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" content="Home" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <Products />
    </>
  );
}
