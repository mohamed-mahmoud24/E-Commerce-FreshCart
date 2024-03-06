import "./App.css";
import MainSlider from "./component/MainSlider/MainSlider";
import Navbar from "./component/Navbar/Navbar";
import Categories from "./component/categories/Categories";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Home from "./component/home/Home";
import MainLayout from "./component/Layouts/MainLayout";
import Products from "./component/products/Products";
import CategoriesSlider from "./component/MainSlider/CategoriesSlider";
import Brands from "./component/Brands/Brands";
import Cart from "./component/Cart/Cart";
import Signup from "./component/Sign up/Signup";
import Wishlist from "./component/wishList/Wishlist";
import Signin from "./component/sign in/Signin";
import AuthntcationLayout from "./component/Layouts/AuthntcationLayout";
import NotFound from "./component/NotFound/NotFound";
import ProtectedRoutes from "./component/ProtectedRoutes/ProtectedRoutes";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import StoreContextProvider from "./Context/StoreContext";
import { ToastContainer } from "react-toastify";
import Address from "./component/Address/Address";
import AllOrders from "./component/AllOrder/AllOrders";
import SubCategories from "./component/SubCategories/SubCategories";
import Footer from "./component/Footer/Footer";
import ForgotPass from "./component/ForgetPass/ForgotPass";
import ResetCode from "./component/ForgetPass/ResetCode";
import Changepass from "./component/ForgetPass/Changepass";
import Profile from "./component/Profile/Profile";
import { Offline, Online } from "react-detect-offline";
function App() {
  let routes = createHashRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        // {
        //   index: true,
        //   element: (
        //     <ProtectedRoutes>
        //       <Home />{" "}
        //     </ProtectedRoutes>
        //   ),
        // },
        {
          path: "home",
          element: (
            <ProtectedRoutes>
              <Home />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "footer",
          element: (
            <ProtectedRoutes>
              <Footer />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "SubCategories/:myId",
          element: (
            <ProtectedRoutes>
              <SubCategories />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              {" "}
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "product-details/:MyId",
          element: (
            <ProtectedRoutes>
              {" "}
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "address/:id",
          element: (
            <ProtectedRoutes>
              {" "}
              <Address />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              {" "}
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoutes>
              {" "}
              <Profile />
            </ProtectedRoutes>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: <AuthntcationLayout />,

      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "signup", element: <Signup /> },
        { path: "signin", element: <Signin /> },

        {
          path: "forgotPass",
          element: <ForgotPass />,
        },
        {
          path: "restCode",
          element: <ResetCode />,
        },
        {
          path: "changePass",
          element: <Changepass />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      {/* <Offline>
        <div className="offline">You are offline now</div>
      </Offline> */}
      <StoreContextProvider>
        <RouterProvider router={routes} />
      </StoreContextProvider>
      <ToastContainer theme="colored" autoClose={700} />
      <div>
        <Offline>
          <div className="network p-3 rounded-3 text-main">
            <p>
              {" "}
              <i className="fa-solid fa-wifi cartIcon mx-2"></i>You are offline
              cheak internet connection!!{" "}
            </p>
          </div>
        </Offline>
      </div>
    </div>
  );
}

export default App;
