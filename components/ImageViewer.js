import Image from 'next/image';

function ImageViewer ({src,width,height}){
  const  _src = src ? src :"/logo.png";
    return(
          <Image
                src={_src}
                alt="null"
                width={width}
                height={height}
          />
    );
}
export default ImageViewer;