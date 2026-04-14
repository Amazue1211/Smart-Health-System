import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaCheckCircle, 
  FaBan, 
  FaEdit, 
  FaPlus, 
  FaClock, 
  FaUserMd,
  FaChevronLeft,
  FaChevronRight,
  FaRegCalendarPlus,
  FaVideo,
  FaNotesMedical
} from 'react-icons/fa';
import { format, parseISO, isToday, isPast, isFuture, addDays } from 'date-fns';

// --- Mock Data ---
const initialAppointments = [
  { id: 1, patient: 'Eleanor Rodriguez', date: '2026-04-15', time: '09:00 AM', reason: 'Annual checkup', status: 'confirmed', type: 'in-person', notes: 'Bring lab results' },
  { id: 2, patient: 'Michael Chen', date: '2026-04-15', time: '10:30 AM', reason: 'Follow-up (Hypertension)', status: 'waiting', type: 'in-person', notes: '' },
  { id: 3, patient: 'Sophia Williams', date: '2026-04-16', time: '01:15 PM', reason: 'Chest pain evaluation', status: 'confirmed', type: 'telehealth', notes: 'Prepare ECG report' },
  { id: 4, patient: 'James O\'Connor', date: '2026-04-17', time: '03:00 PM', reason: 'Diabetes management', status: 'pending', type: 'in-person', notes: 'Check A1C levels' },
  { id: 5, patient: 'Emma Thompson', date: '2026-04-10', time: '11:30 AM', reason: 'Hypertension follow-up', status: 'completed', type: 'in-person', notes: '' },
  { id: 6, patient: 'Liam Garcia', date: '2026-04-12', time: '02:00 PM', reason: 'Type 2 Diabetes', status: 'cancelled', type: 'telehealth', notes: 'Rescheduled to next week' },
  { id: 7, patient: 'Olivia Martinez', date: '2026-04-18', time: '09:45 AM', reason: 'Lower back pain', status: 'confirmed', type: 'in-person', notes: 'Bring MRI if available' },
];

