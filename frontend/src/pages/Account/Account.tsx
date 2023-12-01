import "./Account.scss"
import { useAuth } from '../../hooks/useAuth';

const Account = () => {

  const user = useAuth()

  if (Object.keys(user).length == 0) {
    return 
    <div>
      <h1>Loading...</h1>
    </div>
  }

  return ( 
    <div className='account-page flex'>
      {/* <div className='account-menus flex flex-col'>
        <h2 className='account-title'>{`HI, ${user.name}`}</h2>
        <div className='menu-container flex flex-col gap-1 items-start full-width'>
          <p className='account-menu'>Orders</p>
          <p className='account-menu'>Order History</p>
          <p className='account-menu'>Return Status / History</p>
          <p className='account-menu'>Marketplace Claim History</p>
        </div>
        <div className='menu-container flex flex-col gap-1 items-start full-width'>
          <p className='account-menu'>Manage Account</p>
          <p className='account-menu'>Account Settings</p>
          <p className='account-menu'>Address Books</p>
          <p className='account-menu'>Payment Options</p>
          <p className='account-menu'>Manage Reviews</p>
        </div>
        <div className='menu-container flex flex-col gap-1 items-start full-width'>
          <p className='account-menu'>Notifications</p>
          <p className='account-menu'>Message Center</p>
          <p className='account-menu'>Email Notifications</p>
          <p className='account-menu'>Auto Notify</p>
          <p className='account-menu'>Price Alerts</p>
        </div>
      </div> */}
      <div className='account-settings flex flex-col items-start full-width gap-0-5'>
        <h2 className="account-title">HI, {user.name}</h2>
        <h2 className='account-title'>ACCOUNT SETTINGS</h2>
        <p className='gray-text'>Control, protect and secure your account.</p>
        <div className='account-information-container full-width flex flex-col items-start gap-0-5'>
          <div className='account-information flex items-center full-width gap-2'>
            <p className='gray-text info-type'>Account Information</p>
            <p className='users-name'>{user.name}</p>
            <button className='edit-add-btn'>EDIT</button>
          </div>
          <p className='user-bottom-info'>{user.email}</p>
          <p className='user-bottom-info'>Display real name</p>
        </div>
        <div className="account-information-container full-width flex flex-col items-start gap-0-5">
          <div className='account-information flex items-center full-width gap-2'>
            <p className='gray-text info-type'>Mobile Number</p>
            <p className='users-name'>{user.phone_number}</p>
            <button className='edit-add-btn'>{user.phone_number.length == 0 ? 'ADD' : 'EDIT'}</button>
          </div>
        </div>
        <div className="account-information-container full-width flex flex-col items-start gap-0-5">
          <div className='account-information flex items-center full-width gap-2'>
            <p className='gray-text info-type'>Password</p>
            <p className='users-name bold'>* * * * * * * * * * * * * * * *</p>
            <button className='edit-add-btn'>EDIT</button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Account;