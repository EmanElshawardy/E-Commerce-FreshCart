import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

function Address() {
    let {cartId} = useParams()
    async function order(shippingAddress) {
        localStorage.setItem( 'phone' , shippingAddress.phone )
        let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
            shippingAddress   
        }, {
            headers:{
                token: localStorage.getItem('token')
            }
        })

        window.location.href=res.data.session.url
    }
    const formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        onSubmit: order

    })
    return (
        <>
        <Helmet>
            <title> Address </title>
        </Helmet>
        <form className='w-75 m-auto my-5' onSubmit={formik.handleSubmit}>

            <label htmlFor="details" className='my-1'>Details:</label>
            <input value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className='form-control mb-3' id='details' name='details' />

            <label htmlFor="phone" className='my-1'>Phone:</label>
            <input value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" className='form-control mb-3' id='phone' name='phone' />

            <label htmlFor="city" className='my-1'>City:</label>
            <input value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className='form-control mb-3' id='city' name='city' />

            <button type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>Pay Now</button>

        </form>
        </>
    )
}

export default Address