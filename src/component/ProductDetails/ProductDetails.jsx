import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
  };
  let {
    counter,
    setCounter,
    addToCart,
    addToWishList,
    wishlistCounter,
    setwishlistCounter,
  } = useContext(StoreContext);
  let x = useParams();
  console.log(x);
  let [btnLoading, setBtnLoading] = useState(true);
  //function cobry bnsbaly bdl mahot logic kber mra wahda fe button add to cart
  async function addProductToCart(productId) {
    setBtnLoading(false);
    let data = await addToCart(productId);

    console.log(data);
    if (data.status == "success") {
      toast.success("Product added successfuly");
      setBtnLoading(true);
      setCounter(data.numOfCartItems);
    }
  }
  async function addProductToWishList(productId) {
    setBtnWishlistLoading(false);
    let data = await addToWishList(productId);

    console.log("wishlist", data);
    if (data.status == "success") {
      toast.success("Product added to Wish List Successfully!");
      setBtnWishlistLoading(true);
      console.log(data.data.length);
      setwishlistCounter(data.data.length);
    }
  }
  let [product, setProduct] = useState({});
  let [loading, setLoading] = useState(true);
  let [btnWishlistLoading, setBtnWishlistLoading] = useState(true);
  async function getProduct() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${x.MyId}`
      );
      setProduct(data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(() => {
    getProduct();
  }, []);
  if (loading) return <Loading />;
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" content="product" />
        <title>{product.title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-3">
            {/* <img src={product.imageCover} alt="" className="w-100" /> */}
            <Slider className="" {...settings}>
              {product.images.map((image, index) => (
                <img key={index} src={image} alt="" className="w-100" />
              ))}
            </Slider>
          </div>
          <div className="col-md-9  text-start">
            <h4>{product.title}</h4>
            <p className="my-3">{product.description}</p>
            <span>{product.category.name}</span>
            <div className="d-flex justify-content-between align-items-center my-4">
              <div>
                <div>{product.price} EGY</div>
              </div>
              <div>
                <i className="fa-solid fa-star rating-color"></i>
                {product.ratingsAverage}
              </div>
            </div>

            <div className="d-flex justify-content-between  my-3">
              <div className="buttonc w-75">
                <button
                  disabled={!btnLoading}
                  onClick={() => addProductToCart(product._id)}
                  className="btn bg-main  w-100 text-white "
                >
                  {btnLoading ? (
                    "Add To Cart"
                  ) : (
                    <i className="fa fa-spinner fa-spin"> </i>
                  )}{" "}
                </button>
              </div>
              <div>
                {" "}
                {/* <button className="btn ">
                  <i className="fa-solid fa-heart fs-3 text-main"></i>
                </button> */}
                <button
                  className="border-0 bg-transparent"
                  disabled={!btnWishlistLoading}
                  onClick={() => addProductToWishList(product._id)}
                >
                  {btnWishlistLoading ? (
                    <i className="fa-solid fa-heart fs-3 text-main"></i>
                  ) : (
                    <i className="fa fa-spinner fa-spin"> </i>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
