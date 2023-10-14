import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Caregory from '../Caregory/Caregory';
import { Helmet } from 'react-helmet';

function Categories() {
  function getCategoryAll() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data,  isLoading } = useQuery(
    "products",
    getCategoryAll
   
  );


  return (
    <div className="container my-4">
      <Helmet>
            <title> Categories </title>
        </Helmet>
      {!isLoading ? (
        <>
        <div className="row g-4">
          {data?.data.data.map((category) => {
            return <Caregory key={category._id} category={category} />;
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

export default Categories