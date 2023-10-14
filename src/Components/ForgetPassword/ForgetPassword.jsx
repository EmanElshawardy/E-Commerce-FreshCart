import axios from 'axios'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

function ForgetPassword() {
  const navigate=useNavigate()

   
    async function forgetPassword(email){
    
      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',formik.values,{
         email
        }).catch((err)=>{
          console.log(err.response.data.message);
      })
      navigate('/VerifyCode')
    }
      
    const formik=useFormik({
        initialValues:{
          email:'',
        },
        onSubmit:forgetPassword,
      
      })


return (
<>
<Helmet>
  <title>Forget Password</title>
</Helmet>
<div className="w-75 m-auto my-5">
<h1> Forget Password Now :</h1>
     <form  onSubmit={formik.handleSubmit}>

      <label htmlFor="email" className='my-1'>Email:</label>
      <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className='form-control mb-3' id='email' name='email'/>
      
 <button type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>Forget Password</button> 

     </form>
</div>
</>
)
}

export default ForgetPassword