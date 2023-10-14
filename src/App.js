import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from 'react-query';
import Address from './Components/Address/Address';
import AllOrders from './Components/AllOrders/AllOrders';
import WishList from './Components/WishList/WishList';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import VerifyCode from './Components/VerifyCode/VerifyCode';
import NewResetPassword from './Components/NewResetPassword/NewResetPassword';
import { CartProvider } from './Context/CartContext';



function App() {
  const queryClient =new QueryClient()
  let routers = createHashRouter([
    {
      path: '/', element: <Layout />, children: [
        { path: '', element: <Navigate to={'Home'} /> },
        { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'address/:cartId', element: <ProtectedRoute><Address /></ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'allOrders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: 'forgetPassword', element: <ForgetPassword />},
        { path: 'verifyCode', element: <VerifyCode />},
        { path: 'newResetPassword', element: <NewResetPassword />},
        { path: 'wishList', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CartProvider>
        <RouterProvider router={routers}></RouterProvider>
        </CartProvider>
      </AuthContextProvider>
    </QueryClientProvider>

  );
}

export default App;
