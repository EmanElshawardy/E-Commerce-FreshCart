import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Helmet } from 'react-helmet';
function VerifyCode() {

  const navigate = useNavigate()
    async function verifyCode(){
       await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', formik.values).catch((err)=>{
     
      })
      navigate('/NewResetPassword')
        }
        const formik = useFormik({
          initialValues: {
            resetCode: '',
          },
          onSubmit: verifyCode
       
        });
  return (
    <>
    <Helmet>
      <title>
        Verify Code
      </title>
    </Helmet>
    <div className="w-75 m-auto my-5">
    <h1> reset your account password :</h1>
    <form onSubmit={formik.handleSubmit}>
        <input value={formik.values.resetCode} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className='form-control mb-3' id='resetCode' name='resetCode' placeholder='Enter Your Code'/>
      <button type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>Verify Code</button>
    </form>
  </div>



</>
  )
}

export default VerifyCode
