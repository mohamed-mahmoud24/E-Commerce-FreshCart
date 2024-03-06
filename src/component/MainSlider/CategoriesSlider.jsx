import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [CategoriesSlider, setCategoriesSlider] = useState([]);
  async function getCategoriesSliderApi() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategoriesSlider(data.data);
    console.log("categ", data.data);
  }
  useEffect(() => {
    getCategoriesSliderApi();
  }, []);
  return (
    <div className="my-5 container">
      <h3 className="text-start">shop popular categories</h3>
      <Slider {...settings}>
        {CategoriesSlider.map((item) => (
          <div className="px-1" key={item._id}>
            <img src={item.image} className="w-100 rounded-5" height={200} />
            <h5>{item.name}</h5>
          </div>
        ))}
      </Slider>
    </div>
  );
}
