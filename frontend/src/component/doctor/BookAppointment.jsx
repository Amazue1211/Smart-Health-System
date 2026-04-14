import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaUserMd, 
  FaClock, 
  FaStethoscope, 
  FaVideo, 
  FaNotesMedical,
  FaCheckCircle,
  FaArrowLeft,
  FaUserPlus,
  FaSearch
} from 'react-icons/fa';
import { format, addDays, isSameDay, parseISO } from 'date-fns';

// Mock patients list for selection
const mockPatients = [
  { id: 1, name: 'Eleanor Rodriguez', age: 58, phone: '(555) 234-7890', email: 'eleanor.r@example.com' },
  { id: 2, name: 'Michael Chen', age: 45, phone: '(555) 345-1234', email: 'michael.chen@example.com' },
  { id: 3, name: 'Sophia Williams', age: 62, phone: '(555) 456-7891', email: 'sophia.w@example.com' },
  { id: 4, name: 'James O\'Connor', age: 51, phone: '(555) 567-8901', email: 'james.oc@example.com' },
  { id: 5, name: 'Emma Thompson', age: 39, phone: '(555) 678-9012', email: 'emma.t@example.com' },
];

// Available time slots (mock)
const generateTimeSlots = () => {
  const slots = [];
  const times = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
                 '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'];
  // Randomly mark some as booked for demo
  const bookedSlots = ['10:00 AM', '02:30 PM'];
  times.forEach(time => {
    slots.push({ time, available: !bookedSlots.includes(time) });
  });
  return slots;
};

