import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaDownload, 
  FaFilePdf, 
  FaFileExcel, 
  FaPrint,
  FaFilter,
  FaTimes,
  FaUsers,
  FaUserMd,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { format, subDays } from 'date-fns';

// Mock data for reports
const appointmentTrendsData = [
  { date: '2026-04-01', appointments: 42, revenue: 5800 },
  { date: '2026-04-02', appointments: 48, revenue: 6500 },
  { date: '2026-04-03', appointments: 35, revenue: 4900 },
  { date: '2026-04-04', appointments: 52, revenue: 7100 },
  { date: '2026-04-05', appointments: 58, revenue: 7900 },
  { date: '2026-04-06', appointments: 45, revenue: 6200 },
  { date: '2026-04-07', appointments: 62, revenue: 8500 },
  { date: '2026-04-08', appointments: 68, revenue: 9200 },
  { date: '2026-04-09', appointments: 55, revenue: 7400 },
  { date: '2026-04-10', appointments: 70, revenue: 9600 },
];

const departmentData = [
  { name: 'Cardiology', appointments: 245, revenue: 36750, patients: 342 },
  { name: 'General Medicine', appointments: 312, revenue: 37440, patients: 456 },
  { name: 'Pediatrics', appointments: 189, revenue: 26460, patients: 289 },
  { name: 'Dermatology', appointments: 156, revenue: 24960, patients: 198 },
  { name: 'Neurology', appointments: 98, revenue: 17640, patients: 134 },
];

const doctorPerformanceData = [
  { name: 'Dr. Olivia Bennett', appointments: 78, revenue: 11700, rating: 4.8 },
  { name: 'Dr. Michael Chen', appointments: 92, revenue: 11040, rating: 4.9 },
  { name: 'Dr. Sophia Williams', appointments: 65, revenue: 9100, rating: 4.7 },
  { name: 'Dr. James O\'Connor', appointments: 54, revenue: 8640, rating: 4.9 },
  { name: 'Dr. Emma Thompson', appointments: 48, revenue: 8640, rating: 4.8 },
];

const patientDemographics = [
  { ageGroup: '0-18', count: 245, percentage: 12 },
  { ageGroup: '19-35', count: 678, percentage: 34 },
  { ageGroup: '36-50', count: 532, percentage: 26 },
  { ageGroup: '51-65', count: 398, percentage: 20 },
  { ageGroup: '65+', count: 167, percentage: 8 },
];

const statusBreakdown = [
  { name: 'Completed', value: 485, color: '#10b981' },
  { name: 'Confirmed', value: 234, color: '#0d9488' },
  { name: 'Pending', value: 89, color: '#f59e0b' },
  { name: 'Cancelled', value: 42, color: '#ef4444' },
];

