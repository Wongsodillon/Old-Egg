import { ProductResult } from "../../types/ProductTypes";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import "./ShopCard.scss" 

const ShopCard = ({ product }: { product: ProductResult }) => {
  return ( 
    <div className='product-card flex flex-col items-start' key={product.product_id}>
      <img src={product.product_url} alt="" />
      <div className="flex space-between full-width">
        <Rating rating={product.product_rating} rating_count={product.product_rating_count}/>
      </div>
      <Link style={{ textDecoration: 'none', color: 'inherit'}} to={`/product/${product.product_id}`}>
        <p className='product-name'>{product.product_name}</p>
      </Link>
      <p className='product-price'>{`$${product.product_price.toLocaleString()}`}</p>
      <p className='shipping-price gray-text'>{product.product_shipping_price == 0 ? 'FREE SHIPPING' : `Shipping: $${product.product_shipping_price}`}</p>
      <div className='flex space-between full-width items-center'>
        <label htmlFor="">
          <input type="checkbox" /> Compare
        </label>
        <button className='add-cart-button'>ADD TO CART</button>
      </div>
    </div>  
  );
}
 
export default ShopCard