import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaUserMd, 
  FaPrescriptionBottle, 
  FaFlask, 
  FaHeartbeat, 
  FaClock, 
  FaMapMarkerAlt,
  FaChevronRight,
  FaDownload,
  FaBell,
  FaSearch,
  FaStethoscope,
  FaSyringe,
  FaFileMedical,
  FaHospitalUser,
  FaChartLine
} from 'react-icons/fa';
import { format, addDays, isToday, isPast } from 'date-fns';
// import { Link } from 'lucide-react';

// Mock patient data
const patientProfile = {
  name: 'Eleanor Rodriguez',
  age: 58,
  bloodType: 'O+',
  allergies: ['Penicillin', 'Sulfa drugs'],
  chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
  nextAppointment: {
    doctor: 'Dr. Olivia Bennett',
    specialty: 'Cardiology',
    date: addDays(new Date(), 2),
    time: '10:30 AM',
    location: 'Downtown Medical Center',
    type: 'in-person'
  }
};

// Upcoming appointments
const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Olivia Bennett', specialty: 'Cardiology', date: addDays(new Date(), 2), time: '10:30 AM', location: 'Downtown Medical Center', status: 'confirmed' },
  { id: 2, doctor: 'Dr. Michael Chen', specialty: 'General Medicine', date: addDays(new Date(), 7), time: '02:00 PM', location: 'Westside Clinic', status: 'pending' },
];

// Past appointments
const pastAppointments = [
  { id: 3, doctor: 'Dr. Sophia Williams', specialty: 'Pediatrics', date: '2026-03-15', time: '11:00 AM', diagnosis: 'Wellness check', notes: 'Growth normal' },
  { id: 4, doctor: 'Dr. James O\'Connor', specialty: 'Dermatology', date: '2026-02-28', time: '09:30 AM', diagnosis: 'Eczema', notes: 'Prescribed cream' },
];

