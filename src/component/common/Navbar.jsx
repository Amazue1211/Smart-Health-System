import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-between p-9 shadow-2xs align-middle bg-blue-100 h-[100px]' >
    <div>
          <h4>Health care system <br />
    <span>Smart Healthcare System</span>
      </h4>
    </div>

    <input type="text" placeholder='search doctors specialities ' className='w-[500px] p-[10px] h-[30px]  bg-white outline-0 border  ' />

   <div>
     <button>
        Emergency
    </button>

    <span>
       🔔 
    </span>

    <div>
<img src="" alt="" />
<span>first name</span> <span>second name</span> <span>patien ID </span>
    </div>
   </div>
    </div>
  )
}

export default Navbar
