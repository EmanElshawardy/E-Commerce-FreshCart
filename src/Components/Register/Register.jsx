import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from'yup'
import { AuthContext } from '../../Context/AuthContext';
import { Helmet } from 'react-helmet';

function Register() {
  const navigate=useNavigate()
  const [errorMessage,setErrorMessage]= useState('')
  const [isLoding,setIsLoding]= useState(false)

  const {userIsLoggedIn}=useContext(AuthContext)

  useEffect(()=>{
  if(userIsLoggedIn){
    navigate("/home")
  }
  },[])
  async function register(){
    setErrorMessage('')
    setIsLoding(true)

const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formik.values).catch(err=>{

  setErrorMessage(err.response.data.message);
  setIsLoding(false)
})
if(data.message === "success"){
  setIsLoding(true)
  navigate('/login')
}

  }
 
  const validation=Yup.object({
    name:Yup.string().required('Name is required').min(3,'Min length 3 characters').max(20,'Max length 20 characters'),
    email:Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Enter valid email'),
    password:Yup.string().required('Password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'Password must contain characters special cha, num and greater than 8 charachters and less than 18 characters'),
    rePassword:Yup.string().required('RePassword is required').oneOf([Yup.ref('password')],"Repassword and password dosn't match"),
    phone:Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/,'Enter valid egyptian phone num'),
  
  })
  // 
  const formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },
    onSubmit:register,
  
    validationSchema:validation
  })

  return (
    <div className='w-75 m-auto my-5'>
      <Helmet>
            <title> Register </title>
        </Helmet>
     <h1> Register Now :</h1>
     <form  onSubmit={formik.handleSubmit}>
      <label htmlFor="name" className='my-1'>Name:</label>
      <input value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className='form-control mb-3' id='name' name='name'/>
      {formik.errors.name && formik.touched.name?<div className="alert alert-danger">{formik.errors.name}</div>:null}

      <label htmlFor="email" className='my-1'>Email:</label>
      <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className='form-control mb-3' id='email' name='email'/>
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null}
      

      <label htmlFor="password" className='my-1'>Password:</label>
      <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control mb-3' id='password' name='password'/>
      {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:null}

      <label htmlFor="rePassword" className='my-1'>RePassword:</label>
      <input value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="Password" className='form-control mb-3' id='rePassword' name='rePassword'/>
      {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger">{formik.errors.rePassword}</div>:null}

      <label htmlFor="phone" className='my-1'>Phone:</label>
      <input value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" className='form-control mb-3' id='phone' name='phone'/>
      {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger">{formik.errors.phone}</div>:null}
      {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:null}

{isLoding?<button disabled type='button' className='btn bg-main px-3 text-white ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>:
<button disabled={!(formik.isValid&&formik.dirty)} type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>Register</button>}

     </form>
      </div>
  )
}

export default Register
