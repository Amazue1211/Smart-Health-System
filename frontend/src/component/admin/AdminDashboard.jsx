import React, { useState } from 'react';
import { 
  FaTachometerAlt, 
  FaUserMd, 
  FaUsers, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaCog, 
  FaBell,
  FaSearch,
  FaStethoscope,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEllipsisH,
  FaDownload,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaSave,
  FaHospitalUser
} from 'react-icons/fa';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// --- Mock Data ---
const initialDoctors = [
  { id: 1, name: 'Dr. Olivia Bennett', specialty: 'Cardiology', patients: 342, rating: 4.8, status: 'active', email: 'olivia.bennett@healthcare.com', phone: '(555) 123-4567' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'General Medicine', patients: 456, rating: 4.9, status: 'active', email: 'michael.chen@healthcare.com', phone: '(555) 234-5678' },
  { id: 3, name: 'Dr. Sophia Williams', specialty: 'Pediatrics', patients: 289, rating: 4.7, status: 'active', email: 'sophia.williams@healthcare.com', phone: '(555) 345-6789' },
  { id: 4, name: 'Dr. James O\'Connor', specialty: 'Dermatology', patients: 198, rating: 4.9, status: 'on-leave', email: 'james.oconnor@healthcare.com', phone: '(555) 456-7890' },
];

const initialAppointments = [
  { id: 1, patient: 'Eleanor Rodriguez', doctor: 'Dr. Olivia Bennett', date: '2026-04-15', time: '09:00 AM', status: 'confirmed', amount: 150, type: 'in-person' },
  { id: 2, patient: 'Michael Chen', doctor: 'Dr. Michael Chen', date: '2026-04-15', time: '10:30 AM', status: 'waiting', amount: 120, type: 'telehealth' },
  { id: 3, patient: 'Sophia Williams', doctor: 'Dr. Sophia Williams', date: '2026-04-16', time: '01:15 PM', status: 'confirmed', amount: 140, type: 'in-person' },
  { id: 4, patient: 'James O\'Connor', doctor: 'Dr. James O\'Connor', date: '2026-04-17', time: '03:00 PM', status: 'pending', amount: 160, type: 'in-person' },
  { id: 5, patient: 'Emma Thompson', doctor: 'Dr. Emma Thompson', date: '2026-04-18', time: '11:30 AM', status: 'confirmed', amount: 180, type: 'telehealth' },
];

