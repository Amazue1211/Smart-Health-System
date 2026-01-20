import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/john.webp';
import Hamburger from 'hamburger-react';
import Bell from '../../assets/icons8-notification.gif';

function Navbar() {
  const userInfo = {
    firstName: 'Chima',
    secondName: 'Amazue',
    profileImage: img,
    matricNo: '22010306022',
    NotificationNum:'0'
  };

  const hasUserInfo =
    userInfo.firstName && userInfo.secondName && userInfo.matricNo;

  return (
    <div className="flex justify-between px-6 lg:px-9 shadow-2xs items-center bg-blue-100 h-[100px]">
      
      {/* Logo */}
      <div>
        <h4 className="text-[20px] font-semibold text-purple-600">
          Health Care System <br />
          <span className="text-sm text-gray-600">
            Smart Healthcare System
          </span>
        </h4>
      </div>

      {/* Search (hidden on phone) */}
      <input
        type="text"
        placeholder="Search doctors & specialities"
        className="hidden lg:block w-[500px] p-[10px] h-[40px] bg-white outline-0 border rounded-[7px]"
      />

      {/* Right section */}
      <div className="flex items-center gap-4">
        
        {/* Emergency (hidden on phone) */}
        <button className="hidden lg:block bg-red-500 text-white px-3 py-1 rounded active:bg-red-300">
          Emergency
        </button>

        {/* Notification (hidden on phone) */}
       <Link to="/notification" className="relative hidden lg:block rounded-2xl ">
  {/* Badge */}
  <span className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
    {userInfo.NotificationNum}
  </span>

  {/* Bell icon */}
  <img
    src={Bell}
    alt="Notifications"
    className="w-6 h-6 cursor-pointer"
  />
</Link>

        {/* Profile */}
        {hasUserInfo && (
          <div className="flex items-center gap-3">
            <img
              src={userInfo.profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* Name & matric (hidden on phone) */}
            <div className="text-sm hidden lg:block">
              <p>{userInfo.firstName} {userInfo.secondName}</p>
              <p className="text-gray-500 text-xs">
                Matric-No {userInfo.matricNo}
              </p>
            </div>

            {/* Hamburger (phone only) */}
            <div className="lg:hidden">
              <Hamburger size={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
