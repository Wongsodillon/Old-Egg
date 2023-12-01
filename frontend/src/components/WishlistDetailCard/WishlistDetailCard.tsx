import { Link } from 'react-router-dom';
import Rating from "../Rating/Rating";
import { WishlistDetails } from "../../types/WishlistTypes";
import { removeProduct } from '../../api/WishlistsAPI';
import { AddCart } from '../../types/CartType';
import { addToCart } from '../../api/CartsAPI';
import "./WishlistDetailCard.scss"
import { useAuth } from '../../hooks/useAuth';

const WishlistDetailCard = ({ wishlist, self = false }: { wishlist: WishlistDetails, self?: boolean }) => {

  const user = useAuth()

  const { id, user_id, product_id, product_url, product_rating, product_rating_count, brand_url, product_name, product_price, product_shipping_price, quantity, date_added } = wishlist

  const formatDate = (inputTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: true,
    };
  
    const inputDate = new Date(inputTimeString);
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);
  
    return formattedDate;
  };

  const handleRemove = async () => {
    const result = await removeProduct(id, product_id)
    if (result) {
      window.location.reload()
    }
  }

  const handleAddToCart = async ({ user_id, product_id, quantity}: AddCart) => {
    try {
      console.log({ user_id, product_id, quantity })
      const result = await addToCart({ user_id, product_id, quantity })
      console.log(result)
      if (result && self) {
        handleRemove()
        alert('Added to cart!')
      }
      else if (result) {
        alert('Added to cart!')
      }
    } catch {
      console.log('error')
    }
  }

  if (!wishlist || Object.keys(user).length == 0) return (<div>Loading...</div>)

  return ( 
    <div className='wishlist-detail-card flex items-start gap-2' key={wishlist.id}>
      <img src={product_url} alt="" />
      <div className='details flex flex-col items-start gap-1'>
        <div className='detail-top full-width flex space-between'>
          <Rating rating={product_rating} rating_count={product_rating_count} />
          <img src={brand_url} className='brand-image' />
        </div>
        <Link style={{ textDecoration: 'none', color: 'inherit'}} to={`/product/${product_id}`}>
          <p className='bold name'>{product_name}</p>
        </Link>
      </div>
      <div className='right-details flex flex-col items-end gap-1'>
        <p className='product-price'>{`$${product_price.toLocaleString()}`}</p>
        <p>{product_shipping_price != 0 ? `Shipping: $${product_shipping_price.toLocaleString()}` : `Free Shipping`}</p>
        <div className='flex gap-0-5 items-center'>
          <p>Qty: {quantity}</p>
          <button className='orange-button' onClick={() => {handleAddToCart({user_id: user.id , product_id, quantity})}}>ADD TO CART</button>
        </div>
        {self ? <button className='remove-button' onClick={handleRemove}>REMOVE</button> : ''}
        <p className='date-added'>Added {formatDate(date_added)}</p>
      </div>
    </div> 
  );
}
 
export default WishlistDetailCard;