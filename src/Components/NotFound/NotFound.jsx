import React from 'react'
import notFound from'../../Assets/Images/error.svg'
import { Helmet } from 'react-helmet'

function NotFound() {
  return (
    <div>
      <Helmet>
            <title> 404 Not Found </title>
        </Helmet>
      <img src={notFound} className='w-50 m-auto d-block py-5' alt="notFound" />
      </div>
  )
}

export default NotFound