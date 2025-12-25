import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home'
import Notfound from './Pages/Notfound'
import Notification from './Pages/Notification'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
function App() {
  

  return (
    <>

        <Router>
  <Routes>
   <Route index element={<Home/>}/>
   <Route path='notification' element = {<Notification />} />
   <Route path='*' element = {<Notfound/>} />
 </Routes>
 </Router>
    </>
  )
}

export default App
