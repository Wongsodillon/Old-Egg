import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { WishlistDetails } from '../../types/WishlistTypes';
import { getWishlistDetail, removeProduct } from '../../api/WishlistsAPI';
import WishlistDetailCard from '../../components/WishlistDetailCard/WishlistDetailCard';
import { addToCart } from '../../api/CartsAPI';
import { useAuth } from '../../hooks/useAuth';
import "./MyWishlist.scss"

const MyWishlist = () => {

  const { id } = useLocation().state
  const user = useAuth()
  const [wishlists, setWishlists] = useState<WishlistDetails[]>([])
  const [privacy, setPrivacy] = useState(false)
  const [wishlistName, setWishlistName] = useState('')
  const [subtotal , setSubtotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWishlistDetail(id)
        setWishlists(response)
        setPrivacy(response[0].privacy)
        setWishlistName(response[0].name)
      } catch {
        console.log('error')
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    let total = 0
    let items = 0
    wishlists.forEach(w => {
      total += (w.product_price * w.quantity)
      items += w.quantity
    })
    setSubtotal(total)
    setItemCount(items)
  }, [wishlists])

  const handleAddAllToCart = async () => {
    for (let i = 0; i < wishlists.length; i++) {
      try {
        const response = await addToCart({ user_id: user.id, product_id: wishlists[i].product_id, quantity: wishlists[i].quantity })
        if (response) {
          await removeProduct(wishlists[i].id, wishlists[i].product_id)
        }
      } catch {
        console.log('error')
        return
      }
    }
    alert(`Added ${wishlists[0].name} to cart!`)
    window.location.reload()
  }

  return ( 
    <div className="wishlist-detail-page flex gap-2">
      <div className="my-wishlist-details flex flex-col items-start gap-1-5">
        <div className='flex flex-col items-start gap-1 full-width'>
          <p className='wishlist-name'>{wishlistName}</p>
          <div className='flex items-center space-between full-width'>
            <p>{privacy}</p>
            <button className='white-button'>SETTINGS</button>
          </div>
        </div>
        <div className="see-price-cart flex flex-col items-end gap-1">
          <p className=''>{`Subtotal (${itemCount} items): `} <span className='bold'>${subtotal.toLocaleString()}</span></p>
          <button className='add-cart' onClick={() => handleAddAllToCart()}>ADD ALL TO CART</button>
        </div>
      </div>
      <div className="wishlists-wishlists flex flex-col items-start gap-2">
        <div className='wishlist-settings flex items-center space-between full-width'>
          <div className="wishlist-settings-left flex items-center gap-2">
            <p><span className='bold'>{wishlists.length}</span> Items</p>
            <div className='flex items-center gap-0-5'>
              <p className='bold'>Sort By:</p>
              <select name="" id="">
                <option value="">Create Date</option>
              </select>
            </div>
            <div className='flex items-center gap-0-5'>
              <p className='bold'>Sold By:</p>
              <select name="" id="">
                <option value="">All Sellers</option>
              </select>
            </div>
          </div>
        </div>
        {wishlists.map(wishlist => {
          return (
              <WishlistDetailCard wishlist={wishlist} self={true}/>
          )})}
        <div className='see-price-cart justify-end flex items-center gap-1'>
          <p className=''>{`Subtotal (${itemCount} items): `} <span className='bold'>${subtotal.toLocaleString()}</span></p>
          <button className='add-cart'>ADD ALL TO CART</button>
        </div>
      </div>
    </div>
  );
}
 
export default MyWishlist;