import { useState, useEffect } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { getOrders } from "../../api/OthersAPI";
import "./Account.scss"

const OrderHistory = () => {

  const user = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if(Object.keys(user).length != 0) {
        const res = await getOrders(user.id)
        console.log(res)
      }
    }
    fetchData()
  }, [user])

  return (  
    <div className="account-page">
      <div className="account-settings flex flex-col items-start full-width gap-0-5">
        <h2 className='account-title'>HI, {user.name}</h2>
        <h2 className='account-title'>ORDER HISTORY</h2>
        <p className='gray-text'>Check the status of your order, review order history, leave a review for your purchases and request a return</p>
      </div>
    </div>
  );
}
 
export default OrderHistory;