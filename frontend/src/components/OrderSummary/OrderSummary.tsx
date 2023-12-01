import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { removeAll } from '../../api/CartsAPI';
import "./OrderSummary.scss"
import { useAuth } from '../../hooks/useAuth';

type DeliveryProvider = {
  id: number
  name: string
  days: number
  multiplier: number
}


interface OrderSummaryProps {
  totalPrice: number;
  shippingPrice: number;
  selectedProvider: DeliveryProvider
}

const OrderSummary = ({ totalPrice, shippingPrice, selectedProvider }: OrderSummaryProps) => {

  const user = useAuth()

  const navigate = useNavigate()

  const handleCheckout = async () => {
    try {
      const result = await removeAll(user.id)
      if (result) {
        navigate('/')
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const deliveryPrice = shippingPrice === 0 ? 0 : shippingPrice * selectedProvider.multiplier;

  if (Object.keys(user).length == 0) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (  
    <div className="order-summary flex flex-col items-start gap-1">
      <h2 className="mblock-2">Order Summary</h2>
      <div className="full-width flex space-between">
        <p className="gray-text">{`Item(s)`}</p>
        <p className="bold">${totalPrice.toLocaleString()}</p>
      </div>
      <div className="full-width flex space-between">
        <p className="gray-text">{`Delivery`}</p>
        <p className="bold">${deliveryPrice.toLocaleString()}</p>
      </div>
      <div className="flex space-between full-width est-total">
        <h2>Total:</h2>
        <h2 className="bold">${(totalPrice + deliveryPrice).toLocaleString()}</h2>
      </div>
      <button className="orange-button full-width" onClick={handleCheckout}>SAVE</button>
    </div>
  );
}
 
export default OrderSummary;