import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import "./Rating.scss"

const Rating = ({ rating, rating_count }) => {

  const stars = Math.floor(rating)

  const buildStars = () => {
    const starsArray = []

    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        starsArray.push(<FaStar className='icon-rating'/>)
      } 
      else if ( i === stars && (rating * 10) % 10 >= 5 ) {
        starsArray.push(<FaStarHalfAlt className='icon-rating'/>)
      }
      else {
        starsArray.push(<AiOutlineStar className='icon-rating'/>)
      }
    }
    return starsArray
  }

  return ( 
    <div className="rating-container">
      <div className="rating">
        {buildStars()}
      </div>
      {rating_count == -1 ? '' : <p className="gray-text">{`(${rating_count})`}</p>}
    </div>
  );
}
 
export default Rating;