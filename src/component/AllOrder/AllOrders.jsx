import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";
//65c9247e5f7676d5e80678bb my id
export default function AllOrders() {
  let { getAllOrder } = useContext(StoreContext);
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let data = await getAllOrder();
      console.log(data);
      if (data?.response?.data.statusMsg == "fail") {
        console.log(data);
        setData(null);
        setLoading(false);
      } else {
        setData(data);
        console.log(data);
        console.log(data.length);
        setLoading(false);
      }
      // console.log(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;
  if (data.length == 0) {
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
        No order!!{" "}
      </h2>
    );
  } else {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" content="orders" />
          <title>Orders</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>{" "}
        <div
          className="container my-2 bg-main-light text-start p-3 rounded accordion my-5"
          id="accordionPanelsStayOpenExample"
        >
          <h2 className="mb-2">
            your previous orders <i className="fa-regular fa-eye"></i>
          </h2>
          <div className="accordion-item bg-main-light">
            {data.map((order, orderIndex) => (
              <div key={order._id} className="row py-2 ">
                <div className="col-md-12">
                  <div className="accordion-header  text-center">
                    <button
                      className="accordion-button bg-main-light h-25 text-center"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#orderCollapse${orderIndex}`}
                      aria-expanded="true"
                      aria-controls={`orderCollapse${orderIndex}`}
                    >
                      <h4 className="text-main text-center fw-bold ">
                        Order {orderIndex + 1}
                      </h4>
                    </button>
                  </div>
                </div>

                <div
                  id={`orderCollapse${orderIndex}`}
                  className="accordion-collapse collapse "
                >
                  <div className="accordion-body  ">
                    {order.cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="col-md-12 border-bottom mb-3"
                      >
                        <div className="row">
                          <div className="col-md-1">
                            <img
                              src={item.product.imageCover}
                              alt=""
                              className="w-100"
                            />
                          </div>
                          <div className="col-md-11 d-flex justify-content-between mt-sm-4 ">
                            <div>
                              <p className="m-1">{item.product.title}</p>
                              <p className="text-main m-1 p-0">
                                Price: {item.price}
                              </p>
                            </div>
                            <div>
                              <p className="text-main fw-bolder ">
                                {item.count} Piece
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <p className="text-main mt-3 fw-bold">
                      Total Cart Price: {order.totalOrderPrice} EGY Total Cart
                    </p>
                    <p className="text-main  fw-bold">
                      payment Method Type: {order.paymentMethodType}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

// <div className="container my-2 bg-main-light text-start p-3 rounded">
// <h2>Shop Cart</h2>
// {data.map((order, orderIndex) => (
//   <div key={order._id} className="row py-2 border-bottom">
//     <div className="col-md-12">
//       <h3>Order {orderIndex + 1}</h3>
//     </div>
//     <p className="text-main">
//       Total Cart Price: {order.totalOrderPrice} EGY
//     </p>
//     {order.cartItems.map((item) => (
//       <div key={item._id} className="col-md-12">
//         <div className="row">
//           <div className="col-md-1">
//             <img src={item.product.imageCover} alt="" className="w-100" />
//           </div>
//           <div className="col-md-11 d-flex justify-content-between mt-sm-4">
//             <div>
//               <p className="m-1">{item.product.title}</p>
//               <p className="text-main m-1 p-0">Price: {item.price}</p>
//             </div>
//             <div>
//               {" "}
//               <p className="text-main fw-bolder "> {item.count} Piece</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// ))}
// </div>
