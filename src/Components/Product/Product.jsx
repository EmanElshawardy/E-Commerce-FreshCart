import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'

import { useCart} from '../../Context/CartContext';
function Product({ product }) {
  const {addProductToCart} = useCart()
  let [listProducts, setListProducts] = useState()
  let [listsProducts, setListsProducts] = useState([])
  let [isLoading, setIsLoading] = useState(false)

  async function addProductWishList(productId) {
    const addProductWishListButton = document.querySelector(`.add-wishlist-button[data-product-id="${productId}"]`);
    const removeProductFromListButton = document.querySelector(`.remove-wishlist-button[data-product-id="${productId}`);

    const response = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
      productId
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).catch((err) => {
      toast.error(err.response.data.message);
    });

    if (response) {
      toast.success(response.data.message);
      addProductWishListButton.classList.add('d-none');
      removeProductFromListButton.classList.remove('d-none');
    }
  }

  async function removeProductFromList(productId) {
    const addProductWishListButton = document.querySelector(`.add-wishlist-button[data-product-id="${productId}"]`);
    const removeProductFromListButton = document.querySelector(`.remove-wishlist-button[data-product-id="${productId}"]`);

    const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).catch((err) => {
      toast.success(err.response.data.message);
    });

    if (response) {
      setListProducts(response.data);
      toast.error(response.data.message);
      addProductWishListButton.classList.remove('d-none');
      removeProductFromListButton.classList.add('d-none');
    }
  }


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
      setListsProducts(response.data.data);
    }
  }

  return (
    <div className="col-md-3">
      <div className="product overflow-hidden px-2 py-3 cursor-pointer">
        <Link to={'/productDetails/' + product._id}>
          <img className="w-100" src={product.imageCover} alt={product.title} />
          <h5 className="font-sm text-main">{product.category.name}</h5>
          <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
          <p className='d-flex justify-content-between'>
            <span>{product.price} EGP</span>
            <span>
              <i className="fas fa-star rating-color me-1"></i>
              {product.ratingsAverage}
            </span>
          </p>
        </Link>
        <li id='addProductWishListButton' onClick={() => addProductWishList(product._id)} className={`fa-solid fa-heart fs-4 d-flex justify-content-end pb-2 add-wishlist-button`} data-product-id={product._id}></li>
        <li id='removeProductFromListButton' onClick={() => removeProductFromList(product._id)} className={`fa-solid fa-heart fs-4 d-flex justify-content-end pb-2 text-danger remove-wishlist-button d-none`}
          data-product-id={product._id}></li>

        <button onClick={() => addProductToCart(product._id)} className='btn bg-main text-white w-100 '>+Add To Cart</button>
      </div>
    </div>
  )
}

export default Product