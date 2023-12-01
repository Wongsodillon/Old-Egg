import { useState, useEffect } from 'react';
import { Cart } from "../../types/CartType";
import { addProductToWishlist } from '../../api/WishlistsAPI';
import { removeProductFromCart } from "../../api/CartsAPI";
import AddToWishlistModal from '../Modal/AddToWishlistModal';
import "./CartCard.scss"

interface CartCardProps extends Cart {
  checkout?: boolean;
}

const CartCard = ({ user_id, product_id, product_name, product_price, product_url, quantity, checkout = false }: CartCardProps) => {

  const [addModal, setAddModal] = useState(false)

  const handleRemoveProduct = async (user_id: number, product_id: number) => {
    try {
      console.log(user_id, product_id)
      const response = await removeProductFromCart(user_id, product_id)
      if (response) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addToWishlist = async (wishlist_id: any) => {
    try {
      const result = await addProductToWishlist({ wishlist_id, id: product_id, qty: quantity })
      if (result) {
        handleRemoveProduct(user_id, product_id)
        window.location.reload()
        setAddModal(false)
      }
    } catch {
      console.log('error')
    }
  }

  return ( 
    <>
    <div className={addModal ? `modal` : `none`}>
      <AddToWishlistModal setAddModal={setAddModal} addToWishlist={addToWishlist}/>
    </div>
    <div className="cart-card flex gap-2">
      <img src={product_url} alt="" />
      <div className="content-container flex space-between gap-2 full-width">
        <div className="product-name flex flex-col flex-1 items-start space-between">
          <p>{product_name}</p>
          {!checkout && <div className="flex gap-2">
            <button className="white-button" onClick={() => setAddModal(true)}>MOVE TO WISHLIST</button>
            <button className="white-button">ADD TO SAVE LATER</button>
          </div>}
        </div>
        <div className="price-container flex flex-col items-start space-between">
          <p className="product-price bold">${product_price}</p>
          {!checkout ? (
              <input type="number" className="qty-input" defaultValue={quantity} min={1} />
            ) : (
              <input type="number" className="qty-input" defaultValue={quantity} min={1} readOnly />
          )}
          {!checkout && <button className="white-button" onClick={() => handleRemoveProduct(user_id, product_id)}>REMOVE</button>}
        </div>
      </div>
    </div>
    </>
  );
}
 
export default CartCard;