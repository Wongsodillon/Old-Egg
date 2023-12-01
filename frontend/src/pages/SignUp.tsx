import React, { useState, useEffect } from 'react';
import "./SignUp.scss"
import { Link, useNavigate } from "react-router-dom"
import { AiFillEyeInvisible, AiFillEye, AiFillQuestionCircle, AiFillCheckCircle } from "react-icons/ai";
import Logo from "../assets/logo.png"
import axios from 'axios';

const SignUp = () => {

  const navigate = useNavigate()

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [visible, setVisible] = useState(false)

  const validatePassword = (password: string) => {
    if (password.length < 8 || password.length > 30) {
      return false
    }
    const hasUpperCase = /[A-Z]/.test(password); 
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    return (
      hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
    );
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    console.log(e.target.firstName.value, e.target.lastName.value, e.target.email.value)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]$/

    if (!e.target.firstName.value || !e.target.lastName.value || !e.target.email.value || !e.target.password.value) {
      setErrorMessage("Must fill all fields")
      setError(true)
      return
      
    }
    else if (!emailRegex.test(e.target.email.value)) {
      setErrorMessage("Invalid Email")
      setError(true)
      return
    }
    else if (phoneRegex.test(e.target.phone.value)) {
      setErrorMessage("Invalid Phone Number")
      setError(true)
      return
    }
    else if (!validatePassword(e.target.password.value)) {
      setErrorMessage("Invalid Password")
      setError(true)
      return
    }
    else {
      const response  = await axios.post('http://localhost:8080/users', {
        name: `${e.target.firstName.value} ${e.target.lastName.value}`,
        first_name: e.target.firstName.value,
        last_name: e.target.lastName.value,
        email: e.target.email.value,
        phone_number: e.target.phone.value,
        password: e.target.password.value,
      })
      console.log(response.data)
      if (response.data == "Email already exists") {
        setErrorMessage("Email already exists")
        setError(true)
        return
      }
      else if (response.data == "Phone number already exists") {
        setErrorMessage("Phone number already exists")
        setError(true)
        return
      }
      else {
        setErrorMessage("Goood")
        setError(true)
        return
      }
    }
    navigate("/login")
  }

  // function createUser() {
  //   console.log(firstName, lastName, email, phone, password)
  //   axios.post('http://localhost:8080/users', {
  //     name: `${firstName} ${lastName}`,
  //     first_name: firstName,
  //     last_name: lastName,
  //     email: email,
  //     phone_number: phone,
  //     password: password,
  //     // banned: false
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   })
  // }

  return ( 
    <div className='signup-page light-gray flex flex-col items-center justify-center'>
      <div className='signup-container flex flex-col items-center justify-center'>
        <img src={Logo} alt="" className='logo'/> 
        <h2>Create Account</h2>
        <p>Shopping for your business? <u>Create a free business account.</u> </p>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
          <input type="text" name="firstName" placeholder="First Name"/>
          <input type="text" name="lastName" placeholder='Last Name'/>
          <input type="text" name="email" placeholder='Email Address'/>
          <div className="form-container">
            <input type="text" name='phone' placeholder='Mobile Phone Number (optional)'/>
            <div>
              <AiFillQuestionCircle/>
            </div>
          </div>
          <div className='form-container'>
            <input type={visible ? "text" : "password"} name='password' placeholder='Password'/>
            <div onClick={() => setVisible(visible ? false : true)}>
              {visible ? <AiFillEye className="eye"/> : <AiFillEyeInvisible className="eye"/>}  
            </div>
          </div>
          {error ? <p>{errorMessage}</p> : ''}
          <div className='checkbox-container flex'>
            <input type="checkbox" name='subscribe' className='subscribe'/>
            <label htmlFor="subscribe">
              Subscribe for exclusive e-mail offers 
              and discounts
            </label>
          </div>
          <button type="submit" className="orange">SIGN UP</button>
          <p>Have an account? <Link to="/login"> Sign In </Link> </p>
        </form>
      </div>
    </div>
  );
}
 
export default SignUp;