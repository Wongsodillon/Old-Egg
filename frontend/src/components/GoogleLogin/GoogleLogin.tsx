import GoogleLogin from 'react-google-login';
import "./GoogleLogin.scss"

const GoogleLoginComponent = () => {
  const clientID = "854943026104-coh0pgn11jbj8plr35pvkq9psv6r14i0.apps.googleusercontent.com";
  return ( 
    <>
      <GoogleLogin
        className='google'
        clientId={clientID}
        buttonText="SIGN IN WITH GOOGLE"
        isSignedIn={false}
      />
    </>
  );
}
 
export default GoogleLoginComponent;