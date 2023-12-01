import { ShopReview } from "../../types/ShopTypes";
import Rating from "../Rating/Rating";
import { formatDate } from "../../Util";
import "./ReviewCard.scss"

const ReviewCard = ({ shopReview }: { shopReview: ShopReview }) => {

  const { id, user_name, rating, title, review, date } = shopReview

  formatDate(date)

  return ( 
    <div className='review flex full-width' key={id}>
      <div className="user-info">
        <p>{user_name}</p>
      </div>
      <div className="review-content flex flex-col gap-2 items-start">
        <div className='flex gap-1'>
          <Rating rating={rating} rating_count={-1}/>
          <p className='bold'>{title}</p>
        </div>
        <p>{review}</p>
      </div>
      <div className="review-data flex flex-col space-between items-end">
        <p className='gray-text'>{formatDate(date)}</p>
        <div className='flex gap-1'>
          <button className='helpful-button'>Helpful</button>
          <button className='unhelpful-button'>Unhelpful</button>
        </div>
      </div>
    </div>
  );
}
 
export default ReviewCard;