import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'
import Slider from "react-slick";

function ProductDetails() {
    let params= useParams()
    let [productDetails,setProductDetails]=useState({})
    let [isLoading,setIsLoading]=useState(false)

    var settings = {
         
      };

    useEffect(()=>{
    getProductDetails(params.id)
    },[])
   async function getProductDetails(productId){
    setIsLoading(true)
        let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/products/"+productId)
    setIsLoading(false)
    
       
        setProductDetails(data.data)
    }
  
  return (<>
  <Helmet>
            <title> Product Details </title>
        </Helmet>
    {isLoading?<>
    <div className="d-flex align-items-center justify-content-center my-5 mx-5">
        <i className='fas fa-spinner fa-spin fa-2x'></i>
        </div>
    </>:
<div className="row align-items-center">
    <div className="col-md-3">
  <Slider {...settings}>
  {productDetails.images?.map((img,index)=>{
    return <img alt={img.title} key={index} className="w-100 " src={img}  />
})}
    </Slider>
    </div>
    <div className="col-md-9">
        <h2 className='mt-2'>{productDetails?.title}</h2>
        <h5 className='font-sm text-main mt-2'>{productDetails?.category?.name}</h5>
        <p className='mt-2'>{productDetails?.description}</p>
        <p className='d-flex justify-content-between'>
            <span>{productDetails?.price} EGP</span>
            <span>
                <li className='fas fa-star rating-color me-1'></li>
                <span>{productDetails?.ratingsAverage}</span>
            </span>
        </p>
        <button className='btn bg-main w-100 text-white mt-2'>Add To Cart</button>
    </div>
</div>
}
</>
    )
}

export default ProductDetails