import React, { useState, useContext } from "react";
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import GoogleLoginComponent from "../../components/GoogleLogin/GoogleLogin";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import axios, { AxiosError } from "axios"
import "./login.scss"
import { useAuth } from "../../hooks/useAuth";

const Login = () => {

  const navigate = useNavigate()

  const user = useAuth()
  const [visible, setVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    await axios.post('http://localhost:8080/login', { email, password }, { withCredentials: true })
    .then((response) => {
      setErrorMessage('')
      console.log(response)
      // getAuth()
      navigate("/")
    })
    .catch((error: AxiosError) => {
      setErrorMessage(String(error.response?.data))
    })
  }

  return ( 
    <>
      <div className="login-page light-gray flex flex-col items-center justify-center">
        <div className="login-container flex flex-col items-center">
          <img src={logo} alt="Logo" className="logo"/>
          <h2>Sign in</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input type="email" name="email" placeholder="Email Address"/>
              <div className='form-container'>
              <input type={visible ? "text" : "password"} name='password' placeholder='Password'/>
              <div onClick={() => setVisible(visible ? false : true)}>
                {visible ? <AiFillEye className="eye"/> : <AiFillEyeInvisible className="eye"/>}  
              </div>
            </div>
            <button type="submit" className="orange">SIGN IN</button>
            <button className="white"><Link to="/forgotpassword">GET ONE-TIME SIGN IN CODE</Link></button>
            {errorMessage ? <p>{errorMessage}</p> : ''}
          </form>
          <p>What's The One-Time Code</p>
          <p>New to NewEgg?  
            <strong>
              <Link to="/signup">Sign Up</Link>  
            </strong> 
          </p>
          <p className="or">OR</p>
        </div>
        <GoogleLoginComponent/>
      </div>
    </>
  );
}
 
export default Login;