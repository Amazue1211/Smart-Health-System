
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Notfound from './Pages/Notfound'
import DoctorDashboard from './component/doctor/Doctordashboard'
import Notification from './Pages/Notification'
import BookAppointment from './component/patients/BookAppointment'
import Consultation from './component/doctor/ConsultationPanel'
import ManageAppointments from './component/doctor/Manageappointment'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Register from './Pages/Register'
function App() {
  

  return (
    <>

        <Router>
  <Routes>
   <Route index element={<Home/>}/>
   <Route path='notification' element = {<Notification />} />
     <Route path='login' element = {<Login />} />
     <Route path='consultation' element = {<Consultation />} />
      <Route path='register' element = {<Register />} />
        <Route path='bookappointment' element = {<BookAppointment />} />
      <Route path='doctordashboard' element = {<DoctorDashboard />} />
      <Route path='manageappointments' element = {<ManageAppointments />} />
   <Route path='*' element = {<Notfound/>} />
 </Routes>
 </Router>
    </>
  )
}

export default App
