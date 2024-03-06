import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function Brand({ item }) {
  return (
    <>
      <div className="col-md-4 g-4">
        <div class="card mb-2 shadow-sm rounded product">
          <img src={item.image} className="card-img-top w-100 " height={200} />

          <div class="card-body">
            <p class="card-text ">{item.name}</p>
          </div>
        </div>
      </div>
    </>
  );
}