const initialPatients = [
  { id: 1, name: 'Eleanor Rodriguez', age: 58, phone: '(555) 234-7890', email: 'eleanor@example.com', lastVisit: '2026-03-10', status: 'active' },
  { id: 2, name: 'Michael Chen', age: 45, phone: '(555) 345-1234', email: 'michael@example.com', lastVisit: '2026-03-15', status: 'active' },
  { id: 3, name: 'Sophia Williams', age: 62, phone: '(555) 456-7891', email: 'sophia@example.com', lastVisit: '2026-03-20', status: 'active' },
  { id: 4, name: 'James O\'Connor', age: 51, phone: '(555) 567-8901', email: 'james@example.com', lastVisit: '2026-02-28', status: 'inactive' },
  { id: 5, name: 'Emma Thompson', age: 39, phone: '(555) 678-9012', email: 'emma@example.com', lastVisit: '2026-03-25', status: 'active' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [doctors, setDoctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [patients, setPatients] = useState(initialPatients);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'doctor', 'appointment', 'patient'
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [showNotification, setShowNotification] = useState({ show: false, message: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Helper: Show toast notification
  const notify = (message, type = 'success') => {
    setShowNotification({ show: true, message, type });
    setTimeout(() => setShowNotification({ show: false, message: '', type: '' }), 3000);
  };

  // Open modal for add/edit
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      setFormData(item);
    } else {
      if (type === 'doctor') setFormData({ name: '', specialty: '', email: '', phone: '', status: 'active' });
      else if (type === 'appointment') setFormData({ patient: '', doctor: '', date: '', time: '', status: 'pending', amount: 100, type: 'in-person' });
      else if (type === 'patient') setFormData({ name: '', age: '', phone: '', email: '', status: 'active' });
    }
    setShowModal(true);
  };

  // Save handler
  const handleSave = () => {
    if (modalType === 'doctor') {
      if (editingItem) {
        setDoctors(doctors.map(d => d.id === editingItem.id ? { ...formData, id: d.id } : d));
        notify('Doctor updated successfully');
      } else {
        const newId = Math.max(0, ...doctors.map(d => d.id)) + 1;
        setDoctors([...doctors, { ...formData, id: newId, patients: 0, rating: 0 }]);
        notify('Doctor added successfully');
      }
    } else if (modalType === 'appointment') {
      if (editingItem) {
        setAppointments(appointments.map(a => a.id === editingItem.id ? { ...formData, id: a.id } : a));
        notify('Appointment updated successfully');
      } else {
        const newId = Math.max(0, ...appointments.map(a => a.id)) + 1;
        setAppointments([...appointments, { ...formData, id: newId }]);
        notify('Appointment created successfully');
      }
    } else if (modalType === 'patient') {
      if (editingItem) {
        setPatients(patients.map(p => p.id === editingItem.id ? { ...formData, id: p.id } : p));
        notify('Patient updated successfully');
      } else {
        const newId = Math.max(0, ...patients.map(p => p.id)) + 1;
        setPatients([...patients, { ...formData, id: newId }]);
        notify('Patient added successfully');
      }
    }
    setShowModal(false);
    setEditingItem(null);
  };

  // Delete handler
  const handleDelete = (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'doctor') setDoctors(doctors.filter(d => d.id !== id));
      else if (type === 'appointment') setAppointments(appointments.filter(a => a.id !== id));
      else if (type === 'patient') setPatients(patients.filter(p => p.id !== id));
      notify(`${type} deleted successfully`, 'info');
    }
  };

  // Update appointment status
  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
    notify(`Appointment status changed to ${newStatus}`);
  };

  // Export to CSV
  const exportToCSV = (data, filename) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    notify(`Exported ${filename} successfully`);
  };

  // Filtered data
  const filteredDoctors = doctors.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.specialty.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = a.patient.toLowerCase().includes(searchTerm.toLowerCase()) || a.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.email.toLowerCase().includes(searchTerm.toLowerCase()));

  // Stats
  const totalRevenue = appointments.reduce((sum, a) => sum + a.amount, 0);
  const statsCards = [
    { title: 'Total Patients', value: patients.length, change: '+8%', icon: FaUsers, color: 'bg-blue-50', textColor: 'text-blue-700' },
    { title: 'Total Doctors', value: doctors.length, change: '+2', icon: FaUserMd, color: 'bg-emerald-50', textColor: 'text-emerald-700' },
    { title: 'Appointments', value: appointments.length, change: '+15%', icon: FaCalendarAlt, color: 'bg-purple-50', textColor: 'text-purple-700' },
    { title: 'Revenue', value: `$${totalRevenue}`, change: '+12%', icon: FaMoneyBillWave, color: 'bg-amber-50', textColor: 'text-amber-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showNotification.show && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg text-white ${showNotification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}>
            {showNotification.message}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-20">
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-2 rounded-xl">
                <FaStethoscope className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">HealthCare+</h1>
                <p className="text-xs text-gray-500">Admin Portal</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {['overview', 'doctors', 'appointments', 'patients', 'reports', 'settings'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition capitalize ${activeTab === tab ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                {tab === 'overview' && <FaTachometerAlt />}{tab === 'doctors' && <FaUserMd />}{tab === 'appointments' && <FaCalendarAlt />}{tab === 'patients' && <FaUsers />}{tab === 'reports' && <FaChartLine />}{tab === 'settings' && <FaCog />}
                {tab}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-100">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="text-sm font-semibold">Admin User</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab} Dashboard</h2>
            <p className="text-sm text-gray-500">Manage your healthcare system</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <button className="relative p-2 rounded-full hover:bg-gray-100"><FaBell className="text-gray-500" /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span></button>
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">AD</div>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                {statsCards.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex justify-between items-start">
                      <div><p className="text-gray-500 text-sm">{stat.title}</p><p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p><p className="text-xs text-green-600 mt-1">{stat.change} vs last month</p></div>
                      <div className={`${stat.color} p-3 rounded-xl`}><stat.icon className={stat.textColor} /></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-5"><h3 className="font-semibold mb-3">Appointment Trends</h3><ResponsiveContainer width="100%" height={300}><AreaChart data={[{ name: 'Mon', apt: 42 }, { name: 'Tue', apt: 58 }, { name: 'Wed', apt: 65 }, { name: 'Thu', apt: 72 }, { name: 'Fri', apt: 68 }, { name: 'Sat', apt: 35 }]}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Area dataKey="apt" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3} /></AreaChart></ResponsiveContainer></div>
                <div className="bg-white rounded-2xl p-5"><h3 className="font-semibold mb-3">Revenue Overview</h3><ResponsiveContainer width="100%" height={300}><BarChart data={[{ week: 'Week 1', rev: 12500 }, { week: 'Week 2', rev: 14200 }, { week: 'Week 3', rev: 13800 }, { week: 'Week 4', rev: 16500 }]}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="week" /><YAxis /><Tooltip formatter={(v) => `$${v}`} /><Bar dataKey="rev" fill="#0d9488" radius={[8,8,0,0]} /></BarChart></ResponsiveContainer></div>
              </div>
            </>
          )}

          {/* Doctors Tab */}
          {activeTab === 'doctors' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center flex-wrap gap-3">
                <h3 className="font-semibold text-gray-800">Doctor Management</h3>
                <div className="flex gap-2"><button onClick={() => openModal('doctor')} className="bg-teal-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2"><FaPlus /> Add Doctor</button><button onClick={() => exportToCSV(doctors, 'doctors')} className="border border-gray-300 px-4 py-2 rounded-xl text-sm flex items-center gap-2"><FaDownload /> Export</button></div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50"><tr><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Doctor</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Specialty</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Patients</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Rating</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Status</th><th className="px-5 py-3 text-right text-xs font-medium text-gray-500">Actions</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredDoctors.map(doc => (<tr key={doc.id} className="hover:bg-gray-50"><td className="px-5 py-3 text-sm font-medium">{doc.name}</td><td className="px-5 py-3 text-sm">{doc.specialty}</td><td className="px-5 py-3 text-sm">{doc.patients}</td><td className="px-5 py-3 text-sm">⭐ {doc.rating}</td><td className="px-5 py-3"><span className={`text-xs px-2 py-1 rounded-full ${doc.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{doc.status}</span></td><td className="px-5 py-3 text-right"><button onClick={() => openModal('doctor', doc)} className="text-gray-400 hover:text-teal-600 mx-1"><FaEdit /></button><button onClick={() => handleDelete('doctor', doc.id)} className="text-gray-400 hover:text-red-600 mx-1"><FaTrash /></button></td></tr>))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center flex-wrap gap-3">
                <h3 className="font-semibold text-gray-800">Appointment Management</h3>
                <div className="flex gap-2"><select className="border rounded-lg px-3 py-1 text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}><option value="all">All Status</option><option value="confirmed">Confirmed</option><option value="pending">Pending</option><option value="waiting">Waiting</option></select><button onClick={() => openModal('appointment')} className="bg-teal-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2"><FaPlus /> Add Appointment</button><button onClick={() => exportToCSV(appointments, 'appointments')} className="border border-gray-300 px-4 py-2 rounded-xl text-sm"><FaDownload /></button></div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50"><tr><th className="px-5 py-3 text-left text-xs font-medium">Patient</th><th className="px-5 py-3 text-left text-xs font-medium">Doctor</th><th className="px-5 py-3 text-left text-xs font-medium">Date & Time</th><th className="px-5 py-3 text-left text-xs font-medium">Status</th><th className="px-5 py-3 text-left text-xs font-medium">Amount</th><th className="px-5 py-3 text-right text-xs font-medium">Actions</th></tr></thead>
                  <tbody>
                    {filteredAppointments.map(apt => (<tr key={apt.id} className="hover:bg-gray-50"><td className="px-5 py-3 text-sm">{apt.patient}</td><td className="px-5 py-3 text-sm">{apt.doctor}</td><td className="px-5 py-3 text-sm">{apt.date} {apt.time}</td><td className="px-5 py-3"><select value={apt.status} onChange={e => updateAppointmentStatus(apt.id, e.target.value)} className="text-xs border rounded px-2 py-1"><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="waiting">Waiting</option><option value="completed">Completed</option></select></td><td className="px-5 py-3 text-sm">${apt.amount}</td><td className="px-5 py-3 text-right"><button onClick={() => openModal('appointment', apt)} className="text-gray-400 hover:text-teal-600 mx-1"><FaEdit /></button><button onClick={() => handleDelete('appointment', apt.id)} className="text-gray-400 hover:text-red-600 mx-1"><FaTrash /></button></td></tr>))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Patients Tab */}
          {activeTab === 'patients' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center flex-wrap gap-3">
                <h3 className="font-semibold text-gray-800">Patient Management</h3>
                <div className="flex gap-2"><button onClick={() => openModal('patient')} className="bg-teal-600 text-white px-4 py-2 rounded-xl text-sm"><FaPlus /> Add Patient</button><button onClick={() => exportToCSV(patients, 'patients')} className="border border-gray-300 px-4 py-2 rounded-xl text-sm"><FaDownload /></button></div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50"><tr><th className="px-5 py-3 text-left text-xs font-medium">Name</th><th className="px-5 py-3 text-left text-xs font-medium">Age</th><th className="px-5 py-3 text-left text-xs font-medium">Phone</th><th className="px-5 py-3 text-left text-xs font-medium">Email</th><th className="px-5 py-3 text-left text-xs font-medium">Last Visit</th><th className="px-5 py-3 text-right text-xs font-medium">Actions</th></tr></thead>
                  <tbody>
                    {filteredPatients.map(pat => (<tr key={pat.id} className="hover:bg-gray-50"><td className="px-5 py-3 text-sm font-medium">{pat.name}</td><td className="px-5 py-3 text-sm">{pat.age}</td><td className="px-5 py-3 text-sm">{pat.phone}</td><td className="px-5 py-3 text-sm">{pat.email}</td><td className="px-5 py-3 text-sm">{pat.lastVisit}</td><td className="px-5 py-3 text-right"><button onClick={() => openModal('patient', pat)} className="text-gray-400 hover:text-teal-600 mx-1"><FaEdit /></button><button onClick={() => handleDelete('patient', pat.id)} className="text-gray-400 hover:text-red-600 mx-1"><FaTrash /></button></td></tr>))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <FaChartLine className="text-4xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">Analytics Reports</h3>
              <p className="text-gray-500 mb-4">Generate custom reports on appointments, revenue, and patient demographics</p>
              <div className="flex justify-center gap-3"><button className="bg-teal-600 text-white px-4 py-2 rounded-lg">Generate Monthly Report</button><button className="border border-gray-300 px-4 py-2 rounded-lg">Export as PDF</button></div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold mb-4">System Settings</h3>
              <div className="space-y-4 max-w-2xl"><div className="flex justify-between items-center py-3 border-b"><div><p className="font-medium">Clinic Name</p><p className="text-sm text-gray-500">HealthCare+ Medical Center</p></div><button className="text-teal-600 text-sm">Edit</button></div><div className="flex justify-between items-center py-3 border-b"><div><p className="font-medium">Working Hours</p><p className="text-sm text-gray-500">Mon-Fri: 9AM - 6PM, Sat: 10AM - 2PM</p></div><button className="text-teal-600 text-sm">Edit</button></div><div className="flex justify-between items-center py-3 border-b"><div><p className="font-medium">Appointment Duration</p><p className="text-sm text-gray-500">30 minutes per slot</p></div><button className="text-teal-600 text-sm">Edit</button></div></div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center"><h3 className="text-lg font-bold">{editingItem ? 'Edit' : 'Add'} {modalType}</h3><button onClick={() => setShowModal(false)}><FaTimes /></button></div>
            <div className="p-6 space-y-4">
              {modalType === 'doctor' && (<><input type="text" placeholder="Name" className="w-full border rounded-lg p-2" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /><input type="text" placeholder="Specialty" className="w-full border rounded-lg p-2" value={formData.specialty || ''} onChange={e => setFormData({...formData, specialty: e.target.value})} /><input type="email" placeholder="Email" className="w-full border rounded-lg p-2" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} /><input type="text" placeholder="Phone" className="w-full border rounded-lg p-2" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} /><select className="w-full border rounded-lg p-2" value={formData.status || 'active'} onChange={e => setFormData({...formData, status: e.target.value})}><option value="active">Active</option><option value="on-leave">On Leave</option></select></>)}
              {modalType === 'appointment' && (<><input type="text" placeholder="Patient Name" className="w-full border rounded-lg p-2" value={formData.patient || ''} onChange={e => setFormData({...formData, patient: e.target.value})} /><input type="text" placeholder="Doctor Name" className="w-full border rounded-lg p-2" value={formData.doctor || ''} onChange={e => setFormData({...formData, doctor: e.target.value})} /><input type="date" className="w-full border rounded-lg p-2" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} /><input type="text" placeholder="Time (e.g., 09:00 AM)" className="w-full border rounded-lg p-2" value={formData.time || ''} onChange={e => setFormData({...formData, time: e.target.value})} /><input type="number" placeholder="Amount" className="w-full border rounded-lg p-2" value={formData.amount || ''} onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})} /><select className="w-full border rounded-lg p-2" value={formData.status || 'pending'} onChange={e => setFormData({...formData, status: e.target.value})}><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="waiting">Waiting</option><option value="completed">Completed</option></select></>)}
              {modalType === 'patient' && (<><input type="text" placeholder="Full Name" className="w-full border rounded-lg p-2" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /><input type="number" placeholder="Age" className="w-full border rounded-lg p-2" value={formData.age || ''} onChange={e => setFormData({...formData, age: e.target.value})} /><input type="tel" placeholder="Phone" className="w-full border rounded-lg p-2" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} /><input type="email" placeholder="Email" className="w-full border rounded-lg p-2" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} /><select className="w-full border rounded-lg p-2" value={formData.status || 'active'} onChange={e => setFormData({...formData, status: e.target.value})}><option value="active">Active</option><option value="inactive">Inactive</option></select></>)}
            </div>
            <div className="border-t px-6 py-4 flex justify-end gap-3"><button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button><button onClick={handleSave} className="px-4 py-2 bg-teal-600 text-white rounded-lg"><FaSave className="inline mr-1" /> Save</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;