const COLORS = ['#0d9488', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981'];

const ViewReports = () => {
  const [reportType, setReportType] = useState('appointments');
  const [dateRange, setDateRange] = useState({ start: format(subDays(new Date(), 30), 'yyyy-MM-dd'), end: format(new Date(), 'yyyy-MM-dd') });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [chartType, setChartType] = useState('line');

  // Filter data by date range
  const filteredAppointmentData = appointmentTrendsData.filter(item => 
    item.date >= dateRange.start && item.date <= dateRange.end
  );

  // Summary metrics
  const totalAppointments = filteredAppointmentData.reduce((sum, d) => sum + d.appointments, 0);
  const totalRevenue = filteredAppointmentData.reduce((sum, d) => sum + d.revenue, 0);
  const avgAppointments = Math.round(totalAppointments / filteredAppointmentData.length) || 0;
  const previousPeriodTotal = appointmentTrendsData.slice(0, 7).reduce((sum, d) => sum + d.appointments, 0);
  const trend = ((totalAppointments - previousPeriodTotal) / previousPeriodTotal * 100).toFixed(1);

  const handleExport = (format) => {
    alert(`Exporting ${reportType} report as ${format.toUpperCase()}... (Demo)`);
  };

  const handlePrint = () => {
    window.print();
  };

  const statsCards = [
    { title: 'Total Appointments', value: totalAppointments, icon: FaCalendarCheck, color: 'bg-blue-50', textColor: 'text-blue-700', change: `${trend}%`, trendUp: parseFloat(trend) >= 0 },
    { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: FaMoneyBillWave, color: 'bg-emerald-50', textColor: 'text-emerald-700', change: '+12%', trendUp: true },
    { title: 'Active Patients', value: '1,847', icon: FaUsers, color: 'bg-purple-50', textColor: 'text-purple-700', change: '+8%', trendUp: true },
    { title: 'Consultation Avg', value: `${Math.round(totalRevenue / totalAppointments)}`, icon: FaUserMd, color: 'bg-amber-50', textColor: 'text-amber-700', change: '-2%', trendUp: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaChartLine className="text-teal-600" /> Analytics & Reports
          </h1>
          <p className="text-gray-500 text-sm">Comprehensive insights into your healthcare operations</p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                <FaCalendarAlt className="text-teal-600" />
                <input 
                  type="date" 
                  className="bg-transparent outline-none text-sm"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
                <span>to</span>
                <input 
                  type="date" 
                  className="bg-transparent outline-none text-sm"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
              </div>
              <select 
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="appointments">Appointments Report</option>
                <option value="revenue">Revenue Report</option>
                <option value="doctors">Doctor Performance</option>
                <option value="departments">Department Analysis</option>
                <option value="patients">Patient Demographics</option>
              </select>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50"
              >
                <FaFilter /> More Filters
              </button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleExport('excel')} className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-xl text-sm hover:bg-green-700"><FaFileExcel /> Excel</button>
              <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-xl text-sm hover:bg-red-700"><FaFilePdf /> PDF</button>
              <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-xl text-sm hover:bg-gray-700"><FaPrint /> Print</button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Department</label>
                <select className="border rounded-lg px-3 py-1.5 text-sm" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                  <option value="all">All Departments</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="general">General Medicine</option>
                  <option value="pediatrics">Pediatrics</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Doctor</label>
                <select className="border rounded-lg px-3 py-1.5 text-sm">
                  <option>All Doctors</option>
                  <option>Dr. Olivia Bennett</option>
                  <option>Dr. Michael Chen</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Status</label>
                <select className="border rounded-lg px-3 py-1.5 text-sm">
                  <option>All</option>
                  <option>Completed</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                </select>
              </div>
              <button className="text-teal-600 text-sm mt-5">Apply Filters</button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {statsCards.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  <div className={`flex items-center gap-1 text-xs mt-2 ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trendUp ? <FaArrowUp /> : <FaArrowDown />}
                    <span>{stat.change}</span>
                    <span className="text-gray-400">vs previous period</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className={stat.textColor} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <div>
              <h3 className="font-semibold text-gray-800">
                {reportType === 'appointments' && 'Appointment Trends'}
                {reportType === 'revenue' && 'Revenue Overview'}
                {reportType === 'doctors' && 'Doctor Performance'}
                {reportType === 'departments' && 'Department Analysis'}
                {reportType === 'patients' && 'Patient Demographics'}
              </h3>
              <p className="text-xs text-gray-400">{dateRange.start} to {dateRange.end}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setChartType('line')} className={`px-3 py-1 rounded-lg text-sm ${chartType === 'line' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100'}`}><FaChartLine /></button>
              <button onClick={() => setChartType('bar')} className={`px-3 py-1 rounded-lg text-sm ${chartType === 'bar' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100'}`}><FaChartBar /></button>
              <button onClick={() => setChartType('pie')} className={`px-3 py-1 rounded-lg text-sm ${chartType === 'pie' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100'}`}><FaChartPie /></button>
            </div>
          </div>
          
          <div className="h-80">
            {reportType === 'appointments' && (
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                  <LineChart data={filteredAppointmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eef2f6" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} appointments`, 'Count']} />
                    <Legend />
                    <Line type="monotone" dataKey="appointments" stroke="#0d9488" strokeWidth={2} dot={{ fill: '#0d9488' }} />
                  </LineChart>
                ) : (
                  <BarChart data={filteredAppointmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="appointments" fill="#0d9488" radius={[8,8,0,0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            )}
            
            {reportType === 'revenue' && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredAppointmentData}>
                  <defs><linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/><stop offset="95%" stopColor="#0d9488" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(v) => `$${v}`} />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#0d9488" fill="url(#revenueGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            )}
            
            {reportType === 'doctors' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={doctorPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="appointments" fill="#0d9488" name="Appointments" />
                  <Bar dataKey="rating" fill="#f59e0b" name="Rating (x10)" />
                </BarChart>
              </ResponsiveContainer>
            )}
            
            {reportType === 'departments' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="appointments" fill="#0d9488" name="Appointments" />
                  <Bar dataKey="patients" fill="#3b82f6" name="Patients" />
                </BarChart>
              </ResponsiveContainer>
            )}
            
            {reportType === 'patients' && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={patientDemographics} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="count" label={({ ageGroup }) => ageGroup}>
                    {patientDemographics.map((entry, index) => (<Cell key={index} fill={COLORS[index % COLORS.length]} />))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Detailed Report Data</h3>
            <button onClick={() => handleExport('excel')} className="text-teal-600 text-sm flex items-center gap-1"><FaDownload /> Export Table</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {reportType === 'appointments' && (<><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Date</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Appointments</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Revenue</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Avg. Ticket</th></>)}
                  {reportType === 'doctors' && (<><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Doctor</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Appointments</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Revenue</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Rating</th></>)}
                  {reportType === 'departments' && (<><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Department</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Appointments</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Patients</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Revenue</th></>)}
                  {reportType === 'patients' && (<><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Age Group</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Count</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Percentage</th></>)}
                  {reportType === 'revenue' && (<><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Date</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Appointments</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Revenue</th><th className="px-5 py-3 text-left text-xs font-medium text-gray-500">Cumulative</th></>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reportType === 'appointments' && filteredAppointmentData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50"><td className="px-5 py-3 text-sm">{item.date}</td><td className="px-5 py-3 text-sm">{item.appointments}</td><td className="px-5 py-3 text-sm">${item.revenue}</td><td className="px-5 py-3 text-sm">${Math.round(item.revenue / item.appointments)}</td></tr>
                ))}
                {reportType === 'doctors' && doctorPerformanceData.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-gray-50"><td className="px-5 py-3 text-sm font-medium">{doc.name}</td><td className="px-5 py-3 text-sm">{doc.appointments}</td><td className="px-5 py-3 text-sm">${doc.revenue}</td><td className="px-5 py-3 text-sm">⭐ {doc.rating}</td></tr>
                ))}
                {reportType === 'departments' && departmentData.map((dept, idx) => (
                  <tr key={idx} className="hover:bg-gray-50"><td className="px-5 py-3 text-sm font-medium">{dept.name}</td><td className="px-5 py-3 text-sm">{dept.appointments}</td><td className="px-5 py-3 text-sm">{dept.patients}</td><td className="px-5 py-3 text-sm">${dept.revenue}</td></tr>
                ))}
                {reportType === 'patients' && patientDemographics.map((group, idx) => (
                  <tr key={idx} className="hover:bg-gray-50"><td className="px-5 py-3 text-sm">{group.ageGroup}</td><td className="px-5 py-3 text-sm">{group.count}</td><td className="px-5 py-3 text-sm">{group.percentage}%</td></tr>
                ))}
                {reportType === 'revenue' && filteredAppointmentData.map((item, idx) => {
                  const cumulative = filteredAppointmentData.slice(0, idx+1).reduce((sum, d) => sum + d.revenue, 0);
                  return (<tr key={idx}><td className="px-5 py-3 text-sm">{item.date}</td><td className="px-5 py-3 text-sm">{item.appointments}</td><td className="px-5 py-3 text-sm">${item.revenue}</td><td className="px-5 py-3 text-sm font-medium">${cumulative}</td></tr>);
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-semibold text-gray-800 mb-3">Key Insights</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Peak appointment day: <strong>Thursday</strong> with 72 appointments</li>
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Highest revenue day: <strong>Friday</strong> ($9,200)</li>
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Best performing department: <strong>General Medicine</strong> (312 appointments)</li>
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Patient satisfaction rating: <strong>4.82 / 5.0</strong></li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-semibold text-gray-800 mb-3">Status Breakdown</h4>
            <div className="flex flex-wrap gap-4">
              {statusBreakdown.map((item, idx) => (
                <div key={idx} className="flex-1 text-center">
                  <div className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</div>
                  <div className="text-xs text-gray-500">{item.name}</div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1"><div className="h-1.5 rounded-full" style={{ width: `${(item.value / statusBreakdown.reduce((s, i) => s + i.value, 0)) * 100}%`, backgroundColor: item.color }}></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReports;