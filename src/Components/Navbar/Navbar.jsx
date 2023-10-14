import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/Images/freshcart-logo.svg'
import { AuthContext } from '../../Context/AuthContext'
 import { useCart} from '../../Context/CartContext';

export default function Navbar() {
const {userIsLoggedIn, setUserIsLoggedIn}=useContext(AuthContext)
const {getLoggedUserCart,numOfCartItems} = useCart()
let navigate=useNavigate()

useEffect(() => {
  getLoggedUserCart();

}, []);
function logOut(){
  setUserIsLoggedIn(false)
  localStorage.removeItem("token")
  navigate('/login')
}


  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container">
      <Link className="navbar-brand" to={"home"} ><img src={logo} alt="cart" /></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {userIsLoggedIn?
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link " to={'home'}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link"to={'products'}>Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link"to={'categories'}>Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link"to={'brands'}>Brands</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link"to={'wishList'}>ًWish list</Link>
          </li>
          <li className="nav-item">
            <Link onClick={getLoggedUserCart}className="nav-link"to={'cart'}>Cart</Link>
          </li>
        </ul>:null}
        
        <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
          {userIsLoggedIn?
            <li className="nav-item">
            <Link className="nav-link"to={'cart'}>
  <i className="fa-solid fa-cart-shopping position-relative fs-5">
  <span className="cart-pop position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main ">
  {numOfCartItems}
    <span className="visually-hidden">unread messages</span>
  </span>
  </i>
</Link>
          </li>:null
        }
          <div className='nav-item d-flex align-items-center'>
            <li className='fab mx-2 fa fa-facebook' ></li>
            <li className='fab mx-2 fa fa-twitter' ></li>
            <li className='fab mx-2 fa fa-instagram' ></li>
            <li className='fab mx-2 fa fa fa-youtube' ></li>
            <li className='fab mx-2 fa fa-tiktok' ></li>
          </div>
          {!userIsLoggedIn?<>
            <li className='nav-item ' >
            <Link className='nav-link' to={'login'}>Login</Link>
          </li>
          <li className='nav-item ' >
            <Link className='nav-link' to={'register'}>Register</Link>
          </li></>:<li className='nav-item ' >
            <span onClick={logOut} className='nav-link cursor-pointer' >Logout</span>
          </li>}
        </ul>
      </div>
    </div>
  </nav>
  </>
  )
}
