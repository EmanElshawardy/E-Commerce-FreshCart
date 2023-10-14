import React from 'react'
import Slider from "react-slick";
import slide1 from"../../Assets/Images/blog-img-1.jpeg"
import slide2 from"../../Assets/Images/blog-img-2.jpeg"
import img1 from"../../Assets/Images/1.jpg"
import img2 from"../../Assets/Images/2.jpg"

function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
  return (
    <div className="main-slider">
    <div className="row">
    <div className="col-md-9 p-0">
    <Slider {...settings}>
      <img className="w-100" height={500} src={slide1} alt="" />
      <img className="w-100" height={500} src={slide2} alt="" />
    </Slider>
    </div>
    <div className="col-md-3 p-0">
      <img src={img1} height={250} className="w-100" alt="" />
      <img src={img2} height={250} className="w-100" alt="" />
    </div>
    </div>
    </div>
  )
}

export default MainSlider