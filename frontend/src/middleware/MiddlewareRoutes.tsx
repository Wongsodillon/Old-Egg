import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"
import Home from '../pages/Home.tsx'
import Navbar from '../components/Navbar/Navbar.tsx'
import Search from '../pages/Search/Search.tsx'
import ShopPage from '../pages/ShopPage/ShopPage.tsx'
import Account from '../pages/Account/Account.tsx'
import WishlistPage from '../pages/Wishlist/WishlistPage.tsx'
import WishlistDetail from '../pages/Wishlist/WishlistDetail.tsx'
import MyWishlist from '../pages/Wishlist/MyWishlist.tsx'
import ProductDetail from '../pages/ProductDetail.tsx'
import CartPage from '../pages/CartPage.tsx'
import CheckoutPage from '../pages/CheckoutPage.tsx'
import DeliveryPage from '../pages/DeliveryPage.tsx'
import OrderHistory from '../pages/Account/OrderHistory.tsx'
import { useAuth } from '../hooks/useAuth.tsx'

const MiddlewareRoutes = () => {

  const user = useAuth()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (user) {
  //     if (Object.keys(user).length === 0) {
  //       navigate('/login')
  //     }
  //   }
  // }, [user])

  return ( 
    <>
      <Navbar></Navbar>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/search/:keyword" element={<Search/>}/>
        <Route path='/shop/:id' element={<ShopPage/>}></Route>
        <Route path='/account' element={<Account/>}></Route>
        <Route path='/wishlists'element={<WishlistPage/>}></Route>
        <Route path='/wishlist/:id' element={<WishlistDetail/>}></Route>
        <Route path='/my-wishlist' element={<MyWishlist/>}></Route>
        <Route path="/product/:id" element={<ProductDetail/>}></Route>
        <Route path='/cart' element={<CartPage/>}></Route>
        <Route path='/checkout' element={<CheckoutPage/>}></Route>
        <Route path='/delivery' element={<DeliveryPage/>}></Route>
        <Route path='/orders' element={<OrderHistory/>}></Route>
      </Routes>
    </>
    
  );
}
 
export default MiddlewareRoutes;