const statusOptions = ['all', 'confirmed', 'pending', 'waiting', 'completed', 'cancelled'];
const typeOptions = ['all', 'in-person', 'telehealth'];

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  
  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    date: '',
    time: '',
    reason: '',
    type: 'in-person',
    notes: '',
    status: 'pending'
  });

  // Filter logic
  const filteredAppointments = appointments.filter(apt => {
    // search by patient name or reason
    const matchesSearch = apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          apt.reason.toLowerCase().includes(searchTerm.toLowerCase());
    // status filter
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    // type filter
    const matchesType = typeFilter === 'all' || apt.type === typeFilter;
    // date range filter
    let matchesDate = true;
    if (dateRange.start) {
      const aptDate = parseISO(apt.date);
      const startDate = parseISO(dateRange.start);
      if (aptDate < startDate) matchesDate = false;
    }
    if (dateRange.end && matchesDate) {
      const aptDate = parseISO(apt.date);
      const endDate = parseISO(dateRange.end);
      if (aptDate > endDate) matchesDate = false;
    }
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  // Sort by date (ascending)
  const sortedAppointments = [...filteredAppointments].sort((a, b) => 
    parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );

  // Handlers for actions
  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const deleteAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel/delete this appointment?')) {
      setAppointments(prev => prev.filter(apt => apt.id !== id));
    }
  };

  const openEditModal = (apt) => {
    setEditingAppointment(apt);
    setNewAppointment({
      patient: apt.patient,
      date: apt.date,
      time: apt.time,
      reason: apt.reason,
      type: apt.type,
      notes: apt.notes,
      status: apt.status
    });
    setShowAddModal(true);
  };

  const handleSaveAppointment = () => {
    if (!newAppointment.patient || !newAppointment.date || !newAppointment.time) {
      alert('Please fill all required fields (Patient, Date, Time)');
      return;
    }
    if (editingAppointment) {
      // Update existing
      setAppointments(prev => prev.map(apt =>
        apt.id === editingAppointment.id ? { ...apt, ...newAppointment, id: apt.id } : apt
      ));
    } else {
      // Create new
      const newId = Math.max(0, ...appointments.map(a => a.id)) + 1;
      setAppointments(prev => [...prev, { ...newAppointment, id: newId }]);
    }
    resetModal();
  };

  const resetModal = () => {
    setShowAddModal(false);
    setEditingAppointment(null);
    setNewAppointment({
      patient: '', date: '', time: '', reason: '', type: 'in-person', notes: '', status: 'pending'
    });
  };

  // Helper to get status badge color
  const getStatusBadge = (status) => {
    const styles = {
      confirmed: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-amber-100 text-amber-700',
      waiting: 'bg-blue-100 text-blue-700',
      completed: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  // Group appointments by date for better readability
  const groupedByDate = sortedAppointments.reduce((groups, apt) => {
    const dateKey = apt.date;
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(apt);
    return groups;
  }, {});

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header with title and add button */}
      <div className="px-6 py-5 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaCalendarAlt className="text-teal-600" /> Manage Appointments
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">Schedule, reschedule, or cancel patient visits</p>
        </div>
        <button 
          onClick={() => { resetModal(); setShowAddModal(true); }}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition flex items-center gap-2"
        >
          <FaPlus /> New Appointment
        </button>
      </div>

      {/* Filters row */}
      <div className="p-5 bg-gray-50/40 border-b border-gray-100 flex flex-col md:flex-row gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by patient or reason..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 flex-wrap">
          <select 
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:ring-teal-500/20"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>Status: {opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
            ))}
          </select>
          
          <select 
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {typeOptions.map(opt => (
              <option key={opt} value={opt}>Type: {opt === 'all' ? 'All' : opt === 'in-person' ? 'In-person' : 'Telehealth'}</option>
            ))}
          </select>

          <div className="flex items-center gap-2 text-sm">
            <input 
              type="date" 
              className="px-2 py-2 rounded-lg border border-gray-200 text-sm"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              placeholder="From"
            />
            <span className="text-gray-400">—</span>
            <input 
              type="date" 
              className="px-2 py-2 rounded-lg border border-gray-200 text-sm"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              placeholder="To"
            />
            {(dateRange.start || dateRange.end) && (
              <button 
                onClick={() => setDateRange({ start: '', end: '' })}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Appointments list - grouped by date */}
      <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto custom-scroll">
        {Object.keys(groupedByDate).length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <FaCalendarAlt className="mx-auto text-4xl mb-3 opacity-50" />
            <p>No appointments match your filters.</p>
            <button 
              onClick={() => { setSearchTerm(''); setStatusFilter('all'); setTypeFilter('all'); setDateRange({start:'', end:''}); }}
              className="text-teal-600 text-sm mt-2 underline"
            >Clear all filters</button>
          </div>
        ) : (
          Object.entries(groupedByDate).map(([date, apts]) => (
            <div key={date} className="px-5 py-4">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-semibold text-gray-700 bg-gray-100 inline-block px-3 py-1 rounded-full text-sm">
                  {format(parseISO(date), 'EEEE, MMM d, yyyy')}
                </h3>
                {isPast(parseISO(date)) && !isToday(parseISO(date)) && (
                  <span className="text-xs text-gray-400">Past</span>
                )}
                {isToday(parseISO(date)) && (
                  <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Today</span>
                )}
              </div>
              <div className="space-y-3">
                {apts.map(apt => (
                  <div key={apt.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-wrap justify-between items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-bold text-gray-800">{apt.patient}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadge(apt.status)}`}>
                            {apt.status}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                            {apt.type === 'telehealth' ? <FaVideo className="text-xs" /> : <FaUserMd className="text-xs" />}
                            {apt.type === 'telehealth' ? 'Telehealth' : 'In-person'}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <FaClock className="text-teal-500 text-xs" /> {apt.time}
                          </div>
                          <div className="text-gray-600"><span className="font-medium">Reason:</span> {apt.reason}</div>
                          {apt.notes && <div className="text-gray-500 text-xs italic flex items-center gap-1"><FaNotesMedical /> {apt.notes}</div>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                          <>
                            <button 
                              onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                              title="Confirm"
                            ><FaCheckCircle /></button>
                            <button 
                              onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Cancel"
                            ><FaBan /></button>
                            <button 
                              onClick={() => openEditModal(apt)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Reschedule / Edit"
                            ><FaEdit /></button>
                          </>
                        )}
                        {(apt.status === 'cancelled' || apt.status === 'completed') && (
                          <button 
                            onClick={() => deleteAppointment(apt.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition"
                            title="Remove"
                          ><FaTimes /></button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">
                {editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
              </h3>
              <button onClick={resetModal} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  value={newAppointment.patient}
                  onChange={e => setNewAppointment({...newAppointment, patient: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={newAppointment.date}
                    onChange={e => setNewAppointment({...newAppointment, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={newAppointment.time}
                    onChange={e => setNewAppointment({...newAppointment, time: e.target.value})}
                  >
                    <option value="">Select time</option>
                    <option>09:00 AM</option><option>09:30 AM</option><option>10:00 AM</option>
                    <option>10:30 AM</option><option>11:00 AM</option><option>11:30 AM</option>
                    <option>01:00 PM</option><option>01:30 PM</option><option>02:00 PM</option>
                    <option>02:30 PM</option><option>03:00 PM</option><option>03:30 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={newAppointment.reason}
                  onChange={e => setNewAppointment({...newAppointment, reason: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={newAppointment.type}
                    onChange={e => setNewAppointment({...newAppointment, type: e.target.value})}
                  >
                    <option value="in-person">In-person</option>
                    <option value="telehealth">Telehealth</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={newAppointment.status}
                    onChange={e => setNewAppointment({...newAppointment, status: e.target.value})}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="waiting">Waiting</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Notes (optional)</label>
                <textarea 
                  rows={2} 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={newAppointment.notes}
                  onChange={e => setNewAppointment({...newAppointment, notes: e.target.value})}
                ></textarea>
              </div>
            </div>
            <div className="border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
              <button onClick={resetModal} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveAppointment} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">Save Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAppointments;