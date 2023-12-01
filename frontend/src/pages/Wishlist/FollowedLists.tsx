import { useState, useEffect } from 'react';
import { getFollowedWishlist } from '../../api/WishlistsAPI';
import { WishlistBody } from '../../types/WishlistTypes';
import WishlistCard from '../../components/WishlistCard/WishlistCard';

const FollowedLists = ({ id } : { id: any }) => {

  const [lists, setLists] = useState<WishlistBody[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFollowedWishlist(id)
      setLists(response)
    }
    fetchData()
  }, [])

  return ( 
    <>
      <div className="my-wishlist-container  flex flex-col gap-2 items-start">
        {lists.map(wishlist => {
          return (
            <WishlistCard wishlist={wishlist} publicList={true}/>
          )
        })}
      </div>
    </>
  );
}
 
export default FollowedLists;