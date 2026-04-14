
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Notfound from './Pages/Notfound'
import DoctorDashboard from './component/doctor/Doctordashboard'
import AdminDashboard from './component/admin/AdminDashboard'
import Notification from './Pages/Notification'
import ViewReports from './component/admin/ViewReports'
import QueueStatus from './component/patients/QueueStatus'
import PatientDashboard from './component/patients/PatientDashbord'
import BookAppointment from './component/doctor/BookAppointment'
import PatientBookAppointment from './component/patients/PatientBookAppointment'
import Consultation from './component/doctor/ConsultationPanel'
import ManageAppointments from './component/doctor/Manageappointment'
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
     <Route path='patientbookappointment' element = {<PatientBookAppointment />} />
     <Route path='admindashboard' element = {<AdminDashboard />} />
     <Route path='consultation' element = {<Consultation />} />
     <Route path='queuestatus' element = {<QueueStatus />} />
      <Route path='register' element = {<Register />} />
      <Route path='viewreports' element = {<ViewReports />} />
      <Route path='patientdashboard' element = {<PatientDashboard />} />
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
