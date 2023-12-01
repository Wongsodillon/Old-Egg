import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getMyWishlist, addProductToWishlist } from '../api/WishlistsAPI';
import { WishlistBody } from '../types/WishlistTypes';
import { IoClose } from "react-icons/io5";
import WishlistCard from "./WishlistCard/WishlistCard";

interface Props {
  setAddModal: (value: boolean) => void;
  addToWishlist: (wishlist_id: any) => void;
}

const AddToWishlistModal = ({ setAddModal, addToWishlist }: Props) => {

  const user = useAuth()
  const [myWishlist, setMyWishlist] = useState<WishlistBody[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(user).length > 0) {
        const wishlists = await getMyWishlist(user.id)
        setMyWishlist(wishlists)
      }
    }
    fetchData()
  }, [user])

  return (  
    <div className='wishlist-modal'>
      <div className='flex space-between full-width'>
        <h2 className='modal-title'>Add to Wishlist</h2>
          <IoClose size={40} className='pointer' onClick={() => setAddModal(false)}/>
      </div>
      {myWishlist.map((w) => {
        return (
          <WishlistCard wishlist={w} addWishlist={addToWishlist}/>
      )})}
    </div>
  );
}
 
export default AddToWishlistModal;