import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getAddress } from '../api/OthersAPI';
import { useNavigate } from 'react-router-dom';
import "./CheckoutPage.scss"

type Address = {
  id: number
  user_id: number
  title: string
  street: string
  zip_code: string
  city: string
  country: string
}

const CheckoutPage = () => {

  const user = useAuth()

  const navigate = useNavigate()

  const [address, setAddress] = useState<Address[]>([])
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleRadioChange = (index: any) => {
    setSelectedAddress(index);
  };

  const handleSave = () => {
    navigate('/delivery')
  }

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(user).length !== 0) {
        const address = await getAddress(user.id)
        setAddress(address)
      }
    }
    fetchData()
  }, [user])

  return (  
    <div className="checkout-page flex gap-2">
      <div className="shopping-cart flex flex-col items-start flex-1 gap-2">
        <p className='title bold'>1. SHIPPING</p>
        <div className='deliveries flex flex-col items-start gap-0-5'>
          <h3>How would you like to get your order</h3>
          <div className="providers flex full-width gap-1">
            <div className="flex flex-col gap-0-5 items-start ship-to">
              <p>Ship to</p>
              <p className='your-location'>Your Location</p>
            </div>
          </div>
        </div>
        <div className='address-container flex flex-col items-start gap-1-5 full-width'>
          <p className='bold'>Ship to your location</p>
          <button className='white-button'>ADD NEW ADDRESS</button>
          <div className='address-cards grid gap-1 full-width'>
            {address.length && address.map((a, index) => (
              <div key={index} className='address flex flex-col items-start gap-1'>
                <p className='title bold'>
                  <input type="radio" name="addressRadio" className='mr-2 address-radio' checked={selectedAddress === a} onChange={() => handleRadioChange(a)}/>
                  {a.title}
                </p>
                <div className='flex flex-col gap-0-5 items-start'>
                  <p className='street'>{a.street}</p>
                  <p className='street'>{a.zip_code}</p>
                  <p className='street'>{a.city}</p>
                  <p className='street'>{a.country}</p>
                </div>
                <div className="flex gap-1 full-width justify-end">
                  <button className='white-button'>EDIT</button>
                  <button className='white-button'>REMOVE</button>
                </div>
              </div>
            ))}
            {address.length == 0 ?  
              <div className='address flex flex-col items-center justify-center gap-1'>
                <p className='title bold'>You have no address</p>
                <button className='white-button'>ADD NEW ADDRESS</button>
              </div> : ''
            }
          </div>
          <div className='full-width flex justify-end'>
            <button className='orange-button' onClick={handleSave}>SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default CheckoutPage;