import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Bin from '../assets/icons8-bin-24.png';
import Navbar from '../component/common/Navbar';
import notificationImg from '../assets/icons8-notification.gif';
import Bagimg from '../assets/miguel-ausejo-vsSu0oGtLoI-unsplash.jpg'
import { img } from 'framer-motion/client';
function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate receiving a new notification every 5 seconds
    const interval = setInterval(() => {
      const newNotif = {
        id: Date.now(), // unique ID
        title: "New Message",
        body: "You have a new message from Dr. Smith.",
        time: new Date().toLocaleTimeString()
      };
      setNotifications(prev => [...prev, newNotif]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Function to remove a notification
  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
 
  <div
  className="flex flex-col items-center text-white  text-2xl space-y-4"
  style={{ backgroundImage: `url(${Bagimg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "fixed" , height: "auto", minHeight: "100vh", scrollBehavior: "smooth" }}
>
      
      <h1>
        Notifications {notifications.length > 0 && `(${notifications.length})`}
      </h1>

     <div>
       <div className='w-full max-w-md mt-6 position-fixed'>
        {notifications.length === 0 && (
          <p className='bg-transparent backdrop-blur-xl  h-[100px] pt-5 pl-5 rounded-2xl mt-4 flex items-center justify-center'>
            <a href="#" className='text-[20px]'>New notifications will appear here.</a>
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
              className='bg-transparent backdrop-blur-xl  pt-5 pl-5 pr-5 cursor-pointer rounded-2xl mt-4 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 m-2'
            >
              <div className='flex justify-between items-start p-[10px]'>
                <div>
                  <h2 className='text-xl font-bold'>{notification.title}</h2>
                  <p className='text-[15px]'>{notification.body}</p>
                  <span className='text-sm text-red-600'>{notification.time}</span>
                </div>
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className='ml-4 text-red-200 font-bold hover:text-red-700'
                >
                  <img src={Bin} alt="Delete" className='w-6 h-6 cursor-pointer' />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
     </div>
    </div>
  );
}

export default Notification;


// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// function Notification() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Simulate receiving a new notification every 5 seconds
//     const interval = setInterval(() => {
//       const newNotif = {
//         id: Date.now(),
//         title: "New Message",
//         body: "You have a new message from Dr. Smith.",
//         time: new Date().toLocaleTimeString(),
//         pinned: false, // default not pinned
//       };
//       setNotifications(prev => [newNotif, ...prev]); // newest on top
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // Dismiss a notification
//   const dismissNotification = (id) => {
//     setNotifications(prev => prev.filter(notif => notif.id !== id));
//   };

//   // Pin/unpin a notification
//   const togglePin = (id) => {
//     setNotifications(prev =>
//       prev
//         .map(notif =>
//           notif.id === id ? { ...notif, pinned: !notif.pinned } : notif
//         )
//         .sort((a, b) => (b.pinned - a.pinned)) // pinned first
//     );
//   };

//   return (
//     <div className='flex flex-col items-center mt-10 text-2xl font-bold space-y-4'>
//       <h1>
//         Notifications {notifications.length > 0 && `(${notifications.length})`}
//       </h1>

//       <div className='w-full max-w-md mt-6'>
//         {notifications.length === 0 && (
//           <p className='bg-blue-100 h-[100px] pt-5 pl-5 rounded-2xl mt-4 flex items-center justify-center'>
//             <a href="#">New notifications will appear here.</a>
//           </p>
//         )}

//         <AnimatePresence>
//           {notifications.map((notification) => (
//             <motion.div
//               key={notification.id}
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//               className={`bg-blue-100 h-[100px] pt-5 pl-5 pr-5 cursor-pointer rounded-2xl mt-4 flex justify-between items-start hover:shadow-2xl transition-shadow duration-300
//                 ${notification.pinned ? 'border-2 border-yellow-400' : ''}`}
//             >
//               <div>
//                 <h2 className='text-xl font-bold'>{notification.title}</h2>
//                 <p>{notification.body}</p>
//                 <span className='text-sm text-gray-600'>{notification.time}</span>
//               </div>
//               <div className='flex flex-col ml-4 space-y-2'>
//                 <button
//                   onClick={() => togglePin(notification.id)}
//                   className='text-yellow-500 font-bold hover:text-yellow-700'
//                 >
//                   {notification.pinned ? 'Unpin' : 'Pin'}
//                 </button>
//                 <button
//                   onClick={() => dismissNotification(notification.id)}
//                   className='text-red-500 font-bold hover:text-red-700'
//                 >
//                   X
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// export default Notification;

