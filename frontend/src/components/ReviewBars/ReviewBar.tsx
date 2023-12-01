import { useState } from 'react';
import "./BarStyles.scss"

const ReviewBar = ({ percentage, reviewCount }: { percentage: number, reviewCount: number }) => {

  const percentageStyle = {
    width: `${percentage}%`,
    height: "100%",
    borderRadius: "10px",
    backgroundColor: "var(--orange)",
    transition: "width 0.5s ease-in-out"
  }

  return ( 
      <div className="review-bar">
        <div className="bar-fill" style={percentageStyle}></div>
        <p className='review-count'>{reviewCount}</p>
      </div>
  );
}
 
export default ReviewBar;