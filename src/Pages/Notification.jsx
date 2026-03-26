import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Bin from '../assets/icons8-bin-24.png';
import Navbar from '../component/common/Navbar';
import Bagimg from '../assets/miguel-ausejo-vsSu0oGtLoI-unsplash.jpg';

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate receiving a new notification every 5 seconds
    const interval = setInterval(() => {
      const newNotif = {
        id: Date.now(),
        title: "New Message",
        body: "You have a new message from Dr. Smith.",
        time: new Date().toLocaleTimeString()
      };
      setNotifications(prev => [newNotif, ...prev]); // newest on top
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <div
      className="flex flex-col items-center text-white text-2xl space-y-4"
      style={{
        backgroundImage: `url(${Bagimg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        scrollBehavior: "smooth"
      }}
    >
      <Navbar /> {/* optional Navbar */}
      <h1 className="mt-6">
        Notifications {notifications.length > 0 && `(${notifications.length})`}
      </h1>

      <div className="w-full max-w-md mt-6">
        {notifications.length === 0 && (
          <p className="bg-white/10 backdrop-blur-xl h-[100px] pt-5 pl-5 rounded-2xl mt-4 flex items-center justify-center">
            <span className="text-[20px]">New notifications will appear here.</span>
          </p>
        )}

        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-xl pt-5 pl-5 pr-5 cursor-pointer rounded-2xl mt-4 flex justify-between items-start hover:shadow-2xl transition-shadow duration-300"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{notification.title}</h2>
                  <div className="bg-green-600 rounded-full h-[7px] w-[7px]"></div>
                </div>
                <p className="text-[15px]">{notification.body}</p>
                <span className="text-sm text-red-600">{notification.time}</span>
              </div>
              <button
                onClick={() => dismissNotification(notification.id)}
                className="ml-4 text-red-200 font-bold hover:text-red-700"
              >
                <img src={Bin} alt="Delete" className="w-6 h-6" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Notification;