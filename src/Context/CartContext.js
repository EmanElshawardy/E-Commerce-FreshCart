import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';


const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};


export const CartProvider = ({ children }) => {
  let [errorMessage, setErrorMessage] = useState();
  let [cartProducts, setCartProducts] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let [requestTimeOut, setRquestTimeOut] = useState();
  let [totalCart, setTotalCart] = useState(0);
  let [cartId, setCartId] = useState();
  let [numOfCartItems, setNumOfCartItems] = useState(0);

  const { setUserIsLoggedIn } = useContext(AuthContext)

  async function getLoggedUserCart() {
try {
  let response = await axios
  .get("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token: localStorage.getItem("token"),
    },
  })
  setCartId(response.data.data._id);
      setCartProducts(response.data.data.products);
      setTotalCart(response.data.data.totalCartPrice);
      setNumOfCartItems(response.data.numOfCartItems)

} catch (err) {
  setErrorMessage(err.response.data.message);
}
  }

  async function addProductToCart(productId) {
    const response = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
      productId
    },
      {
        headers: {
          token: localStorage.getItem("token")
        },
      }).catch((err) => {
        toast.error(err.response.data.message)
        setUserIsLoggedIn(false)
      })
    if (response) {
      getLoggedUserCart()
      toast.success(response.data.message)
    }
  }


  async function removeProductFromCart(productId) {
    setIsLoading(true);
    let response = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setIsLoading(false);
    if (response) {
      setCartProducts(response.data.data.products);
      setTotalCart(response.data.data.totalCartPrice);
      getLoggedUserCart()
    }
  }
  async function clearCart() {
    setIsLoading(true);
    let response = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setIsLoading(false);

    if (response) {
      setCartProducts([]);
      setTotalCart(0);
      setNumOfCartItems(0)
      setErrorMessage("ABC");
      getLoggedUserCart()
    }
  }
  
  function updateProductCount(productId, count, index) {
    let response;
    let newProducts = [...cartProducts];
    newProducts[index].count = count;

    setCartProducts(newProducts);
    clearTimeout(requestTimeOut);
    setRquestTimeOut(
      setTimeout(async () => {
        response = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
          {
            count,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response) {
          setCartProducts(response.data.data.products);
          setTotalCart(response.data.data.totalCartPrice);
          getLoggedUserCart()
        }
      }, 500)
    );
  }
  return (
    <CartContext.Provider
      value={{
        removeProductFromCart,
        getLoggedUserCart,
        updateProductCount,
        clearCart,
        isLoading,
        totalCart,
        errorMessage,
        cartId,
        cartProducts,
        numOfCartItems,
        addProductToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};