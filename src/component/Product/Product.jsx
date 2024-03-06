import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
//http://localhost:3000/product-details/6428ead5dc1175abc65ca0ad
export default function Product({ item }) {
  let {
    counter,
    setCounter,
    addToCart,
    addToWishList,
    wishlistCounter,
    setwishlistCounter,
    getWishList,
  } = useContext(StoreContext);
  let [data, setData] = useState(null);
  let [btnLoading, setBtnLoading] = useState(true);
  let [btnWishlistLoading, setBtnWishlistLoading] = useState(true);
  let [WishListColor, setWishListColor] = useState("main");
  let [Color, setColor] = useState(true);
  useEffect(() => {
    (async () => {
      let data = await getWishList();
      if (data?.response?.data.statusMsg == "fail") {
      } else {
        setData(data);
        console.log(data);
        console.log(data.data);
      }
    })();
  }, []);

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
  // async function addProductToWishList(productId) {
  //   setBtnWishlistLoading(false);

  //   let data = await addToWishList(productId);

  //   console.log("wishlist", data);
  //   if (data.status == "success") {
  //     toast.success("Product added to Wish List Successfully!");
  //     setWishListColor(false);
  //     setBtnWishlistLoading(true);
  //     console.log(data.data.length);
  //     setwishlistCounter(data.data.length);
  //   }
  // }
  async function addProductToWishList(productId) {
    setBtnWishlistLoading(false);
    setWishListColor("main");
    setColor(true);
    try {
      let data = await addToWishList(productId);
      if (data.status === "success") {
        toast.success("Product added to Wish List successfully!");
        setwishlistCounter(data.data.length);
        setColor(false);
        setWishListColor("danger");
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      // Handle error (e.g., display an error message)
    } finally {
      setBtnWishlistLoading(true);
    }
  }

  return (
    <>
      <div className="col-md-3  ">
        <div className="product cursor-pointer rounded-3 p-3">
          <Link to={"/product-details/" + item._id}>
            <img src={item.imageCover} className="w-100" />

            <span className="text-main">{item.category.name}</span>
            <h5 className="my-2 fw-bold">
              {item.title.split(" ").slice(0, 2).join(" ")}
            </h5>

            <div className="d-flex justify-content-between my-3 ">
              <div>{item.price} EGY</div>
              <div>
                <i className="fa-solid fa-star rating-color"></i>
                {item.ratingsAverage}
              </div>
            </div>
          </Link>
          <div className="d-flex justify-content-between my-3">
            <div className="buttonc">
              <button
                disabled={!btnLoading}
                onClick={() => addProductToCart(item._id)}
                className="btn bg-main  w-100 text-white"
              >
                {btnLoading ? (
                  "Add To Cart"
                ) : (
                  <i className="fa fa-spinner fa-spin"> </i>
                )}{" "}
              </button>
            </div>

            <button
              className="border-0 bg-transparent"
              disabled={!btnWishlistLoading}
              onClick={() => addProductToWishList(item._id)}
            >
              {btnWishlistLoading ? (
                <i
                  className={`fa-solid fa-heart fs-3 text-${
                    Color ? WishListColor : WishListColor
                  }`}
                ></i>
              ) : (
                <i className="fa fa-spinner fa-spin"> </i>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
