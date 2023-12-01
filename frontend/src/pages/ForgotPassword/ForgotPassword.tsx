import Logo from "../../assets/logo.png"
import "./ForgotPassword.scss"
import "../../style.scss"

const ForgotPassword = () => {
  return ( 
    <div className='forgot-password-page light-gray flex items-center justify-center'>
      <div className='forgot-password-container flex flex-col items-center justify-center'>
        <img src={Logo} alt="" className='logo'/> 
        <h2>Sign in Assistance</h2>
        <p>Enter the email address and we will send you a verification code for you to enter before creating a new password.</p>
        <form action="" className='flex flex-col items-center'>
          <input type="text" placeholder='Email Address'/>
          <button className='orange'>REQUEST VERIFICATION CODE</button>
          <p>Need Help? <u>Contact Customer Service</u> </p>
        </form>
      </div>
    </div>
  );
}
 
export default ForgotPassword;