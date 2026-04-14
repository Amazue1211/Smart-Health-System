import React, { useState } from 'react';
import { 
  FaSearch, 
  FaStethoscope, 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaNotesMedical,
  FaCheckCircle,
  FaStar,
  FaStarHalfAlt,
  FaArrowLeft,
  FaFilter,
  FaMapMarkerAlt,
  FaCreditCard
} from 'react-icons/fa';
import { format, addDays, isSameDay, isAfter, startOfToday } from 'date-fns';

// Mock doctors data
const doctorsData = [
  { 
    id: 1, 
    name: 'Dr. Olivia Bennett', 
    specialty: 'Cardiology', 
    rating: 4.8, 
    reviewCount: 124,
    experience: '12 years',
    location: 'Downtown Medical Center',
    avatar: 'OB',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    price: 150,
    imageBg: 'from-rose-400 to-orange-400'
  },
  { 
    id: 2, 
    name: 'Dr. Michael Chen', 
    specialty: 'General Medicine', 
    rating: 4.9, 
    reviewCount: 98,
    experience: '8 years',
    location: 'Westside Clinic',
    avatar: 'MC',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    price: 120,
    imageBg: 'from-blue-400 to-cyan-400'
  },
  { 
    id: 3, 
    name: 'Dr. Sophia Williams', 
    specialty: 'Pediatrics', 
    rating: 4.7, 
    reviewCount: 156,
    experience: '15 years',
    location: "Children's Health Center",
    avatar: 'SW',
    availableDays: ['Tue', 'Thu', 'Sat'],
    price: 140,
    imageBg: 'from-emerald-400 to-teal-400'
  },
  { 
    id: 4, 
    name: 'Dr. James O\'Connor', 
    specialty: 'Dermatology', 
    rating: 4.9, 
    reviewCount: 87,
    experience: '10 years',
    location: 'Skin & Laser Institute',
    avatar: 'JO',
    availableDays: ['Mon', 'Wed', 'Thu', 'Fri'],
    price: 160,
    imageBg: 'from-purple-400 to-pink-400'
  },
  { 
    id: 5, 
    name: 'Dr. Emma Thompson', 
    specialty: 'Neurology', 
    rating: 4.8, 
    reviewCount: 112,
    experience: '14 years',
    location: 'Brain & Spine Center',
    avatar: 'ET',
    availableDays: ['Tue', 'Wed', 'Fri'],
    price: 180,
    imageBg: 'from-indigo-400 to-blue-400'
  }
];

const specialties = ['All', 'Cardiology', 'General Medicine', 'Pediatrics', 'Dermatology', 'Neurology'];

// Generate time slots (mock availability)
const generateTimeSlots = (doctorId, date) => {
  const allSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
                    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'];
  const bookedMap = {
    1: ['10:00 AM', '02:30 PM'],
    2: ['11:00 AM', '03:00 PM'],
    3: ['09:30 AM', '01:30 PM'],
    4: ['10:30 AM', '02:00 PM'],
    5: ['11:30 AM', '01:00 PM']
  };
  const bookedSlots = bookedMap[doctorId] || [];
  return allSlots.map(time => ({ time, available: !bookedSlots.includes(time) }));
};

