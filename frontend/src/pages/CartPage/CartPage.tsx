import { useState, useEffect } from 'react';
import { getCart, removeAll } from '../../api/CartsAPI';
import { Cart } from '../../types/CartType';
import { useAuth } from '../../hooks/useAuth';
import CartCard from '../../components/CartCard/CartCard';
import { useNavigate } from 'react-router-dom';
import "./CartPage.scss"

const CartPage = () => {

  const user = useAuth()
  const [carts, setCarts] = useState<Cart[]>([])

  const [totalPrice, setTotalPrice] = useState(0)
  const [shippingPrice, setShippingPrice] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(user).length !== 0) {
        const cart = await getCart(user.id)
        setCarts(cart)
      }
    }
    fetchData()
  }, [user])

  useEffect(() => {
    let total = 0
    carts.forEach(c => {
      total += c.product_price * c.quantity
    })
    let totalShipping = 0
    carts.forEach(c => {
      totalShipping += c.shipping_price
    })
    setTotalPrice(total)
    setShippingPrice(totalShipping)
  }, [carts])

  const handleRemoveAll = async () => {
    try {
      const response = await removeAll(user.id)
      if (response) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate()
  const handleCheckout = () => {
    navigate('/checkout')
  }

  return (
    <div className="cart-page flex gap-2">
      <div className="shopping-cart flex flex-col items-start flex-1">
        <div className="flex full-width space-between">
          <p className='title'><span className="bold">Shopping Cart</span> {`(${carts.length} Items)`}</p>
          <div className="flex gap-2">
            <button className="white-button">MOVE ALL TO WISHLIST</button>
            <button className="white-button" onClick={handleRemoveAll}>REMOVE ALL</button>
          </div>  
        </div>
        {carts.length === 0 && <div className="cart-card flex flex-col items-start gap-2">
          <p className="bold">Your cart is empty</p>
          <p>Looks like you haven't added anything to your cart yet</p>
          <button className="orange-button">SHOP NOW</button>
        </div>}
        {carts.map((c, index) => {
          return <CartCard {...c} key={index}/>
        })}
      </div>
      <div className="summary flex flex-col items-start gap-1">
        <h2 className="mblock-2">Summary</h2>
        <div className="full-width flex space-between">
          <p className="gray-text">{`Item(s)`}</p>
          <p className="bold">${totalPrice.toLocaleString()}</p>
        </div>
        <div className="full-width flex space-between">
          <p className="gray-text">{`Est Delivery`}</p>
          <p className="bold">${shippingPrice.toLocaleString()}</p>
        </div>
        <div className="flex space-between full-width est-total">
          <p>Est. Total: </p>
          <p className="bold">${(totalPrice + shippingPrice).toLocaleString()}</p>
        </div>
        {carts.length !== 0 && <button className="orange-button full-width" onClick={handleCheckout}>CHECKOUT</button>}
      </div>
    </div>
  );
}
 
export default CartPage;