import React, { useState } from 'react';
import { 
  FaUserCircle, 
  FaNotesMedical, 
  FaPrescriptionBottle, 
  FaFlask, 
  FaSave, 
  FaCheckCircle,
  FaEdit,
  FaPlus,
  FaTrash,
  FaStethoscope,
  FaHeartbeat,
  FaThermometerHalf,
  FaRuler,
//   FaWeightScale,
  FaCalendarAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaVenusMars,
  FaFilePdf,
  FaShareAlt
} from 'react-icons/fa';

// Mock patient data for consultation
const patientData = {
  id: 'P-10234',
  name: 'Eleanor Rodriguez',
  age: 58,
  gender: 'Female',
  dob: '1967-03-12',
  phone: '(555) 234-7890',
  email: 'eleanor.r@example.com',
  bloodType: 'O+',
  allergies: ['Penicillin', 'Sulfa drugs'],
  chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
  currentMedications: ['Lisinopril 10mg', 'Metformin 500mg'],
  lastVisit: '2025-12-10',
  vitals: {
    temperature: '36.8°C',
    heartRate: '78 bpm',
    bloodPressure: '135/85',
    respiratoryRate: '16/min',
    oxygenSaturation: '97%',
    weight: '72 kg',
    height: '165 cm',
    bmi: '26.4'
  }
};

