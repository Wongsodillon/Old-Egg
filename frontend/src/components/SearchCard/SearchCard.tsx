import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import { ProductResult } from "../../types/ProductTypes";
import "./SearchCard.scss"

const SearchCard = ({ product }: { product: ProductResult }) => {
  return ( 
    <div className='product-card flex flex-col items-start' key={product.product_id}>
      <img src={product.product_url} alt="" />
      <Rating rating={product.product_rating} rating_count={product.product_rating_count}/>
      <Link style={{ textDecoration: 'none', color: 'inherit'}} to={`/product/${product.product_id}`}>
        <p className='product-name'>{product.product_name}</p>
      </Link>
      <p className='product-price'>{`$${product.product_price.toLocaleString()}`}</p>
      <p className='shipping-price gray-text'>{product.product_shipping_price == 0 ? 'FREE SHIPPING' : `$${product.product_shipping_price} Shipping`}</p>
      <p className="product-shop">{product.product_shop} <Link to={`/shop/${product.product_shop_id}`}>Visit Store</Link></p>
      <button className="view-details-button">VIEW DETAILS</button>
      <label htmlFor="">
        <input type="checkbox" /> Compare
      </label>
      {/* <div className='flex space-between full-width items-center'>
        <button className='add-cart-button'>ADD TO CART</button>
      </div> */}
    </div>  
  );
}
 
export default SearchCard;