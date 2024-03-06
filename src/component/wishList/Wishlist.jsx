import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Wishlist() {
  let {
    getCart,
    deleteItem,
    setCounter,
    updateQTY,
    addToWishList,
    getWishList,
    deleteItemFromWishList,
    wishlistCounter,
    setwishlistCounter,
    addToCart,
  } = useContext(StoreContext);
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);
  let [btnLoading, setBtnLoading] = useState(true);
  let [btnRemoveWishlistLoading, setBtnRemoveWishlistLoading] = useState(true);
  /********************if and else to handel when order cart and return to cart i find error because of set data hwa bymsh el cart kolha fa response byt8yer msh bykon feh data fa bahandelw lw el statusMsg faild  */
  async function addProductToCart(productId) {
    setBtnLoading(false);
    let data = await addToCart(productId);

    console.log(data);
    if (data.status == "success") {
      setBtnLoading(true);
      toast.success("Product added successfuly");

      setCounter(data.numOfCartItems);
    }
  }

  useEffect(() => {
    (async () => {
      let data = await getWishList();
      if (data?.response?.data.statusMsg == "fail") {
        setData(null);
        setLoading(false);
      } else {
        setData(data);
        console.log(data);
        console.log(data.data);

        setLoading(false);
      }
      // console.log(data);
      setLoading(false);
    })();
  }, []);

  async function deletWishListProduct(id) {
    setBtnRemoveWishlistLoading(false);
    let data = await deleteItemFromWishList(id);

    console.log(data);
    if (data.status == "success") {
      toast.error("product remove from wishlist successfully");
      setBtnRemoveWishlistLoading(true);
      setwishlistCounter(data.data.length);
      setData(data);
    }
  }

  if (loading) return <Loading />;
  if (data == null || data.count == 0) {
    setCounter(null);
    return (
      <h2
        className="text-center  text-main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        NO Item IN your Wishlist{" "}
      </h2>
    );
  } else {
    return (
      <div className="container  bg-main-light text-start p-3 rounded my-lg-5">
        <Helmet>
          <meta charSet="utf-8" content="Wishlist" />
          <title>Wishlist</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <h2> your WishList</h2>

        {data?.data.map((item) => {
          return (
            <div key={item._id} className="row py-2 border-bottom ">
              <div className="col-md-1">
                <img src={item.imageCover} alt="" className="w-100" />
              </div>
              <div className="col-md-11 d-flex justify-content-between mt-sm-4">
                <div>
                  <Link to={"/product-details/" + item._id}>
                    {" "}
                    <p className="m-1">{item.title}</p>
                  </Link>

                  <p className="text-main m-1 p-0">Price:{item.price}</p>
                  {/* <button
                    onClick={() => deletWishListProduct(item._id)}
                    className="btn m-0 p-0"
                  >
                    {btnRemoveWishlistLoading ? (
                      <i class="fa-solid fa-trash-can text-main"></i>
                    ) : (
                      <i className="fa fa-spinner fa-spin text-main"> </i>
                    )}
                    Remove
                  </button> */}
                  <button
                    onClick={() => deletWishListProduct(item._id)}
                    className="btn m-0 p-0 border-0"
                  >
                    <i class="fa-solid fa-trash-can text-main"></i>
                    Remove
                  </button>
                </div>
                <div className="buttonc">
                  <button
                    onClick={() => addProductToCart(item._id)}
                    className="btn bg-main  w-100 text-white border-0"
                  >
                    Add To Cart
                  </button>
                </div>
                {/* <div className="buttonc">
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
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
