import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

function CategorySlider() {
    const [categories,setCatogries]=useState()
    useEffect(()=>{
        getAllCategories()
    },[])

    async function getAllCategories(){
        let{data}=await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        setCatogries(data.data)
    }
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3
      };
  return (
<Slider {...settings} className='mb-4'>
      {categories?.map((category) => {
       return<div key={category._id}>
       <img className="w-100" height={200} src={category?.image} alt={category.name} />
       <h5 className='font-sm text-main'>{category.name}</h5>
       </div>
      })}
    </Slider>  )
}

export default CategorySlider