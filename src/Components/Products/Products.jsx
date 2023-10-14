import axios from 'axios'
import React from 'react'
import { useQuery } from "react-query";
import Product from "../Product/Product";


function Products() {
  
  function getProductAll() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, isLoading } = useQuery(
    "products",
    getProductAll
   
  );

  
  
  return (
    <div className="container">
      {!isLoading ? (
        <>
        <div className="row my-4">
          {data?.data?.data.map((product) => {
            return<Product key={product._id} product={product}/>;
          })}
        </div></>
      ) : (
        <div className="d-flex align-items-center justify-content-center my-5 mx-5">
          <i className="fas fa-spinner fa-spin fa-2x"></i>
        </div>
      )}
    </div>
  )
}

export default Products