const Consultation = () => {
  // Consultation state
  const [activeTab, setActiveTab] = useState('soap'); // soap, prescriptions, labs
  const [soapNotes, setSoapNotes] = useState({
    subjective: 'Patient reports occasional headaches and fatigue over the past 2 weeks. BP readings at home ranged 130-140/85-90. Denies chest pain or shortness of breath.',
    objective: 'Alert and oriented. Lungs clear to auscultation. No peripheral edema. Heart rhythm regular.',
    assessment: 'Uncontrolled hypertension likely due to medication non-adherence. Diabetes stable per recent HbA1c.',
    plan: 'Adjust Lisinopril to 20mg daily. Recheck BP in 2 weeks. Continue Metformin. Refer to dietitian.'
  });
  
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, drug: 'Lisinopril', dosage: '20mg', frequency: 'Once daily', duration: '30 days', refills: 1 },
    { id: 2, drug: 'Metformin', dosage: '500mg', frequency: 'Twice daily with meals', duration: '90 days', refills: 2 }
  ]);
  
  const [labOrders, setLabOrders] = useState([
    { id: 1, test: 'Complete Blood Count (CBC)', status: 'pending', notes: '' },
    { id: 2, test: 'Lipid Panel', status: 'pending', notes: 'Fasting required' },
    { id: 3, test: 'HbA1c', status: 'ordered', notes: 'Follow-up on diabetes' }
  ]);

  const [newPrescription, setNewPrescription] = useState({ drug: '', dosage: '', frequency: '', duration: '', refills: 0 });
  const [newLabTest, setNewLabTest] = useState({ test: '', notes: '' });

  // Handlers
  const addPrescription = () => {
    if (newPrescription.drug && newPrescription.dosage) {
      setPrescriptions([...prescriptions, { ...newPrescription, id: Date.now(), refills: newPrescription.refills || 0 }]);
      setNewPrescription({ drug: '', dosage: '', frequency: '', duration: '', refills: 0 });
    }
  };

  const removePrescription = (id) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  const addLabOrder = () => {
    if (newLabTest.test) {
      setLabOrders([...labOrders, { ...newLabTest, id: Date.now(), status: 'pending' }]);
      setNewLabTest({ test: '', notes: '' });
    }
  };

  const removeLabOrder = (id) => {
    setLabOrders(labOrders.filter(l => l.id !== id));
  };

  const updateLabStatus = (id, status) => {
    setLabOrders(labOrders.map(l => l.id === id ? { ...l, status } : l));
  };

  const handleSaveConsultation = () => {
    alert('Consultation notes saved successfully! (Demo)');
    // In real app: API call to save encounter
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaStethoscope className="text-teal-600" /> Active Consultation
            </h1>
            <p className="text-gray-500 text-sm">Document patient encounter and treatment plan</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center gap-2">
              <FaFilePdf /> Export Summary
            </button>
            <button 
              onClick={handleSaveConsultation}
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-sm transition flex items-center gap-2"
            >
              <FaSave /> Save & Complete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Patient Profile & Vitals */}
          <div className="lg:col-span-1 space-y-5">
            {/* Patient card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-4">
                <FaUserCircle className="text-5xl text-teal-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{patientData.name}</h2>
                  <p className="text-sm text-gray-500">ID: {patientData.id} | {patientData.age} yrs • {patientData.gender}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm border-t pt-3 border-gray-100">
                <div className="flex items-center gap-2 text-gray-600"><FaCalendarAlt /> DOB: {patientData.dob}</div>
                <div className="flex items-center gap-2 text-gray-600"><FaPhoneAlt /> {patientData.phone}</div>
                <div className="flex items-center gap-2 text-gray-600"><FaEnvelope /> {patientData.email}</div>
                <div className="flex items-center gap-2 text-gray-600"><FaVenusMars /> Blood: {patientData.bloodType}</div>
              </div>
              <div className="mt-3 bg-red-50 p-3 rounded-xl">
                <p className="text-xs font-semibold text-red-700">Allergies</p>
                <p className="text-sm text-red-600">{patientData.allergies.join(', ') || 'None'}</p>
              </div>
              <div className="mt-2">
                <p className="text-xs font-semibold text-gray-500">Chronic Conditions</p>
                <p className="text-sm text-gray-700">{patientData.chronicConditions.join(', ')}</p>
              </div>
            </div>

            {/* Vitals Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3"><FaHeartbeat className="text-teal-600" /> Current Vitals</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 p-2 rounded-lg"><span className="text-gray-500">Temp:</span> <span className="font-medium">{patientData.vitals.temperature}</span></div>
                <div className="bg-gray-50 p-2 rounded-lg"><span className="text-gray-500">HR:</span> <span className="font-medium">{patientData.vitals.heartRate}</span></div>
                <div className="bg-gray-50 p-2 rounded-lg col-span-2"><span className="text-gray-500">BP:</span> <span className="font-medium">{patientData.vitals.bloodPressure}</span></div>
                <div className="bg-gray-50 p-2 rounded-lg"><span className="text-gray-500">RR:</span> <span className="font-medium">{patientData.vitals.respiratoryRate}</span></div>
                <div className="bg-gray-50 p-2 rounded-lg"><span className="text-gray-500">SpO₂:</span> <span className="font-medium">{patientData.vitals.oxygenSaturation}</span></div>
                <div className="bg-gray-50 p-2 rounded-lg"><span className="text-gray-500">BMI:</span> <span className="font-medium">{patientData.vitals.bmi}</span></div>
              </div>
              <button className="mt-3 text-xs text-teal-600 hover:underline flex items-center gap-1"><FaEdit /> Update Vitals</button>
            </div>

            {/* Current Medications Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2"><FaPrescriptionBottle className="text-teal-600" /> Current Meds</h3>
              <ul className="text-sm space-y-1 list-disc list-inside text-gray-600">
                {patientData.currentMedications.map((med, idx) => <li key={idx}>{med}</li>)}
              </ul>
            </div>
          </div>

          {/* Right Column: Consultation Workspace (Tabs) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200">
                <button 
                  onClick={() => setActiveTab('soap')}
                  className={`px-5 py-3 text-sm font-medium flex items-center gap-2 transition ${activeTab === 'soap' ? 'border-b-2 border-teal-600 text-teal-700 bg-teal-50/30' : 'text-gray-500 hover:text-gray-700'}`}
                ><FaNotesMedical /> SOAP Notes</button>
                <button 
                  onClick={() => setActiveTab('prescriptions')}
                  className={`px-5 py-3 text-sm font-medium flex items-center gap-2 transition ${activeTab === 'prescriptions' ? 'border-b-2 border-teal-600 text-teal-700 bg-teal-50/30' : 'text-gray-500 hover:text-gray-700'}`}
                ><FaPrescriptionBottle /> Prescriptions</button>
                <button 
                  onClick={() => setActiveTab('labs')}
                  className={`px-5 py-3 text-sm font-medium flex items-center gap-2 transition ${activeTab === 'labs' ? 'border-b-2 border-teal-600 text-teal-700 bg-teal-50/30' : 'text-gray-500 hover:text-gray-700'}`}
                ><FaFlask /> Lab Orders</button>
              </div>

              {/* SOAP Tab Content */}
              {activeTab === 'soap' && (
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Subjective (S)</label>
                    <textarea rows={3} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-teal-500 focus:border-teal-500" value={soapNotes.subjective} onChange={e => setSoapNotes({...soapNotes, subjective: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Objective (O)</label>
                    <textarea rows={3} className="w-full border border-gray-200 rounded-xl p-3 text-sm" value={soapNotes.objective} onChange={e => setSoapNotes({...soapNotes, objective: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Assessment (A)</label>
                    <textarea rows={3} className="w-full border border-gray-200 rounded-xl p-3 text-sm" value={soapNotes.assessment} onChange={e => setSoapNotes({...soapNotes, assessment: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Plan (P)</label>
                    <textarea rows={3} className="w-full border border-gray-200 rounded-xl p-3 text-sm" value={soapNotes.plan} onChange={e => setSoapNotes({...soapNotes, plan: e.target.value})} />
                  </div>
                  <div className="flex justify-end pt-2">
                    <button className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-teal-700"><FaSave /> Save Notes</button>
                  </div>
                </div>
              )}

              {/* Prescriptions Tab */}
              {activeTab === 'prescriptions' && (
                <div className="p-5">
                  <div className="mb-5 bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-medium text-gray-700 mb-2">Add New Prescription</h4>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                      <input type="text" placeholder="Drug name" className="border rounded-lg p-2 text-sm" value={newPrescription.drug} onChange={e => setNewPrescription({...newPrescription, drug: e.target.value})} />
                      <input type="text" placeholder="Dosage (e.g., 10mg)" className="border rounded-lg p-2 text-sm" value={newPrescription.dosage} onChange={e => setNewPrescription({...newPrescription, dosage: e.target.value})} />
                      <input type="text" placeholder="Frequency" className="border rounded-lg p-2 text-sm" value={newPrescription.frequency} onChange={e => setNewPrescription({...newPrescription, frequency: e.target.value})} />
                      <input type="text" placeholder="Duration" className="border rounded-lg p-2 text-sm" value={newPrescription.duration} onChange={e => setNewPrescription({...newPrescription, duration: e.target.value})} />
                      <button onClick={addPrescription} className="bg-teal-600 text-white rounded-lg p-2 text-sm flex items-center justify-center gap-1"><FaPlus /> Add</button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {prescriptions.map(p => (
                      <div key={p.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <div>
                          <p className="font-medium text-gray-800">{p.drug} <span className="text-sm text-gray-500">{p.dosage}</span></p>
                          <p className="text-xs text-gray-500">{p.frequency} • {p.duration} • {p.refills} refill(s)</p>
                        </div>
                        <button onClick={() => removePrescription(p.id)} className="text-red-400 hover:text-red-600"><FaTrash /></button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t flex justify-end">
                    <button className="text-teal-600 text-sm flex items-center gap-1"><FaShareAlt /> Send to Pharmacy</button>
                  </div>
                </div>
              )}

              {/* Lab Orders Tab */}
              {activeTab === 'labs' && (
                <div className="p-5">
                  <div className="mb-5 bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-medium text-gray-700 mb-2">Order Lab Test</h4>
                    <div className="flex gap-2 flex-wrap">
                      <input type="text" placeholder="Test name (e.g., CBC, Lipid Panel)" className="flex-1 border rounded-lg p-2 text-sm" value={newLabTest.test} onChange={e => setNewLabTest({...newLabTest, test: e.target.value})} />
                      <input type="text" placeholder="Special instructions" className="flex-1 border rounded-lg p-2 text-sm" value={newLabTest.notes} onChange={e => setNewLabTest({...newLabTest, notes: e.target.value})} />
                      <button onClick={addLabOrder} className="bg-teal-600 text-white px-3 rounded-lg text-sm"><FaPlus /></button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {labOrders.map(lab => (
                      <div key={lab.id} className="flex justify-between items-center bg-white border rounded-xl p-3">
                        <div>
                          <p className="font-medium">{lab.test}</p>
                          {lab.notes && <p className="text-xs text-gray-500">{lab.notes}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <select value={lab.status} onChange={e => updateLabStatus(lab.id, e.target.value)} className="text-xs border rounded-lg p-1">
                            <option value="pending">Pending</option>
                            <option value="ordered">Ordered</option>
                            <option value="resulted">Resulted</option>
                          </select>
                          <button onClick={() => removeLabOrder(lab.id)} className="text-gray-400 hover:text-red-500"><FaTrash /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-xs text-gray-400 flex justify-between items-center">
                    <span>📋 Orders will be sent to affiliated lab</span>
                    <button className="text-teal-600 text-sm">Print Lab Requisition</button>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Actions - E-Prescribe & Referral */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:shadow transition">
                <FaPrescriptionBottle /> E-Prescribe
              </button>
              <button className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:shadow transition">
                <FaShareAlt /> Refer to Specialist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;