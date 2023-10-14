import axios from 'axios';
import React, { useEffect, useState } from 'react'

function WishList() {
  let [isLoading, setIsLoading] = useState(false)
  let [listProducts, setListProducts] = useState();


  useEffect(() => {
    getWishListtAll()
  }, [])
  async function getWishListtAll() {
    setIsLoading(true)
    let response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    setIsLoading(false)
    if (response) {
      setListProducts(response.data.data);
    }
  
  }
  async function removeProductFromList(productId) {
    setIsLoading(true)
    let response = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    setIsLoading(false)
    if (response) {
      getWishListtAll()
    }
  }
  return (
    <>
      {isLoading ?
        <div className="d-flex align-items-center justify-content-center my-5 mx-5">
          <i className='fas fa-spinner fa-spin fa-2x'></i>
        </div>
        :
        <>
          <div className='my-3'>
            <h2>My wish List</h2>
            {listProducts?.map((list) => {
              return (<div key={list._id} className=" cart-product shadow rounded-2 my-3">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img className="w-100" src={list?.imageCover} alt="" />
                  </div>
                  <div className="col-md-8">
                    <h2>{list?.title}</h2>
                    <h5>{list?.category?.name}</h5>
                    <p className="d-flex justify-content-between">
                      <span>{list?.price}EGP</span></p>
                    <button className="btn text-danger" onClick={() => removeProductFromList(list._id)}><i className="fa-solid fa-trash"></i> Remove</button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </>
       } 
    </>
  )
}

export default WishList