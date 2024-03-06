import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function SubCategorie() {
  /*******************************************************   react query fetching **********************************************/
  let x = useParams();
  console.log(x);
  function getSubCategorie() {
    let Subcategorie = axios.get(
      `https://ecommerce.routemisr.com/api/v1/subcategories`
    );

    return Subcategorie;
  }

  let { data, isLoading } = useQuery("getSubCategorie", getSubCategorie, {
    cacheTime: 3000,
    refetchInterval: 5000,
  });
  console.log("data", data);
  console.log("data", data?.data?.data);

  if (isLoading) return <Loading />;

  return (
    <>
      {/* <button onClick={refetch}>refetch</button> */}
      <div className="container my-5 ">
        <div className="row">
          <h1 className="text-main m-auto text-start ">Sub Categories </h1>

          {data?.data?.data.map((item) => (
            <div className="col-md-4 g-4 ">
              <div
                key={item._id}
                className="card mb-2 shadow-sm rounded product"
              >
                <div className="card-body">
                  <h4 className="card-text  fw-bolder">{item.name}</h4>
                </div>
                {/* <Link to={"/SubCategories/" + item._id}>
            
                </Link> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
