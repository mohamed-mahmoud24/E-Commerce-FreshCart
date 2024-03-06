import React, { useContext, useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useHistory } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
export default function Navbar() {
  // const history = useHistory();
  const navigate = useNavigate();
  const handleSignOut = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    toast.success(" Logged Out Successfully ");
    // Navigate to the sign-in route
    navigate("/signin");
  };
  let {
    counter,
    getCart,
    setCounter,
    wishlistCounter,
    getWishList,
    setwishlistCounter,
  } = useContext(StoreContext);
  useEffect(() => {
    (async () => {
      let data = await getCart();
      console.log(data);
      setCounter(data.numOfCartItems);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let data = await getWishList();
      console.log(data);
      setwishlistCounter(data.data?.length);
    })();
  }, []);
  // console.log(x);
  return (
    <section>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary py-3 px-3  w-100"
        style={
          {
            // zIndex: "10000",
            // position: "fixed",
          }
        }
      >
        <div className="container-fluid  ">
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/home">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/brands">
                  Brands
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/allOrders">
                  Orders
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item position-relative border-end   ">
                <button type="button" class="btn  position-relative border-0 ">
                  <NavLink className="nav-link " to="/profile">
                    {JSON.parse(localStorage.getItem("userName"))}
                    <i className="fa-solid fa-user cartIcon mx-2"> </i>
                  </NavLink>
                </button>
              </li>
              <li className="nav-item position-relative border-end  ">
                <NavLink className="nav-link " to="/cart">
                  <button
                    type="button"
                    class="btn  position-relative border-0 "
                  >
                    Cart
                    <i className="fa-solid fa-cart-shopping cartIcon mx-2"></i>
                    {counter ? (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {counter}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </button>
                </NavLink>
              </li>
              <li className="nav-item position-relative  border-end">
                <NavLink className="nav-link" to="/wishlist">
                  <button type="button" class="btn  position-relative border-0">
                    Wish list
                    <i className="fa-solid fa-heart cartIcon mx-2 "></i>
                    {wishlistCounter ? (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {wishlistCounter}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </button>
                </NavLink>
              </li>
              <li className="nav-item position-relative sign-out-btn">
                <NavLink className="nav-link">
                  <button
                    type="button"
                    class="btn  position-relative border-0"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}
