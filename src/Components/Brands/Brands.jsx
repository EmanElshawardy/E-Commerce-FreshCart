import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';

function Brands() {
  function getBrandAll(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
  const { data, isLoading } = useQuery(
    "brands",
    getBrandAll
  );
  return (
    <div className="container my-5">
      <Helmet>
            <title> Brands </title>
        </Helmet>
      {!isLoading ? (
        <>
        <div className="row g-4">
        <h2 className='text-center text-main fw-bold'>All Brands</h2>
          {data?.data.data.map((brand) => {
            return<div key={brand._id} className="col-md-3">
              <div className="card product">
            <img src={brand.image} alt="" />
            <h6 className='text-center p-3'>{brand.name}</h6>
          </div>
          </div>
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

export default Brands
