import { createContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
//{{BaseUrl}}/api/v1/cart
// zero dah initial value
import { Baseurl } from "../component/baseUrl/BaseUrl";
import { json } from "react-router-dom";
export let StoreContext = createContext(0);
let userId = localStorage.getItem("userId");

async function addToCart(productId) {
  return axios
    .post(
      Baseurl + "cart",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}
async function getCart() {
  return axios
    .get(Baseurl + "cart", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
async function deleteItem(productId) {
  return axios
    .delete(Baseurl + "cart/" + productId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
async function updateQTY(productId, count) {
  return axios
    .put(
      Baseurl + "cart/" + productId,
      { count },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}
async function pay(cartId, shippingAddress) {
  return axios
    .post(
      Baseurl + "orders/checkout-session/" + cartId,
      { shippingAddress },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}
async function getAllOrder() {
  return axios
    .get(Baseurl + "orders/user/" + JSON.parse(localStorage.getItem("userId")))
    .then(({ data }) => data)
    .catch((err) => err);
}

async function addToWishList(productId) {
  return axios
    .post(
      Baseurl + "wishlist ",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}
async function getWishList() {
  return axios
    .get(Baseurl + "wishlist ", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
async function deleteItemFromWishList(productId) {
  return axios
    .delete(Baseurl + "wishlist/" + productId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
// function getName() {
//   let [myName, setMyName] = useState("");
//   let encodedToken = localStorage.getItem("token"); //getting token from local
//   let decodedToken = jwtDecode(encodedToken);
//   console.log(decodedToken);
//   setMyName(decodedToken.name);
//   return myName;
// }
export default function StoreContextProvider(props) {
  //state el htkon shared 3la project kolo ex. counter children leha access 3la el counter
  let [counter, setCounter] = useState(0);
  let [wishlistCounter, setwishlistCounter] = useState(0);

  return (
    <StoreContext.Provider
      value={{
        counter,
        setCounter,
        setwishlistCounter,
        wishlistCounter,
        addToCart,
        deleteItem,
        updateQTY,
        getCart,
        pay,
        getAllOrder,
        addToWishList,
        getWishList,
        deleteItemFromWishList,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
