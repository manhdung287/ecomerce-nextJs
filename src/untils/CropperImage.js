import React, { useState } from 'react';
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";

function CropperImage({src}){
    const [image,setImage] = useState(src);
    const [cropData,setCropdata] = useState("#");
 
   
    return(
        <div/>
    );
}
export default CropperImage; 