const BookAppointment = () => {
  const [step, setStep] = useState(1); // 1: select patient, 2: select date/time, 3: confirm details
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchPatient, setSearchPatient] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    type: 'in-person',
    reason: '',
    notes: '',
    duration: 30
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Filter patients by search
  const filteredPatients = mockPatients.filter(p => 
    p.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
    p.phone.includes(searchPatient)
  );

  // Generate next 7 days for date picker
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  
  // Available time slots based on selected date (mock)
  const timeSlots = generateTimeSlots();

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // reset time slot when date changes
  };

  const handleTimeSlotSelect = (slot) => {
    if (slot.available) setSelectedTimeSlot(slot.time);
  };

  const handleNextToConfirm = () => {
    if (selectedTimeSlot) setStep(3);
    else alert('Please select a time slot');
  };

  const handleSubmitBooking = () => {
    // Simulate API call
    setBookingSuccess(true);
    setTimeout(() => {
      // Reset form after success (optional)
    }, 2000);
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedPatient(null);
    setSelectedDate(new Date());
    setSelectedTimeSlot(null);
    setAppointmentDetails({ type: 'in-person', reason: '', notes: '', duration: 30 });
    setSearchPatient('');
    setBookingSuccess(false);
  };

  if (bookingSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheckCircle className="text-green-600 text-3xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Appointment Booked!</h3>
        <p className="text-gray-500 mt-2">
          {selectedPatient?.name} scheduled for {format(selectedDate, 'EEEE, MMM d')} at {selectedTimeSlot}
        </p>
        <p className="text-sm text-gray-400 mt-1">Confirmation sent to patient's phone/email</p>
        <button 
          onClick={resetBooking}
          className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-teal-50/30 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaCalendarAlt className="text-teal-600" /> Book Appointment
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Schedule a new patient consultation</p>
          </div>
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm">
              <FaArrowLeft /> Back
            </button>
          )}
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition ${
                step >= s ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>{s}</div>
              {s < 3 && <div className={`w-12 h-0.5 mx-1 ${step > s ? 'bg-teal-600' : 'bg-gray-200'}`}></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Step 1: Select Patient */}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search or select patient</label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search by name or phone..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  value={searchPatient}
                  onChange={(e) => setSearchPatient(e.target.value)}
                />
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto space-y-2">
              {filteredPatients.map(patient => (
                <button
                  key={patient.id}
                  onClick={() => handlePatientSelect(patient)}
                  className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 transition flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{patient.name}</p>
                    <p className="text-xs text-gray-500">{patient.age} yrs • {patient.phone}</p>
                  </div>
                  <FaUserMd className="text-gray-400" />
                </button>
              ))}
              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <FaUserPlus className="mx-auto text-3xl mb-2" />
                  <p>No patient found</p>
                  <button className="text-teal-600 text-sm mt-1">+ Register new patient</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && selectedPatient && (
          <div>
            <div className="mb-5 p-3 bg-gray-50 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                {selectedPatient.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-800">{selectedPatient.name}</p>
                <p className="text-xs text-gray-500">Booking appointment for</p>
              </div>
            </div>

            {/* Date selector */}
            <label className="block text-sm font-medium text-gray-700 mb-2">Select date</label>
            <div className="flex gap-2 overflow-x-auto pb-3 mb-5">
              {next7Days.map(date => (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateSelect(date)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl border text-center transition ${
                    isSameDay(date, selectedDate)
                      ? 'bg-teal-600 border-teal-600 text-white'
                      : 'border-gray-200 text-gray-700 hover:border-teal-300'
                  }`}
                >
                  <div className="text-xs font-medium">{format(date, 'EEE')}</div>
                  <div className="text-lg font-bold">{format(date, 'd')}</div>
                  <div className="text-xs">{format(date, 'MMM')}</div>
                </button>
              ))}
            </div>

            {/* Time slots */}
            <label className="block text-sm font-medium text-gray-700 mb-2">Select time slot</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
              {timeSlots.map(slot => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => handleTimeSlotSelect(slot)}
                  className={`py-2 rounded-lg border text-sm transition ${
                    selectedTimeSlot === slot.time
                      ? 'bg-teal-600 border-teal-600 text-white'
                      : slot.available
                      ? 'border-gray-200 text-gray-700 hover:border-teal-300 hover:bg-teal-50'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100'
                  }`}
                >
                  <FaClock className="inline mr-1 text-xs" /> {slot.time}
                </button>
              ))}
            </div>

            {/* Appointment type and reason (quick select) */}
            <div className="border-t pt-4 mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Appointment type</label>
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setAppointmentDetails({...appointmentDetails, type: 'in-person'})}
                  className={`flex-1 py-2 rounded-lg border flex items-center justify-center gap-2 transition ${
                    appointmentDetails.type === 'in-person' ? 'bg-teal-50 border-teal-400 text-teal-700' : 'border-gray-200 text-gray-600'
                  }`}
                ><FaUserMd /> In-person</button>
                <button
                  onClick={() => setAppointmentDetails({...appointmentDetails, type: 'telehealth'})}
                  className={`flex-1 py-2 rounded-lg border flex items-center justify-center gap-2 transition ${
                    appointmentDetails.type === 'telehealth' ? 'bg-teal-50 border-teal-400 text-teal-700' : 'border-gray-200 text-gray-600'
                  }`}
                ><FaVideo /> Telehealth</button>
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for visit</label>
              <input
                type="text"
                placeholder="e.g., Follow-up, Annual checkup, Chest pain"
                className="w-full border border-gray-200 rounded-lg p-2 text-sm mb-3"
                value={appointmentDetails.reason}
                onChange={(e) => setAppointmentDetails({...appointmentDetails, reason: e.target.value})}
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinical notes (optional)</label>
              <textarea
                rows={2}
                placeholder="Any specific notes for this appointment..."
                className="w-full border border-gray-200 rounded-lg p-2 text-sm"
                value={appointmentDetails.notes}
                onChange={(e) => setAppointmentDetails({...appointmentDetails, notes: e.target.value})}
              />
            </div>

            <button
              onClick={handleNextToConfirm}
              className="mt-5 w-full bg-teal-600 text-white py-2.5 rounded-xl font-medium hover:bg-teal-700 transition"
            >
              Review & Confirm
            </button>
          </div>
        )}

        {/* Step 3: Confirm Details */}
        {step === 3 && selectedPatient && selectedTimeSlot && (
          <div>
            <div className="bg-teal-50/40 rounded-xl p-4 mb-5">
              <h3 className="font-semibold text-gray-800 mb-3">Appointment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Patient:</span> <span className="font-medium">{selectedPatient.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Date:</span> <span>{format(selectedDate, 'EEEE, MMM d, yyyy')}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Time:</span> <span>{selectedTimeSlot}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Type:</span> <span className="capitalize">{appointmentDetails.type}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Reason:</span> <span>{appointmentDetails.reason || 'Not specified'}</span></div>
                {appointmentDetails.notes && <div className="flex justify-between"><span className="text-gray-500">Notes:</span> <span className="italic">{appointmentDetails.notes}</span></div>}
              </div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-xl text-xs text-yellow-700 mb-5">
              <strong>Reminder:</strong> Patient will receive SMS/email confirmation. Please ensure availability.
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-50">Back</button>
              <button onClick={handleSubmitBooking} className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700">Confirm Booking</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;