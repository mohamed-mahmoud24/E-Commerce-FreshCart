import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SubCategorie from "../SubCategories/SubCategorie";

export default function Categorie({ item }) {
  let [btnLoading, setBtnLoading] = useState(true);

  return (
    <>
      <div className="col-md-4 g-4">
        <Link>
          <div class="card mb-2 shadow-sm rounded product">
            <img
              src={item.image}
              className="card-img-top w-100 "
              height={300}
            />

            <div class="card-body">
              <h4 class="card-text text-main fw-bolder">{item.name}</h4>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
