import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderSync({ dataNav, data }) {
    const slider1 = useRef(null);
    const slider2 = useRef(null);
    
  return (
    <div>
      <Slider 
      asNavFor={slider2.current} 
      ref={slider1}>
        {data}
      </Slider>
      <Slider
        asNavFor={slider1.current}
        ref={slider2}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
        centerMode={true}
      >
        {dataNav}
      </Slider>
    </div>
  );
}
export default SliderSync;
