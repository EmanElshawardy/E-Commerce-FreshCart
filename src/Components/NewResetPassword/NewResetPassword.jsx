import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function NewResetPassword() {
  const navigate=useNavigate()

  async function resetPassword() {
 
    await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",formik.values).catch((err)=>{
      console.log(err.response.data.message);
  })
    navigate('/login')
  
  }
         
         const validation=Yup.object({
            email:Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'Enter valid email'),
            newPassword:Yup.string().required('Password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'Password must contain characters special cha, num and greater than 8 charachters and less than 18 characters')
          
          })

         const formik=useFormik({
            initialValues:{
              email:'',
              newPassword:'',
            },
            onSubmit:resetPassword,
            validationSchema:validation
          })
   return (
     <>
 <div className="w-75 m-auto my-5">
 <h1> reset your account password :</h1>
      <form  onSubmit={formik.handleSubmit}>
 
      <label htmlFor="email" className='my-1'>Email:</label>
      <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className='form-control mb-3' id='email' name='email'/>
      {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null}
      
       <label htmlFor="newPassword" className='my-1'>New Password:</label>
      <input value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control mb-3' id='newPassword' name='newPassword'/>
      {formik.errors.newPassword && formik.touched.newPassword?<div className="alert alert-danger">{formik.errors.newPassword}</div>:null}
       
 <button type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>Forget Password</button>
 
 
 
 
      </form>
 </div>
 </>
 )
}

export default NewResetPassword