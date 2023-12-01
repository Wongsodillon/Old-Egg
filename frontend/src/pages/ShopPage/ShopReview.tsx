import { useState, useEffect } from 'react';
import "./ShopReview.scss"
import { Shop } from '../../types/ShopTypes';
import Rating from '../../components/Rating/Rating';
import ReviewBar from '../../components/ReviewBars/ReviewBar';
import CircularReview from '../../components/ReviewBars/CircularReview';
import { ShopReview } from '../../types/ShopTypes';
import { getShopReview } from '../../api/ShopsAPI';
import ReviewCard from '../../components/ReviewCard/ReviewCard';

const ShopReviewPage = ({ shop }: { shop: Shop }) => {

  const { rating, rating_count } = shop
  const [shopReviews, setShopReviews] = useState<ShopReview[]>([])
  const [reviewFilter, setReviewFilter] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getShopReview(shop.id.toLocaleString())
      setShopReviews(response)
    }
    fetchData()
  
  }, [])

  return ( 
    <>
      <div className='shop-review flex flex-col gap-1 items-start full-width'>
        <div className="flex space-between full-width shop-review-header">
          <h2 className='shop-title'>FEEDBACK</h2>
          <div className='flex filter-review-container'>
            <button className={reviewFilter == 1 ? 'filter-review active-filter' : 'filter-review'} onClick={() => setReviewFilter(1)}>OVERALL</button>
            <button className={reviewFilter == 2 ? 'filter-review active-filter' : 'filter-review'} onClick={() => setReviewFilter(2)}>LAST 30 DAYS</button>
            <button className={reviewFilter == 3 ? 'filter-review active-filter' : 'filter-review'} onClick={() => setReviewFilter(3)}>LAST 60 DAYS</button>
            <button className={reviewFilter == 4 ? 'filter-review active-filter' : 'filter-review'} onClick={() => setReviewFilter(4)}>LAST 12 MONTHS</button>
          </div>
        </div>
        <div className="review-data-container flex gap-2">
          <div className='shop-ratings flex flex-col gap-1-5 items-start'>
            <div className='flex gap-0-5'>
              <Rating rating={rating} rating_count={-1}/>
              <p>{rating_count} Ratings</p>
            </div>
            <p>To rate this seller or report a problem, please use the link provided in the order confirmation email or the order history section located in your account settings</p>
          </div>
          <div className="review-percentage flex flex-col gap-0-5 items-start">
            <div className='percentage-container flex gap-1'>
              <p>5 Egg</p>
              <ReviewBar percentage={77} reviewCount={95} />
              <p>77%</p>
            </div>
            <div className='percentage-container flex gap-1'>
              <p>4 Egg</p>
              <ReviewBar percentage={5} reviewCount={4} />
              <p>5%</p>
            </div>
            <div className='percentage-container flex gap-1'>
              <p>3 Egg</p>
              <ReviewBar percentage={11} reviewCount={8} />
              <p>11%</p>
            </div>
            <div className='percentage-container flex gap-1'>
              <p>2 Egg</p>
              <ReviewBar percentage={1} reviewCount={1} />
              <p>1%</p>
            </div>
            <div className='percentage-container flex gap-1'>
              <p>1 Egg</p>
              <ReviewBar percentage={10} reviewCount={14} />
              <p>10%</p>
            </div>
          </div>
          <div className="review-data flex gap-1-5 items-center">
            <CircularReview percentage={shop.ontime_delivery} type={'On-Time Delivery'}/>
            <CircularReview percentage={shop.product_accuracy} type={'Product Accuracy'}/>
            <CircularReview percentage={shop.satisfaction} type={'Service Satisfaction'}/>
          </div>
        </div>
        <div className='review-list-container flex flex-col items-start'>
          <div className='review-list-header flex space-between full-width'>
            <div className="left-header flex items-center gap-1">
              <p className='bold'>Search Reviews: </p>
              <input type="text" placeholder='Keyword'/>
              <button>GO</button>
            </div>
            <div className="right-header flex">
              <select name="" id="">
                <option value="date">Date Posted</option>
                <option value="date">Rating</option>
              </select>
            </div>
          </div>
          <div className='reviews-container flex flex-col full-width'>
            {shopReviews.map((review) => {
              return (
                <ReviewCard shopReview={review} key={review.id}/>
              )})}
          </div>
        </div>
      </div>
    </>
  );
}
 
export default ShopReviewPage;