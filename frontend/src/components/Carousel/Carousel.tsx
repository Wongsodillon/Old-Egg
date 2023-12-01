import * as React from 'react';
import { useState, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import img1 from "../../assets/dummy1.jpg"
import img2 from "../../assets/dummy2.jpg"
import img3 from "../../assets/dummy3.jpg"
import img4 from "../../assets/dummy4.jpg"
import "./Carousel.scss"

const Carousel = () => {

  const [currIndex, setCurrIndex] = useState(0)

  const images = [
    { url: img1 },
    { url: img2 },
    { url: img3 },
    { url: img4 },
  ]
  const parentStyle = {
    overflow: "hidden",
    userSelect: "none",
  }

  const slideStyles = {
    display: "flex",
    minWidth: "100vw",
    minHeight: "100%",
    transform: `translateX(-${currIndex * 100}%)`,
    transition: 'transform 0.5s ease-out',
  }

  const imageStyles = {
    width: "100%",
    height: "100%",
  }

  const prev = () => {
    const isFirst = currIndex == 0
    const newIndex = isFirst ? images.length - 1 : currIndex - 1
    setCurrIndex(newIndex)
  }

  const next = () => {
    const isLast = currIndex == images.length - 1
    const newIndex = isLast ? 0 : currIndex + 1
    setCurrIndex(newIndex)
  }

  return ( 
    <div style={parentStyle}>
      <div style={slideStyles} className='slide'>
        {images.map((image, index) => {
          return (
            <img style={imageStyles} src={image.url} alt="" key={index}/>
          )})}
      </div>
      <FaChevronLeft size={50} onClick={prev} className="left-arrow"/>
      <FaChevronRight size={50} onClick={next} className="right-arrow"/>
    </div>
  );
}
 
export default Carousel;