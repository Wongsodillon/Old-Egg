import './style.scss'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login&SignUp/Login.tsx"
import SignUp from "./pages/Login&SignUp/SignUp.tsx"
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.tsx'
import MiddlewareRoutes from './middleware/MiddlewareRoutes.tsx'
import Home from './pages/Home/Home.tsx'
import Navbar from './components/Navbar/Navbar.tsx'
import Search from './pages/Search/Search.tsx'
import ShopPage from './pages/ShopPage/ShopPage.tsx'
import Account from './pages/Account/Account.tsx'
import WishlistPage from './pages/Wishlist/WishlistPage.tsx'
import WishlistDetail from './pages/Wishlist/WishlistDetail.tsx'
import MyWishlist from './pages/Wishlist/MyWishlist.tsx'
import ProductDetail from './pages/ProductDetail/ProductDetail.tsx'
import CartPage from './pages/CartPage/CartPage.tsx'

function App() {

  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/*" element={<MiddlewareRoutes/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
