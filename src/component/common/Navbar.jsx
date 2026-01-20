import React from 'react';
import Notification from '../../Pages/Notification';
import { Link } from 'react-router-dom';
import img from '../../assets/john.webp';

function Navbar() {
  const userInfo = {
    firstName: 'chima',
    secondName: 'amazue',
     profileImage: {img},
    matricNo: '22010306022',
  };

  const hasUserInfo =
    userInfo.firstName && userInfo.secondName && userInfo.matricNo;

  return (
    <div className="flex justify-between p-9 shadow-2xs items-center bg-blue-100 h-[100px]">
      
      {/* Logo */}
      <div>
        <h4 className="font-semibold text-[20px] text-purple-600">
          Health care system <br />
          <span className="text-sm text-gray-600">
            Smart Healthcare System
          </span>
        </h4>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search doctors & specialities"
        className="w-[500px] p-[10px] h-[30px] bg-white outline-0 border rounded-[7px]"
      />

      {/* Right section */}
      <div className="flex items-center gap-4">
        <button className="bg-red-500 text-white px-3 py-1 rounded active:bg-red-300 cursor-pointer">
          Emergency
        </button>

        <span><Link to = "notification" >🔔</Link></span>

        {/* Profile section */}
        {hasUserInfo && (
          <div className="flex items-center gap-2">
            <img
              // src={userInfo.profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-sm">
              <p>{userInfo.firstName} {userInfo.secondName}</p>
              <p className="text-gray-500">
                Matric-No {userInfo.matricNo}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
