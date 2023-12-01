import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WishlistDetails } from '../../types/WishlistTypes';
import { getWishlistDetail } from '../../api/WishlistsAPI';
import { addToCart } from '../../api/CartsAPI';
import WishlistDetailCard from '../../components/WishlistDetailCard/WishlistDetailCard';
import { useAuth } from '../../hooks/useAuth';
import { followWishlist, unfollowWishlist, duplicateWishlist } from '../../api/WishlistsAPI';
import "./WishlistDetail.scss"

type UserData = {
  name: string
  user_name: string
  followers: number
  follower_list: number[]
}

const WishlistDetail = () => {

  const { id } = useParams()

  const [wishlists, setWishlists] = useState<WishlistDetails[]>([])
  const [userDetail, setUserDetail] = useState<UserData>()
  const [isFollowing, setIsFollowing] = useState(false)

  const user = useAuth()

  const handleFollow = async () => {
    try {
      const response = await followWishlist(id, user.id)
      console.log(response)
      setIsFollowing(true)
    } catch {
      console.log('error')
    }
  }

  const handleUnfollow = async () => {
    try {
      const response = await unfollowWishlist(id, user.id)
      console.log(response)
      setIsFollowing(false)
    } catch {
      console.log('error')
    }
  }

  const duplicate = async () => {
    try {
      const response = await duplicateWishlist(id, user.id)
      if (response) {
        alert('Wishlist duplicated!')
      }
    }
    catch {
      console.log('error')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWishlistDetail(id)
        setWishlists(response)
        setUserDetail(response[0])
      } catch {
        console.log('error')
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    if (user && userDetail) {
      const followed = userDetail.follower_list.includes(user.id)
      setIsFollowing(followed)
    }
  }, [userDetail, user])


  const handleAddAllToCart = async () => {
    for (let i = 0; i < wishlists.length; i++) {
      try {
        const response = await addToCart({ user_id: user.id, product_id: wishlists[i].product_id, quantity: wishlists[i].quantity })
        if (!response) {
          console.log('error')
          return
        }
      } catch {
        console.log('error')
        return
      }
    }
    alert(`Added ${wishlists[0].name} to cart!`)
    window.location.reload()
  }

  if (!userDetail) return (<div>Loading...</div>)

  return ( 
    <div className='wishlist-detail-page flex gap-2'>
      <div className="wishlist-details flex flex-col items-start gap-1-5">
        <div className='flex flex-col items-start gap-1'>
          <p className='wishlist-name'>{userDetail.name}</p>
          <p className='gray-text'>by <span className='bold black-text'>{userDetail.user_name}</span></p>
          <p className='gray-text'>Followers ({userDetail.followers})</p>
        </div>
        <div className='flex full-width justify-end gap-1'>
          {
            isFollowing ? 
            <button className='white-button' onClick={handleUnfollow}>UNFOLLOW</button> : 
            <button className='white-button' onClick={handleFollow}>FOLLOW</button>
          }
          <button className='white-button' onClick={duplicate}>DUPLICATE</button>
        </div>
        <div className="see-price-cart flex flex-col items-end gap-1">
          <p className='bold'>See Price in Cart</p>
          <button className='orange-button' onClick={() => handleAddAllToCart()}>ADD ALL TO CART</button>
        </div>
      </div>
      <div className='wishlists-wishlists flex flex-col items-start gap-2'>
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
            <WishlistDetailCard wishlist={wishlist}/>
        )})}
      </div>
    </div>  
  );
}
 
export default WishlistDetail;