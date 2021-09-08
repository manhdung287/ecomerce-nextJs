import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function SliderImage({ setting, data }) {
  const settingDefault = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const _setting = setting ?setting:settingDefault;
  return <Slider {..._setting}>{data}</Slider>;
}
export default SliderImage;
