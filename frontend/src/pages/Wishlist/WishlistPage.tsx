import { useState, useEffect } from 'react';
import "./WishlistPage.scss"
import { useAuth } from '../../hooks/useAuth';
import { getMyWishlist, createWishlist } from '../../api/WishlistsAPI';
import { WishlistBody } from '../../types/WishlistTypes';
import WishlistCard from '../../components/WishlistCard/WishlistCard';
import PublicWishlist from './PublicWishlist';
import FollowedLists from './FollowedLists';

const WishlistPage = () => {

  const [activeTab, setActiveTab] = useState(1)
  const [myWishlist, setMyWishlist] = useState<WishlistBody[]>([])
  const [showCreate, setShowCreate] = useState(false)

  const user = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(user).length > 0) {
        const response = await getMyWishlist(user.id)
        setMyWishlist(response)
      }
    }
    fetchData()
  }, [user])

  console.log(myWishlist)

  const handleCreate = async (e: any) => {
    e.preventDefault()
    const name = e.target.wishlist_name.value
    const privacy = e.target.privacy.value
    const id = user.id
    const result = await createWishlist({ id , name, privacy })
    if (result) {
      setShowCreate(false)
      window.location.reload()
    }
  }

  const handleCancel = (e: any) => {
    e.preventDefault()
    setShowCreate(false)
  }

  if (!myWishlist) return (<div>Loading...</div>)

  return ( 
    <>
      <div className={showCreate ? 'modal' : 'none'}>
        <div className='wishlist-modal'>
          <h2 className='modal-title'>Create a list</h2>
          <div className='modal-header flex gap-1'>
            <p className='flex-1'>Wishlist Name</p>
            <p>Privacy</p>
          </div>
          <form className='flex flex-col items-start' onSubmit={handleCreate}>
            <div className='flex full-width gap-1-5'>
              <input type="text" className='input-style flex-1' name="wishlist_name" defaultValue="New Wishlist"/>
              <select name="privacy" id="">
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div className='flex gap-2 full-width justify-end'>
              <button className='white-button' onClick={handleCancel}>CANCEL</button>
              <button className='orange-button'type='submit'>CREATE</button>
            </div>
          </form>
        </div>
      </div>
      <div className="search-header flex flex-col items-start">
        <p className='search-info'>Home - Singapore <span>&gt;</span> <span className='search-keyword'>Wish list</span></p>
        <div className='flex gap-2'>
          <p className='keyword'>WISH LIST</p>
          <div className='full-height'>
            <button className={activeTab == 1 ? 'wishlist-header-button active-button' : 'wishlist-header-button'} onClick={() => setActiveTab(1)}>My Lists</button>
            <button className={activeTab == 2 ? 'wishlist-header-button active-button' : 'wishlist-header-button'} onClick={() => setActiveTab(2)}>Followed Lists</button>
            <button className={activeTab == 3 ? 'wishlist-header-button active-button' : 'wishlist-header-button'} onClick={() => setActiveTab(3)}>Public Lists</button>
          </div>
        </div>
      </div>
      <div className='wishlist-main'>
        {activeTab == 1 ? 
        <>
          <div className='flex gap-1 wishlist-buttons'>
            <button className='white-button' onClick={() => setShowCreate(true)}>CREATE A LIST</button>
            <button className='white-button'>MANAGE LISTS</button>
          </div>
          <div className='my-wishlist-container flex flex-col gap-2 items-start'>
            {myWishlist.map(wishlist => {
              return (
                <WishlistCard wishlist={wishlist}/>
              )
            })}
          </div> 
        </>
        : ''}
        {activeTab == 2 ? <FollowedLists id={user.id}/> : ''}
        {activeTab == 3 ? <PublicWishlist id={user.id}/> : ''}
      </div>
    </>
  );
}
 
export default WishlistPage;