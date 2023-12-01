import { WishlistBody } from "../../types/WishlistTypes";
import { Link } from "react-router-dom";
import "./WishlistCard.scss"

interface WishlistCardProps {
  wishlist: WishlistBody
  publicList?: boolean
  addWishlist?: (id: any) => void
}

const WishlistCard = ({ wishlist, publicList = false,  addWishlist }: WishlistCardProps) => {

  const wishlists = publicList || addWishlist ? wishlist.product_id.slice(0, 4) : wishlist.product_id.slice(0, 5)

  return (  
    <div className='my-wishlist flex flex-col gap-1 items-start' key={wishlist.id}>
      <p className='bold title'>{wishlist.name}</p>
      <div className='wishlist-contents flex space-between full-width gap-2'>
        <div className='wishlist-products flex gap-2'>
          {wishlists.map((product, index) => {
            return (
              <div className="wishlist-product flex flex-col items-start gap-0-5" key={product}>
                <img src={wishlist.product_url[index]} alt="" />
                <p className='product-name'>{wishlist.product_name[index]}</p>
              </div>
            )
          })}
        </div>
        <div className='wishlist-data flex flex-col gap-0-5 items-end'>
          <p>{wishlist.product_id.length} {wishlist.product_id.length == 1 ? 'Item' : "Items"}</p>
          <p className='view-details'>
            {publicList ? 
            <Link style={{ textDecoration: 'none', color: 'inherit'}} to={`/wishlist/${wishlist.id}`}>View Details</Link> : 
            `$ ${wishlist.total_price}`}
          </p>
          {!publicList && wishlist.product_id.length != 0 && !addWishlist ? <p className="view-details"> <Link style={{ textDecoration: 'none', color: 'inherit'}} to="/my-wishlist" state={{ id: wishlist.id }}>View Details</Link> </p> : ''}
          {addWishlist ? <p className="view-details" onClick={() => addWishlist(wishlist.id)}>Add to this Wishlist </p> : ''}
          {publicList ? <p className="wishlist-by">by <span className="bold">{wishlist.user_name}</span></p> : ''}
        </div>
      </div>
    </div>    
  );
}
 
export default WishlistCard;