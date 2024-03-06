import React, { useContext, useEffect, useState } from "react";

import { StoreContext } from "../../Context/StoreContext";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Cart() {
  let { getCart, deleteItem, setCounter, updateQTY } = useContext(StoreContext);
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);
  let [btnLoading, setBtnLoading] = useState(true);
  /********************if and else to handel when order cart and return to cart i find error because of set data hwa bymsh el cart kolha fa response byt8yer msh bykon feh data fa bahandelw lw el statusMsg faild  */
  useEffect(() => {
    (async () => {
      let data = await getCart();
      if (data?.response?.data.statusMsg == "fail") {
        setData(null);
        setLoading(false);
      } else {
        setData(data);
        console.log(data);
        // console.log(data.cartOwner);
        setLoading(false);
      }
      // console.log(data);
      setLoading(false);
    })();
  }, []);

  async function deletProduct(id) {
    setBtnLoading(false);
    let data = await deleteItem(id);

    console.log(data);
    if (data.status == "success") {
      toast.error("product deleted successfully");
      setBtnLoading(true);
      setCounter(data.numOfCartItems);
      setData(data);
    }
  }
  async function updateProductQTY(id, count) {
    // setBtnLoading(false);
    let data = await updateQTY(id, count);

    console.log(data);
    if (data.status == "success") {
      toast.success("product updated successfully");
      // setBtnLoading(true);
      setCounter(data.numOfCartItems);
      setData(data);
    }
  }
  if (loading) return <Loading />;
  if (data == null || data.numOfCartItems == 0) {
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
        NO Item IN your Cart{" "}
      </h2>
    );
  } else {
    return (
      <>
        {" "}
        <Helmet>
          <meta charSet="utf-8" content="Cart" />
          <title>Cart</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div className="container  bg-main-light text-start p-3 rounded my-lg-5">
          <h2>Shop Cart</h2>
          <p className="text-main">
            Total Cart Price:{data?.data.totalCartPrice}EGY
          </p>
          {data?.data.products.map((item) => {
            return (
              <div key={item._id} className="row py-2 border-bottom ">
                <div className="col-md-1">
                  <img src={item.product.imageCover} alt="" className="w-100" />
                </div>
                <div className="col-md-11 d-flex justify-content-between mt-sm-4">
                  <div>
                    <Link to={"/product-details/" + item.product._id}>
                      {" "}
                      <p className="m-1">{item.product.title}</p>
                    </Link>
                    <p className="text-main m-1 p-0">Price:{item.price}</p>
                    {/* <button
                      onClick={() => deletProduct(item.product._id)}
                      className="btn m-0 p-0 border-0"
                    >
                      {btnLoading ? (
                        <i class="fa-solid fa-trash-can text-main"></i>
                      ) : (
                        <i className="fa fa-spinner fa-spin text-main"> </i>
                      )}
                      Remove
                    </button> */}
                    <button
                      onClick={() => deletProduct(item.product._id)}
                      className="btn m-0 p-0 border-0"
                    >
                      <i class="fa-solid fa-trash-can text-main"></i>
                      Remove
                    </button>
                  </div>
                  <div>
                    <button
                      disabled={item.count == item.product.quantity}
                      onClick={() =>
                        updateProductQTY(item.product._id, item.count + 1)
                      }
                      className="btn brd"
                    >
                      +
                    </button>
                    <span className="px-2">{item.count}</span>
                    <button
                      disabled={item.count <= 1}
                      onClick={() =>
                        updateProductQTY(item.product._id, item.count - 1)
                      }
                      className="btn brd"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <Link
            to={`/address/${data.data._id}`}
            className="btn bg-main my-3 text-white"
          >
            Place Order
          </Link>
        </div>
      </>
    );
  }
}
