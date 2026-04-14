import React, { useState, useEffect, useRef } from 'react';
import { 
  FaCalendarAlt, 
  FaUserMd, 
  FaClipboardList, 
  FaChartLine, 
  FaBell, 
  FaSearch, 
  FaVideo, 
  FaStethoscope, 
  FaAmbulance, 
  FaHistory, 
  FaPrescriptionBottle,
  FaCheckCircle,
  FaClock,
  
} from 'react-icons/fa';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// --- Mock Data ---
const todayAppointments = [
  { id: 1, time: '09:00 AM', patient: 'Eleanor Rodriguez', reason: 'Annual checkup', status: 'confirmed', avatar: 'ER' },
  { id: 2, time: '10:30 AM', patient: 'Michael Chen', reason: 'Follow-up (Hypertension)', status: 'waiting', avatar: 'MC' },
  { id: 3, time: '01:15 PM', patient: 'Sophia Williams', reason: 'Chest pain evaluation', status: 'confirmed', avatar: 'SW' },
  { id: 4, time: '03:00 PM', patient: 'James O\'Connor', reason: 'Diabetes management', status: 'in-progress', avatar: 'JO' },
];

const recentPatients = [
  { id: 1, name: 'Emma Thompson', lastVisit: '2025-03-20', diagnosis: 'Hypertension', status: 'Stable', action: 'Review' },
  { id: 2, name: 'Liam Garcia', lastVisit: '2025-03-19', diagnosis: 'Type 2 Diabetes', status: 'Follow-up needed', action: 'Lab' },
  { id: 3, name: 'Olivia Martinez', lastVisit: '2025-03-18', diagnosis: 'Lower back pain', status: 'Improving', action: 'Rx' },
  { id: 4, name: 'Noah Davis', lastVisit: '2025-03-17', diagnosis: 'Acute bronchitis', status: 'Recovered', action: 'Schedule' },
];

const weeklyAppointmentData = [
  { name: 'Mon', appointments: 18 },
  { name: 'Tue', appointments: 24 },
  { name: 'Wed', appointments: 22 },
  { name: 'Thu', appointments: 30 },
  { name: 'Fri', appointments: 27 },
  { name: 'Sat', appointments: 12 },
  { name: 'Sun', appointments: 8 },
];

const DoctorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate] = useState(new Date());
  const chartRef = useRef(null);

  // Format today's date
  const formattedDate = selectedDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Next appointment logic
  const nextAppointment = todayAppointments[0];
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    // Simulate real-time update for next appointment countdown
    const interval = setInterval(() => {
      const now = new Date();
      const [hours, minutes] = nextAppointment.time.split(':');
      let hour = parseInt(hours);
      const minute = parseInt(minutes.split(' ')[0]);
      const isPM = nextAppointment.time.includes('PM');
      if (isPM && hour !== 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;
      
      const appointmentTime = new Date();
      appointmentTime.setHours(hour, minute, 0, 0);
      const diffMs = appointmentTime - now;
      if (diffMs > 0) {
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 60) {
          setTimeRemaining(`${diffMins} min`);
        } else {
          const hoursRem = Math.floor(diffMins / 60);
          const minsRem = diffMins % 60;
          setTimeRemaining(`${hoursRem}h ${minsRem}m`);
        }
      } else {
        setTimeRemaining('Now');
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [nextAppointment.time]);

  // Stats data for the dashboard
  const stats = [
    { title: 'Today\'s Patients', value: '12', icon: FaUserMd, color: 'bg-blue-50', textColor: 'text-blue-700', change: '+2 vs yesterday' },
    { title: 'Completed Visits', value: '148', icon: FaCheckCircle, color: 'bg-emerald-50', textColor: 'text-emerald-700', change: 'This month' },
    { title: 'Pending Reports', value: '05', icon: FaClipboardList, color: 'bg-amber-50', textColor: 'text-amber-700', change: 'Awaiting review' },
    { title: 'Upcoming Appt', value: '08', icon: FaCalendarAlt, color: 'bg-indigo-50', textColor: 'text-indigo-700', change: 'Next 7 days' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100/50">
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
                <p className="text-xs text-gray-500 -mt-1">Doctor Dashboard · Clinical Overview</p>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search patients, appointments, or records..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Doctor profile and actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <FaBell className="text-gray-500 text-lg" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-700">Dr. Olivia Bennett</p>
                  <p className="text-xs text-gray-500">Cardiology · ID: MD-8842</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-white font-semibold shadow-md">
                  OB
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting + date row */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Good morning, Dr. Bennett</h2>
            <p className="text-gray-500 text-sm flex items-center gap-2 mt-0.5">
              <FaCalendarAlt className="text-teal-500 text-xs" /> {formattedDate}
              <span className="text-gray-300">•</span>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Live sync: just now</span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0 flex gap-2">
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium shadow-sm hover:shadow transition flex items-center gap-2">
              <FaHistory /> Patient Insights
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-md transition flex items-center gap-2">
              <FaVideo /> Start Telehealth
            </button>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 card-hover transition-all hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1 stat-number">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-2">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className={`${stat.textColor} text-xl`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column layout: Appointments + Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column: Today's schedule */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FaCalendarAlt className="text-teal-600" /> Today's Schedule
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{todayAppointments.length} appointments</span>
              </h3>
              <button className="text-sm text-teal-600 hover:underline font-medium">View full calendar →</button>
            </div>

            {/* Next appointment highlight card */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-5 border border-teal-100">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-teal-200 flex items-center justify-center text-teal-800 font-bold">
                    {nextAppointment.avatar}
                  </div>
                  <div>
                    <p className="text-sm text-teal-700 font-medium">Next appointment</p>
                    <p className="font-bold text-gray-800">{nextAppointment.patient}</p>
                    <p className="text-xs text-gray-500">{nextAppointment.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-teal-700">{nextAppointment.time}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 justify-end"><FaClock className="text-teal-500" /> in {timeRemaining}</p>
                  <button className="mt-1 text-xs bg-white border border-teal-300 text-teal-700 px-3 py-1 rounded-lg hover:bg-teal-50 transition">Start Visit</button>
                </div>
              </div>
            </div>

            {/* Appointments list */}
            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1 custom-scroll">
              {todayAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/60 hover:bg-white border border-transparent hover:border-gray-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">{apt.avatar}</div>
                    <div>
                      <p className="font-semibold text-gray-800">{apt.patient}</p>
                      <p className="text-xs text-gray-500">{apt.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">{apt.time}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        apt.status === 'waiting' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {apt.status === 'in-progress' ? 'In Progress' : apt.status}
                      </span>
                    </div>
                    <button className="text-teal-600 hover:bg-teal-50 p-2 rounded-lg transition">
                      <FaPrescriptionBottle className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Chart + Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FaChartLine className="text-teal-600" /> Weekly Volume
              </h3>
              <span className="text-xs text-gray-400">Last 7 days</span>
            </div>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyAppointmentData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                  <Area type="monotone" dataKey="appointments" stroke="#0d9488" strokeWidth={2} fill="url(#colorAppointments)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-2 rounded-xl text-center">
                <p className="text-xs text-gray-500">Total this week</p>
                <p className="text-xl font-bold text-gray-800">141</p>
              </div>
              <div className="bg-gray-50 p-2 rounded-xl text-center">
                <p className="text-xs text-gray-500">Avg. per day</p>
                <p className="text-xl font-bold text-gray-800">20.1</p>
              </div>
            </div>
            <div className="mt-3 flex justify-between text-xs text-gray-500 bg-teal-50/40 p-2 rounded-lg">
              <span>📈 +12% vs last week</span>
              <span>🩺 Peak: Thursday</span>
            </div>
          </div>
        </div>

        {/* Recent Patients Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaUserMd className="text-teal-600" /> Recent Patient Encounters
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Last updated just now</span>
            </h3>
            <button className="text-sm text-teal-600 hover:underline">View all patients →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/70 rounded-xl">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Visit</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Diagnosis / Condition</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 text-xs font-semibold">
                          {patient.name.charAt(0)}{patient.name.split(' ')[1]?.charAt(0) || ''}
                        </div>
                        <span className="font-medium text-gray-800">{patient.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">{patient.lastVisit}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-700">{patient.diagnosis}</td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        patient.status === 'Stable' ? 'bg-emerald-100 text-emerald-700' :
                        patient.status === 'Follow-up needed' ? 'bg-amber-100 text-amber-700' :
                        patient.status === 'Improving' ? 'bg-sky-100 text-sky-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-right">
                      <button className="text-teal-600 text-sm font-medium hover:underline mr-3">Chart</button>
                      <button className="text-gray-500 text-sm hover:text-teal-600"><FaPrescriptionBottle /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Row (Inspired by original design navigation) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition group">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-100 transition">
              <FaCalendarAlt />
            </div>
            <span className="text-sm font-medium text-gray-700">My Schedule</span>
            <span className="text-xs text-gray-400">Manage shifts</span>
          </button>
          <button className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition group">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition">
              <FaClipboardList />
            </div>
            <span className="text-sm font-medium text-gray-700">Patient Records</span>
            <span className="text-xs text-gray-400">EMR access</span>
          </button>
          <button className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition group">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition">
              <FaVideo />
            </div>
            <span className="text-sm font-medium text-gray-700">Telehealth</span>
            <span className="text-xs text-gray-400">Virtual consults</span>
          </button>
          <button className="bg-red-50 border border-red-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition group">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-200 transition">
              <FaAmbulance />
            </div>
            <span className="text-sm font-medium text-red-700">Emergency</span>
            <span className="text-xs text-red-400">Urgent protocol</span>
          </button>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-200 pt-6">
          <p>HealthCare+ Doctor Dashboard | Secure & HIPAA compliant | Real-time sync: {new Date().toLocaleTimeString()}</p>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;