import { useState, useEffect } from 'react';
import { getProviders } from '../../api/OthersAPI';
import { useAuth } from '../../hooks/useAuth';
import { getCart } from '../../api/CartsAPI';
import { Cart } from '../../types/CartType';
import "./DeliveryPage.scss"
import CartCard from '../../components/CartCard/CartCard';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

type DeliveryProvider = {
  id: number
  name: string
  days: number
  multiplier: number
}

const DeliveryPage = () => {

  const user = useAuth()

  const [providers, setProviders] = useState<DeliveryProvider[]>([])
  const [selectedProvider, setSelectedProvider] = useState({} as DeliveryProvider)
  const [cart, setCart] = useState<Cart[]>([])

  const [shippingPrice, setShippingPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  
  useEffect(() => {
    const fetchData = async () => {
      const providers = await getProviders()
      setProviders(providers)
      setSelectedProvider(providers[0])
    }
    const fetchCart = async () => {
      if (Object.keys(user).length !== 0) {
        const cart = await getCart(user.id)
        setCart(cart)
      }
    }
    fetchData()
    fetchCart()
  }, [user])

  useEffect(() => {
    let totalShipping = 0
    let totalPrice = 0
    cart.forEach(c => {
      totalShipping += c.shipping_price
      totalPrice += c.product_price * c.quantity
    })
    setShippingPrice(totalShipping)
    setTotalPrice(totalPrice)
  }, [cart])

  return (  
    <div className="checkout-page flex gap-2">
      <div className="shopping-cart flex flex-col items-start flex-1 gap-2">
        <p className='title bold'>2. DELIVERY</p>
        <div className='deliveries flex flex-col items-start gap-1'>
          <h3>How soon would you like to receive your order?</h3>
          <div className="providers grid full-width gap-1">
            {providers.map((p) => {
              return (
                <div className={p == selectedProvider ? "delivery-card active" : "delivery-card"} onClick={() => setSelectedProvider(p)}>
                  <div className='flex flex-col items-start gap-0-25'>
                    <p>{p.name}</p>
                    <p>{p.days}-{p.days+2} Business Days</p>
                  </div>
                  {shippingPrice == 0 ?  
                    <h3 className='delivery-price bold'>FREE</h3> :   
                    <h3 className='delivery-price bold'>${(shippingPrice * p.multiplier).toLocaleString()}</h3>
                  }
                </div>
              )})}
          </div>
        </div>
        {cart.map(c => {
          return <CartCard {...c} checkout={true} />
        })}
      </div>
      <OrderSummary totalPrice={totalPrice} shippingPrice={shippingPrice} selectedProvider={selectedProvider}/>
    </div>
  );
}
 
export default DeliveryPage;