import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from'yup'
import { AuthContext } from '../../Context/AuthContext';
import { Helmet } from 'react-helmet';

function Login() {
  const navigate=useNavigate()
  const [errorMessage,setErrorMessage]= useState('')
  const [isLoding,setIsLoding]= useState(false)
const {setUserIsLoggedIn,userIsLoggedIn}=useContext(AuthContext)

useEffect(()=>{
if(userIsLoggedIn){
  navigate("/home")
}
},[])
  async function login(){
    setErrorMessage('')
    setIsLoding(true)
console.log(formik.values);
const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',formik.values).catch(err=>{
  setErrorMessage(err.response.data.message);
  setIsLoding(false)
})
if(data.message==="success"){
  setIsLoding(true)
  localStorage.setItem('token',data.token)
  setUserIsLoggedIn(true)
  navigate('/home')
}

  }

  const validationSchema=Yup.object({
    email:Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Enter valid email'),
    password:Yup.string().required('Password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'Password must contain characters special cha, num and greater than 8 charachters and less than 18 characters'),
  })

  const formik=useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    onSubmit:login,

    validationSchema
  })

  return (
    <div className='w-75 m-auto my-5'>
      <Helmet>
            <title> Login </title>
        </Helmet>
     <h1> Login Now :</h1>
     <form  onSubmit={formik.handleSubmit}>

      <label htmlFor="email" className='my-1'>Email:</label>
      <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className='form-control mb-3' id='email' name='email'/>
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null}
      

      <label htmlFor="password" className='my-1'>Password:</label>
      <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control mb-3' id='password' name='password'/>
      {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:null}
{errorMessage?<div className="alert alert-danger">{errorMessage}</div>:null}

     <div className='d-flex'>
     <Link to={'/forgetPassword'} className='fw-bold'>forget your password ?</Link>
{isLoding?<button disabled type='button' className='btn bg-main px-3 text-white ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>:
<button disabled={!(formik.isValid&&formik.dirty)} type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>Login</button>}
</div>
     </form>
      </div>
  )
}
export default Login
