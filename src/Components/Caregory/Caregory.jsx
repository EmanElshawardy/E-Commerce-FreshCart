import React from 'react'

function Caregory({category}) {
  return (
            <div className="col-md-4">
                <div className="card product">
                    <div className="card-img">
              <img className=' w-100 ratio-4x3 object-fit-cover ' height={'300px'} src={category.image} alt={category.title} />
              </div>
              <h3 className='text-center text-main fw-bold p-3'>{category.name}</h3>
            </div>
            </div>
  )
}

export default Caregory