
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Notfound from './Pages/Notfound'
import Notification from './Pages/Notification'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Register from './Pages/Register'
function App() {
  

  return (
    <>

        <Router>
  <Routes>
   <Route index element={<Login/>}/>
   <Route path='notification' element = {<Notification />} />
     <Route path='login' element = {<Login />} />
      <Route path='register' element = {<Register />} />
   <Route path='*' element = {<Notfound/>} />
 </Routes>
 </Router>
    </>
  )
}

export default App
