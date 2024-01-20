import { useState, useEffect } from 'react';
import { FaBars, FaUser, FaSearch } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { IoIosNotificationsOutline, IoIosArrowDown } from "react-icons/io";
import { ImLocation2 } from "react-icons/im";
import Switch from "../Switch/Switch";
import Logo from "../../assets/logo.png"
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate, Link, useFetcher } from "react-router-dom";
import "../../style.scss"
import "./Navbar.scss"

const Navbar = () => {
  
  let iconSize = 25;
  const navigate = useNavigate()
  const [location, setLocation] = useState('Singapore')
  let user = useAuth()
  const handleSearch = (e: any) => {
    e.preventDefault()
    navigate(`/search/${e.target.search.value}`)
    e.target.search.value = ''
  }

  const handleGuest = () => {
    if (Object.keys(user).length == 0) {
      navigate("/login")
    }
  }

  const logout = async () => {
    try {
      await axios.get("http://localhost:8080/logout", { withCredentials: true });
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return ( 
    <div className="navbar flex flex-col">
      <div className="top-navbar flex items-center">
        <FaBars size={iconSize} className="icon"/>
        <img src={Logo} className="logo" onClick={() => navigate("/")}/>
        <div className="info-container flex items-center">
          <ImLocation2 size={iconSize} className="icon"/>
          <div className="flex flex-col items-start">
            <p className="info-title">Deliver to</p>
            <p className="info">{location}</p>
          </div>
        </div>
        <form onSubmit={handleSearch}>
            <div className="flex search-bar">
              <input type="text" name="search" placeholder="Search" />
              <div className="flex items-center justify-center">
                <FaSearch size={20} className="search-icon"></FaSearch>
              </div>
            </div>
        </form>
        <IoIosNotificationsOutline size={30} className="icon"/>
        <Switch/>
        <div className="dropdown">
          <div className="info-container flex items-center pointer" onClick={handleGuest}>
            <FaUser size={iconSize} className="icon"/>
            <div className="flex flex-col items-start">
              <p className="info-title">Welcome</p>
              <p className="info name">{Object.keys(user).length === 0 ? `Sign in / Up` : `${user.name}`}</p>
            </div>
            <IoIosArrowDown/>
          </div>
          <div className="dropdown-content flex-col">
            <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/account'>
              <p className="dropdown-item">Account</p>
            </Link>
            <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/orders'>
              <p className="dropdown-item">Orders</p>
            </Link>
            <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/wishlists'>
              <p className="dropdown-item">Wishlist</p>
            </Link>
            {Object.keys(user).length != 0 && <p className="dropdown-item pointer" onClick={logout}>Sign Out</p>}
          </div>
        </div>
        <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/cart' >
          <div className="info-container flex items-center">
            <div className="flex flex-col items-start">
              <p className="info-title">Returns</p>
              <p className="info">& Orders</p>
            </div>
            <BsCart3 size={iconSize} className="icon"/>
          </div>
        </Link>
      </div>
      <div className="bottom-navbar flex space-between items-center">
        <div className="bottom-left">
          <p>Free Shipping</p>
          <p>Today's best deals</p>
          <p>RTX 4070 Ti Series</p>
          <p>New: Intel i9-13900KS</p>
          <p>RTX 4090 Series</p>
          <p>RTX 4080 Series</p>
          <p>ASRock RX 6700 XT</p>
          <p>Build a PC</p>
        </div>
      </div>
    </div>
  );
}
 
export default Navbar;