// Prescriptions
const prescriptions = [
  { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', refillsLeft: 2, expiryDate: '2026-08-15' },
  { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily with meals', refillsLeft: 3, expiryDate: '2026-09-01' },
  { id: 3, name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at night', refillsLeft: 1, expiryDate: '2026-07-20' },
];

// Lab results
const labResults = [
  { id: 1, test: 'Complete Blood Count (CBC)', date: '2026-03-10', status: 'normal', result: 'All values within range', pdf: true },
  { id: 2, test: 'Lipid Panel', date: '2026-03-10', status: 'abnormal', result: 'LDL slightly elevated (135 mg/dL)', pdf: true },
  { id: 3, test: 'HbA1c', date: '2026-03-10', status: 'normal', result: '6.2% - Controlled', pdf: true },
];

// Health metrics (vitals history)
const vitalsHistory = [
  { date: 'Jan', systolic: 135, diastolic: 85, weight: 72 },
  { date: 'Feb', systolic: 138, diastolic: 87, weight: 71.5 },
  { date: 'Mar', systolic: 132, diastolic: 84, weight: 71 },
  { date: 'Apr', systolic: 130, diastolic: 82, weight: 70.5 },
];

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Helper to format date
  const formatDate = (date) => {
    if (typeof date === 'string') return date;
    return format(date, 'MMM d, yyyy');
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    if (status === 'confirmed') return 'bg-emerald-100 text-emerald-700';
    if (status === 'pending') return 'bg-amber-100 text-amber-700';
    if (status === 'completed') return 'bg-gray-100 text-gray-700';
    return 'bg-blue-100 text-blue-700';
  };

  const getLabStatusBadge = (status) => {
    return status === 'normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  // Stats cards data
  const stats = [
    { title: 'Upcoming Appointments', value: upcomingAppointments.length, icon: FaCalendarAlt, color: 'bg-blue-50', textColor: 'text-blue-700' },
    { title: 'Active Prescriptions', value: prescriptions.length, icon: FaPrescriptionBottle, color: 'bg-emerald-50', textColor: 'text-emerald-700' },
    { title: 'Lab Reports', value: labResults.length, icon: FaFlask, color: 'bg-purple-50', textColor: 'text-purple-700' },
    { title: 'Completed Visits', value: pastAppointments.length, icon: FaUserMd, color: 'bg-teal-50', textColor: 'text-teal-700' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Logo and brand */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-2 rounded-xl shadow-md">
                <FaStethoscope className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">HealthCare+</h1>
                <p className="text-xs text-gray-500 -mt-1">Patient Portal</p>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search appointments, prescriptions, or doctors..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Patient profile and actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <FaBell className="text-gray-500 text-lg" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-700">{patientProfile.name}</p>
                  <p className="text-xs text-gray-500">Patient ID: P-10234</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-white font-semibold shadow-md">
                  ER
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome back, Eleanor</h2>
          <p className="text-gray-500 text-sm flex items-center gap-2 mt-0.5">
            <FaCalendarAlt className="text-teal-500 text-xs" /> {format(new Date(), 'EEEE, MMM d, yyyy')}
            <span className="text-gray-300">•</span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Profile updated just now</span>
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 card-hover transition-all hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className={`${stat.textColor} text-xl`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Appointment Highlight Card */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-lg p-5 mb-8 text-white">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <FaCalendarAlt className="text-2xl" />
              </div>
              <div>
                <p className="text-teal-100 text-sm font-medium">Next Appointment</p>
                <h3 className="text-xl font-bold">{patientProfile.nextAppointment.doctor}</h3>
                <p className="text-teal-100 text-sm">{patientProfile.nextAppointment.specialty}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{format(patientProfile.nextAppointment.date, 'MMM d')}</p>
              <p className="text-teal-100">{patientProfile.nextAppointment.time}</p>
              <p className="text-xs text-teal-200 flex items-center gap-1 justify-end"><FaMapMarkerAlt /> {patientProfile.nextAppointment.location}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="bg-white text-teal-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition">Reschedule</button>
            <button className="bg-teal-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-teal-400 transition">Join Telehealth</button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-3 text-sm font-medium flex items-center gap-2 transition whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-teal-600 text-teal-700 bg-teal-50/30' : 'text-gray-500 hover:text-gray-700'}`}
            ><FaHeartbeat /> Health Overview</button>
            <button 
              onClick={() => setActiveTab('appointments')}
              className={`px-5 py-3 text-sm font-medium flex items-center gap-2 transition whitespace-nowrap ${activeTab === 'appointments' ? 'border-b-2 border-teal-600 text-teal-700 bg-teal-50/30' : 'text-gray-500 hover:text-gray-700'}`}
            ><FaCalendarAlt /> Appointments</button>
            <button 
              onClick={() => setActiveTab('prescriptions')}
              className={`px-5 py-3 text-sm font-medium flex items-center gap-2 transition whitespace-nowrap ${activeTab === 'prescriptions' ? 'border-b-2 border-teal-600 text-teal-700 bg-teal-50/30' : 'text-gray-500 hover:text-gray-700'}`}
            ><FaPrescriptionBottle /> Prescriptions</button>
            <button 
              onClick={() => setActiveTab('labs')}
              className={`px-5 py-3 text-sm font-medium flex items-center gap-2 transition whitespace-nowrap ${activeTab === 'labs' ? 'border-b-2 border-teal-600 text-teal-700 bg-teal-50/30' : 'text-gray-500 hover:text-gray-700'}`}
            ><FaFlask /> Lab Results</button>
          </div>

          <div className="p-5">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Health Metrics Chart Placeholder */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><FaChartLine className="text-teal-600" /> Blood Pressure Trends</h3>
                  <div className="bg-gray-50 rounded-xl p-4 h-48 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <p className="text-sm">BP Trend Chart (Last 4 months)</p>
                      <div className="flex gap-4 mt-3 text-xs">
                        {vitalsHistory.map((v, i) => (
                          <div key={i} className="text-center">
                            <div className="bg-teal-100 rounded-full h-16 w-8 mx-auto relative">
                              <div className="absolute bottom-0 bg-teal-500 rounded-full w-8" style={{ height: `${v.systolic / 2}px` }}></div>
                            </div>
                            <p className="mt-1">{v.date}</p>
                            <p className="text-teal-700">{v.systolic}/{v.diastolic}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Info & Allergies */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Personal Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Age:</span> {patientProfile.age} years</p>
                      <p><span className="text-gray-500">Blood Type:</span> {patientProfile.bloodType}</p>
                      <p><span className="text-gray-500">Chronic Conditions:</span> {patientProfile.chronicConditions.join(', ')}</p>
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4">
                    <h4 className="font-medium text-red-700 mb-2">Allergies</h4>
                    <p className="text-sm text-red-600">{patientProfile.allergies.join(', ')}</p>
                  </div>
                </div>

                {/* Recent Prescriptions Summary */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Active Prescriptions</h3>
                  <div className="space-y-2">
                    {prescriptions.slice(0, 2).map(pres => (
                      <div key={pres.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium">{pres.name} {pres.dosage}</p>
                          <p className="text-xs text-gray-500">{pres.frequency} • {pres.refillsLeft} refills left</p>
                        </div>
                        <button className="text-teal-600 text-sm">Request Refill</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><FaCalendarAlt className="text-teal-600" /> Upcoming Appointments</h3>
                  {upcomingAppointments.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">No upcoming appointments</p>
                  ) : (
                    <div className="space-y-3">
                      {upcomingAppointments.map(apt => (
                        <div key={apt.id} className="flex flex-wrap justify-between items-center p-4 border border-gray-100 rounded-xl hover:shadow-sm transition">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                              <FaUserMd />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{apt.doctor}</p>
                              <p className="text-sm text-gray-500">{apt.specialty}</p>
                              <p className="text-xs text-gray-400 flex items-center gap-1"><FaMapMarkerAlt /> {apt.location}</p>
                            </div>
                          </div>
                          <div className="text-right mt-2 sm:mt-0">
                            <p className="font-medium">{formatDate(apt.date)}</p>
                            <p className="text-sm text-gray-500">{apt.time}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadge(apt.status)}`}>{apt.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Past Appointments</h3>
                  <div className="space-y-3">
                    {pastAppointments.map(apt => (
                      <div key={apt.id} className="flex flex-wrap justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-800">{apt.doctor} - {apt.specialty}</p>
                          <p className="text-sm text-gray-500">{apt.diagnosis}</p>
                          <p className="text-xs text-gray-400">{apt.notes}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{apt.date} at {apt.time}</p>
                          <button className="text-teal-600 text-xs mt-1">View Summary</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Prescriptions Tab */}
            {activeTab === 'prescriptions' && (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Current Medications</h3>
                  <button className="text-teal-600 text-sm flex items-center gap-1"><FaPrescriptionBottle /> Request New Prescription</button>
                </div>
                <div className="space-y-3">
                  {prescriptions.map(pres => (
                    <div key={pres.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <p className="font-bold text-gray-800">{pres.name} <span className="font-normal text-gray-500">{pres.dosage}</span></p>
                          <p className="text-sm text-gray-600">{pres.frequency}</p>
                          <p className="text-xs text-gray-400 mt-1">Refills left: {pres.refillsLeft} • Expires: {pres.expiryDate}</p>
                        </div>
                        <button className="bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm hover:bg-teal-100 transition">Request Refill</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
                  <strong>Pharmacy Info:</strong> Your prescriptions are available at CVS Pharmacy (Main St). Call (555) 123-4567 for delivery.
                </div>
              </div>
            )}

            {/* Lab Results Tab */}
            {activeTab === 'labs' && (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Recent Lab Reports</h3>
                  <button className="text-teal-600 text-sm flex items-center gap-1"><FaDownload /> Download All</button>
                </div>
                <div className="space-y-3">
                  {labResults.map(lab => (
                    <div key={lab.id} className="flex flex-wrap justify-between items-center p-4 border border-gray-100 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-800">{lab.test}</p>
                        <p className="text-xs text-gray-500">{lab.date}</p>
                        <p className="text-sm text-gray-600 mt-1">{lab.result}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${getLabStatusBadge(lab.status)}`}>{lab.status}</span>
                        {lab.pdf && (
                          <button className="text-teal-600 hover:text-teal-700">
                            <FaDownload />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Link  className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition group " to="/patientbookappointment">
          <button>
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-100 transition">
              <FaCalendarAlt />
            </div>
            <span className="text-sm font-medium text-gray-700">Book Appointment</span>
          </button>
          </Link>
          <button className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition group">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition">
              <FaPrescriptionBottle />
            </div>
            <span className="text-sm font-medium text-gray-700">Request Refill</span>
          </button>
          <button className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition group">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition">
              <FaFileMedical />
            </div>
            <span className="text-sm font-medium text-gray-700">Medical Records</span>
          </button>
          <button className="bg-red-50 border border-red-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition group">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-200 transition">
              <FaHospitalUser />
            </div>
            <span className="text-sm font-medium text-red-700">Emergency</span>
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-200 pt-6">
          <p>HealthCare+ Patient Portal | Secure & HIPAA compliant | Last updated {format(new Date(), 'MMM d, yyyy h:mm a')}</p>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;