const PatientBookAppointment = () => {
  const [step, setStep] = useState(1); // 1: select doctor, 2: date/time, 3: patient info, 4: confirm
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [patientInfo, setPatientInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    reason: '',
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Filter doctors
  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'All' || doctor.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  // Available dates (next 7 days, respecting doctor's availability)
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i + 1));
  const availableDates = selectedDoctor 
    ? next7Days.filter(date => selectedDoctor.availableDays.includes(format(date, 'EEE')))
    : next7Days;

  const timeSlots = selectedDoctor ? generateTimeSlots(selectedDoctor.id, selectedDate) : [];

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(availableDates[0] || next7Days[0]);
    setSelectedTimeSlot(null);
    setStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (slot) => {
    if (slot.available) setSelectedTimeSlot(slot.time);
  };

  const handleNextToInfo = () => {
    if (selectedTimeSlot) setStep(3);
    else alert('Please select a time slot');
  };

  const handleInputChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  const handleProceedToConfirm = () => {
    if (patientInfo.fullName && patientInfo.email && patientInfo.phone) {
      setStep(4);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleConfirmBooking = () => {
    // Simulate API call
    const newBookingId = 'APT-' + Math.floor(Math.random() * 10000);
    setBookingId(newBookingId);
    setBookingSuccess(true);
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate(addDays(new Date(), 1));
    setSelectedTimeSlot(null);
    setPatientInfo({ fullName: '', email: '', phone: '', reason: '', notes: '' });
    setSearchTerm('');
    setSpecialtyFilter('All');
    setBookingSuccess(false);
  };

  // Star rating component
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
    if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-xs" />);
    return stars;
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-green-600 text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Appointment Confirmed!</h3>
          <p className="text-gray-500 mt-2">
            Your appointment with <span className="font-semibold">{selectedDoctor?.name}</span> has been scheduled.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mt-4 text-left">
            <p className="text-sm text-gray-600"><strong>Booking ID:</strong> {bookingId}</p>
            <p className="text-sm text-gray-600"><strong>Date:</strong> {format(selectedDate, 'EEEE, MMM d, yyyy')}</p>
            <p className="text-sm text-gray-600"><strong>Time:</strong> {selectedTimeSlot}</p>
            <p className="text-sm text-gray-600"><strong>Location:</strong> {selectedDoctor?.location}</p>
          </div>
          <p className="text-xs text-gray-400 mt-4">A confirmation has been sent to {patientInfo.email}</p>
          <button 
            onClick={resetBooking}
            className="mt-6 bg-teal-600 text-white px-6 py-2.5 rounded-xl hover:bg-teal-700 transition w-full font-medium"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <FaStethoscope className="text-teal-600" /> Book an Appointment
          </h1>
          <p className="text-gray-500 mt-1">Find the right doctor and schedule your visit online</p>
        </div>

        {/* Step Indicator */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[
              { step: 1, label: 'Doctor' },
              { step: 2, label: 'Time' },
              { step: 3, label: 'Info' },
              { step: 4, label: 'Confirm' }
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= item.step ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>{item.step}</div>
                <span className={`text-xs ml-1 hidden sm:inline ${step >= item.step ? 'text-teal-600' : 'text-gray-400'}`}>{item.label}</span>
                {item.step < 4 && <div className={`w-12 h-0.5 mx-2 ${step > item.step ? 'bg-teal-600' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Select Doctor */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search by doctor name or specialty..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl flex items-center gap-2 text-gray-600 hover:bg-gray-50"
                  >
                    <FaFilter /> Filter
                  </button>
                  {showFilters && (
                    <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-lg z-10 p-3 w-48">
                      <div className="text-sm font-medium mb-2">Specialty</div>
                      {specialties.map(spec => (
                        <button
                          key={spec}
                          onClick={() => { setSpecialtyFilter(spec); setShowFilters(false); }}
                          className={`block w-full text-left px-3 py-1.5 text-sm rounded-lg ${specialtyFilter === spec ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-50'}`}
                        >{spec}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
              {filteredDoctors.map(doctor => (
                <button
                  key={doctor.id}
                  onClick={() => handleDoctorSelect(doctor)}
                  className="w-full text-left p-5 hover:bg-teal-50/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${doctor.imageBg} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                      {doctor.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{doctor.name}</p>
                      <p className="text-sm text-teal-600 font-medium">{doctor.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(doctor.rating)}
                        <span className="text-xs text-gray-500 ml-1">({doctor.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-semibold text-gray-800">${doctor.price}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1"><FaMapMarkerAlt className="text-teal-500 text-xs" /> {doctor.location}</p>
                    <p className="text-xs text-teal-600 mt-1">Available: {doctor.availableDays.join(', ')}</p>
                  </div>
                </button>
              ))}
              {filteredDoctors.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <FaStethoscope className="mx-auto text-4xl mb-2 opacity-50" />
                  <p>No doctors found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && selectedDoctor && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5 pb-3 border-b">
              <button onClick={() => setStep(1)} className="text-gray-400 hover:text-gray-600"><FaArrowLeft /></button>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedDoctor.imageBg} flex items-center justify-center text-white font-bold`}>{selectedDoctor.avatar}</div>
                <div>
                  <p className="font-semibold text-gray-800">{selectedDoctor.name}</p>
                  <p className="text-xs text-gray-500">{selectedDoctor.specialty}</p>
                </div>
              </div>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <div className="flex gap-2 overflow-x-auto pb-3 mb-6 custom-scroll">
              {availableDates.map(date => (
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

            <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot</label>
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

            <button
              onClick={handleNextToInfo}
              className="w-full bg-teal-600 text-white py-2.5 rounded-xl font-medium hover:bg-teal-700 transition"
            >
              Continue to Patient Details
            </button>
          </div>
        )}

        {/* Step 3: Patient Information */}
        {step === 3 && selectedDoctor && selectedTimeSlot && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5 pb-3 border-b">
              <button onClick={() => setStep(2)} className="text-gray-400 hover:text-gray-600"><FaArrowLeft /></button>
              <h3 className="font-semibold text-gray-800">Patient Information</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="fullName"
                      value={patientInfo.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-teal-500 focus:border-teal-500 outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={patientInfo.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="tel"
                    name="phone"
                    value={patientInfo.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                <input
                  type="text"
                  name="reason"
                  value={patientInfo.reason}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-xl p-2.5"
                  placeholder="e.g., Annual checkup, Follow-up, Chest pain"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
                <textarea
                  name="notes"
                  rows={3}
                  value={patientInfo.notes}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-xl p-2.5"
                  placeholder="Any symptoms, concerns, or requests..."
                />
              </div>
            </div>

            <button
              onClick={handleProceedToConfirm}
              className="w-full mt-6 bg-teal-600 text-white py-2.5 rounded-xl font-medium hover:bg-teal-700 transition"
            >
              Review Appointment
            </button>
          </div>
        )}

        {/* Step 4: Confirm Details */}
        {step === 4 && selectedDoctor && selectedTimeSlot && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 text-lg mb-4">Confirm Your Appointment</h3>
            
            <div className="bg-teal-50/40 rounded-xl p-4 mb-5">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between flex-wrap gap-2">
                  <span className="text-gray-500">Doctor:</span>
                  <span className="font-medium">{selectedDoctor.name} ({selectedDoctor.specialty})</span>
                </div>
                <div className="flex justify-between flex-wrap gap-2">
                  <span className="text-gray-500">Date & Time:</span>
                  <span>{format(selectedDate, 'EEEE, MMM d, yyyy')} at {selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between flex-wrap gap-2">
                  <span className="text-gray-500">Location:</span>
                  <span>{selectedDoctor.location}</span>
                </div>
                <div className="flex justify-between flex-wrap gap-2">
                  <span className="text-gray-500">Consultation Fee:</span>
                  <span className="font-semibold text-teal-700">${selectedDoctor.price}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="font-medium text-gray-700 mb-2">Patient Details</p>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">Name:</span> {patientInfo.fullName}</p>
                <p><span className="text-gray-500">Email:</span> {patientInfo.email}</p>
                <p><span className="text-gray-500">Phone:</span> {patientInfo.phone}</p>
                {patientInfo.reason && <p><span className="text-gray-500">Reason:</span> {patientInfo.reason}</p>}
                {patientInfo.notes && <p><span className="text-gray-500">Notes:</span> {patientInfo.notes}</p>}
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-xl text-xs text-yellow-700 mb-5 flex items-start gap-2">
              <FaCreditCard className="text-yellow-600 mt-0.5" />
              <span>No payment required at booking. You can pay at the clinic or via insurance.</span>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="flex-1 border border-gray-300 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition">Back</button>
              <button onClick={handleConfirmBooking} className="flex-1 bg-teal-600 text-white py-2.5 rounded-lg hover:bg-teal-700 transition font-medium">Confirm Booking</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientBookAppointment;