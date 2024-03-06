import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import { useQuery } from "react-query";

import { Helmet } from "react-helmet";
export default function Products() {
  /********************************************   react query fetching ******************************/

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const getProducts = async (page = currentPage) => {
    const productsPerPage = 12; // Set the desired number of products per page
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${productsPerPage}`
    );
  };
  // const getProducts = async (page = currentPage) => {
  //   return axios.get(
  //     `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
  //   );
  // };

  const { data, isLoading } = useQuery(
    ["getProducts", currentPage],
    () => getProducts(currentPage),
    {
      cacheTime: 3000,
      refetchInterval: 5000,
    }
  );
  const filteredData = data?.data.data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  //   return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  // }
  // let { data, isLoading } = useQuery("getProducts", getProducts, {
  //   cacheTime: 3000,
  //   refetchInterval: 5000, // every 5 seconds

  // });
  //  ? deh lw feh error undifine mtkmlsh el b3do 3shan mydrblysh error fe weshy
  // console.log("array want to loop", data?.data.data);
  // console.log("is fetching",isFetching)
  // console.log("is loading",isLoading)
  console.log(data);
  //   let [products, setProducts] = useState([]);
  //   let [loading, setLoading] = useState(true);
  //   async function getProducts() {
  //     let { data } = await axios.get(
  //       "https://ecommerce.routemisr.com/api/v1/products"
  //     );
  //     console.log(data.data);
  //     setProducts(data.data);
  //     setLoading(false);
  //   }
  //   useEffect(() => {
  //     getProducts();
  //   }, []);
  if (isLoading) return <Loading />;

  // return (
  //   <>
  //     <div className="container my-5 ">
  //       <div className="row">
  //         {products.map((item) => {
  //           return <Product item={item} key={item._id}></Product>;
  //         })}
  //       </div>
  //     </div>
  //   </>
  // );
  // const totalPages = data?.data.totalPages || 2;
  const productsPerPage = 10; // Set the same value as the one used in the API request
  const totalPages = Math.ceil(data?.data.totalPages / productsPerPage) || 5;
  return (
    // <>
    //   {/* <button onClick={refetch}>refetch</button> */}
    //   <div className="container my-5 ">
    //     <div className="row">
    //       {data?.data.data.map((item) => {
    //         return <Product item={item} key={item._id}></Product>;
    //       })}
    //     </div>
    //   </div>
    //   <div className="pagination">
    //     <button
    //       className="page-item disabled"
    //       onClick={() =>
    //         setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    //       }
    //       disabled={currentPage === 1}
    //     >
    //       Previous
    //     </button>
    //     <span>{currentPage}</span>
    //     <button
    //       className="btn bg-main"
    //       onClick={() =>
    //         setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
    //       }
    //       disabled={currentPage === totalPages}
    //     >
    //       Next
    //     </button>
    //   </div>
    // </>
    <>
      <Helmet>
        <meta charSet="utf-8" content="products" />
        <title>Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container my-5">
        <nav className="navbar ">
          <div className="container-fluid">
            <input
              className="form-control me-2 "
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* <button className="btn btn-outline-success" type="submit">
                Search
              </button> */}
          </div>
        </nav>
        <div className="row">
          {(searchQuery ? filteredData : data?.data.data).map((item) => (
            <Product item={item} key={item._id} />
          ))}
        </div>
      </div>
      <nav aria-label="Page navigation  ">
        <ul className="pagination m-auto justify-content-center my-5">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages).keys()].map((page) => (
            <li
              key={page + 1}
              className={`page-item ${
                currentPage === page + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
