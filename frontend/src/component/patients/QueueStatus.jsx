import React, { useState, useEffect } from 'react';
import { 
  FaUserClock, 
  FaHourglassHalf, 
  FaListOl, 
  FaCheckCircle, 
  FaSpinner,
  FaBell,
  FaHospitalUser,
  FaClock,
  FaArrowRight
} from 'react-icons/fa';

// Mock queue data (will be updated in real-time)
const generateMockQueue = () => {
  const patients = [
    { id: 1, name: 'James Wilson', token: 'A104', status: 'in-progress', estimatedTime: 0 },
    { id: 2, name: 'Maria Garcia', token: 'A105', status: 'waiting', estimatedTime: 15 },
    { id: 3, name: 'Robert Brown', token: 'A106', status: 'waiting', estimatedTime: 25 },
    { id: 4, name: 'Emily Davis', token: 'A107', status: 'waiting', estimatedTime: 35 },
    { id: 5, name: 'Michael Lee', token: 'A108', status: 'waiting', estimatedTime: 45 },
  ];
  return patients;
};

const QueueStatus = () => {
  // State
  const [queue, setQueue] = useState(generateMockQueue());
  const [currentPatient, setCurrentPatient] = useState({
    name: 'You',
    token: 'A105',
    position: 2,
    estimatedWait: 15,
    status: 'waiting'
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isSimulating, setIsSimulating] = useState(true);

  // Real-time simulation: every 5 seconds, decrease wait times and eventually move queue
  useEffect(() => {
    if (!isSimulating) return;
    
    const interval = setInterval(() => {
      setQueue(prevQueue => {
        // Find current patient (in-progress)
        const inProgressIndex = prevQueue.findIndex(p => p.status === 'in-progress');
        if (inProgressIndex !== -1 && inProgressIndex === 0) {
          // Remove the first patient (completed) after some time? Actually simulate progress.
          // For demo, we'll reduce wait times and occasionally advance queue.
          // Let's simulate: every 15 seconds, move the first waiting to in-progress
          // But to keep it simple, we'll just reduce wait times by 1 minute each tick
          const updated = prevQueue.map(p => {
            if (p.status === 'waiting' && p.estimatedTime > 0) {
              return { ...p, estimatedTime: Math.max(0, p.estimatedTime - 1) };
            }
            return p;
          });
          return updated;
        }
        return prevQueue;
      });

      // Update current patient info based on new queue
      setCurrentPatient(prev => {
        // Find the token A105 in new queue
        const foundIndex = queue.findIndex(p => p.token === 'A105');
        if (foundIndex !== -1) {
          const patient = queue[foundIndex];
          const wait = patient.estimatedTime;
          const position = foundIndex + 1;
          return {
            ...prev,
            position,
            estimatedWait: wait,
            status: wait === 0 ? 'now-serving' : 'waiting'
          };
        } else {
          // If token not found, assume already served
          return { ...prev, status: 'served', estimatedWait: 0, position: 0 };
        }
      });

      setLastUpdated(new Date());
    }, 5000); // update every 5 seconds for demo

    return () => clearInterval(interval);
  }, [queue, isSimulating]);

  // Manual refresh button
  const refreshQueue = () => {
    setQueue(generateMockQueue());
    setCurrentPatient({
      name: 'You',
      token: 'A105',
      position: 2,
      estimatedWait: 15,
      status: 'waiting'
    });
    setLastUpdated(new Date());
  };

  // Helper for status icon
  const getStatusIcon = (status) => {
    if (status === 'in-progress') return <FaSpinner className="animate-spin text-blue-500" />;
    if (status === 'waiting') return <FaUserClock className="text-gray-400" />;
    if (status === 'now-serving') return <FaBell className="text-green-500 animate-pulse" />;
    if (status === 'served') return <FaCheckCircle className="text-emerald-500" />;
    return <FaClock className="text-gray-400" />;
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'in-progress': return 'In Consultation';
      case 'waiting': return 'Waiting';
      case 'now-serving': return 'Now Serving - Please proceed';
      case 'served': return 'Completed';
      default: return 'Queued';
    }
  };

  // Calculate wait time display
  const formatWaitTime = (minutes) => {
    if (minutes <= 0) return 'Now';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // List of patients ahead (excluding current)
  const patientsAhead = queue.filter(p => p.status === 'waiting' && p.token !== currentPatient.token);
  const nextPatients = patientsAhead.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mb-3">
            <FaHospitalUser className="text-teal-600" />
            <span className="text-sm font-medium text-gray-600">Real-Time Queue Status</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Waiting Room Queue</h1>
          <p className="text-gray-500 mt-1">Track your position and estimated wait time</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Current Patient Status Banner */}
          <div className={`p-6 ${currentPatient.status === 'now-serving' ? 'bg-green-50' : currentPatient.status === 'served' ? 'bg-gray-50' : 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${currentPatient.status === 'now-serving' || currentPatient.status === 'served' ? 'bg-white text-teal-600' : 'bg-white/20 text-white'}`}>
                  {currentPatient.token}
                </div>
                <div>
                  <p className="text-sm opacity-80">Your Token Number</p>
                  <p className="text-2xl font-bold">{currentPatient.token}</p>
                  <div className="flex items-center gap-1 text-sm mt-1">
                    {getStatusIcon(currentPatient.status)}
                    <span className={currentPatient.status === 'now-serving' ? 'font-semibold' : ''}>
                      {getStatusText(currentPatient.status)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                {currentPatient.status === 'waiting' && (
                  <>
                    <p className="text-sm opacity-80">Position in queue</p>
                    <p className="text-4xl font-bold">{currentPatient.position}</p>
                    <p className="text-sm mt-1 flex items-center gap-1 justify-center md:justify-end">
                      <FaHourglassHalf /> Est. wait: {formatWaitTime(currentPatient.estimatedWait)}
                    </p>
                  </>
                )}
                {currentPatient.status === 'now-serving' && (
                  <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                    Please proceed to Room 3
                  </div>
                )}
                {currentPatient.status === 'served' && (
                  <div className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Consultation completed
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Real-time info bar */}
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <FaClock />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
            <button 
              onClick={refreshQueue}
              className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
            >
              Refresh <FaArrowRight className="text-xs" />
            </button>
          </div>

          {/* Queue Progress Visualization */}
          {currentPatient.status === 'waiting' && (
            <div className="px-6 py-4 bg-white border-b border-gray-100">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-teal-600">Queue Progress</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-teal-600">
                      {Math.max(0, queue.length - currentPatient.position)} / {queue.length} ahead
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-100">
                  <div 
                    style={{ width: `${((queue.length - currentPatient.position) / queue.length) * 100}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-600 transition-all duration-500"
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Next Patients in Queue */}
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FaListOl className="text-teal-600" /> 
              Patients Ahead of You
              <span className="text-xs text-gray-400 ml-2">(Real-time updates)</span>
            </h3>
            
            {currentPatient.status === 'waiting' && nextPatients.length > 0 ? (
              <div className="space-y-3">
                {nextPatients.map((patient, idx) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{patient.name}</p>
                        <p className="text-xs text-gray-500">Token: {patient.token}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{formatWaitTime(patient.estimatedTime)}</p>
                      <p className="text-xs text-gray-400">Est. wait</p>
                    </div>
                  </div>
                ))}
                {patientsAhead.length > 4 && (
                  <div className="text-center text-sm text-gray-400 pt-2">
                    + {patientsAhead.length - 4} more patients ahead
                  </div>
                )}
              </div>
            ) : currentPatient.status === 'now-serving' ? (
              <div className="text-center py-8 bg-green-50 rounded-xl">
                <FaBell className="text-green-500 text-3xl mx-auto mb-2 animate-bounce" />
                <p className="text-green-700 font-medium">It's your turn! Please proceed to the consultation room.</p>
              </div>
            ) : currentPatient.status === 'served' ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl">
                <FaCheckCircle className="text-emerald-500 text-3xl mx-auto mb-2" />
                <p className="text-gray-700">You have been served. Thank you for visiting!</p>
                <button className="mt-3 text-teal-600 text-sm">Rate your experience</button>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <FaUserClock className="text-3xl mx-auto mb-2" />
                <p>No other patients ahead</p>
              </div>
            )}
          </div>

          {/* Live Stats Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-wrap justify-between gap-3 text-sm">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-gray-500">Total in queue:</span>
                <span className="font-semibold ml-1">{queue.filter(p => p.status === 'waiting').length}</span>
              </div>
              <div>
                <span className="text-gray-500">Currently serving:</span>
                <span className="font-semibold ml-1 text-blue-600">
                  {queue.find(p => p.status === 'in-progress')?.name || 'None'}
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <FaSpinner className="animate-spin" /> Live auto-refresh every 5 seconds
            </div>
          </div>
        </div>

        {/* Information Note */}
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Estimated wait times are approximate and may change based on consultation durations.</p>
          <p className="mt-1">For urgent concerns, please inform the front desk.</p>
        </div>
      </div>
    </div>
  );
};

export default QueueStatus;