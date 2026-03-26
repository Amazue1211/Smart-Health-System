import React from 'react';
import {
  CalendarDays,
  CheckCircle2,
  ListChecks,
  Hourglass,
  Search,
  CalendarPlus,
  Stethoscope,
  Ambulance,
  FileText,
  RefreshCw,
  Activity,
  Heart,
} from 'lucide-react';

const HealthCareDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-200">
              <Heart className="h-7 w-7 text-white" strokeWidth={1.8} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                HealthCare+
              </h1>
              <p className="text-slate-500 text-sm font-medium tracking-wide">Smart Healthcare System</p>
            </div>
          </div>
          <div className="relative max-w-md w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Dashboard Title */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            Your Health Dashboard
          </h2>
          <p className="text-slate-500 mt-1 text-base">
            Manage your appointments and find healthcare providers
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {/* Upcoming Appointments Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow duration-300 group">
            <div className="flex items-start justify-between mb-3">
              <div className="bg-blue-50 p-2.5 rounded-xl group-hover:bg-blue-100 transition">
                <CalendarDays className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">Active</span>
            </div>
            <div className="mb-2">
              <p className="text-slate-500 text-sm font-medium">Upcoming Appointments</p>
              <p className="text-4xl font-bold text-slate-800 mt-1">2</p>
              <p className="text-sm text-slate-500 mt-0.5">Next 30 days</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 border-t border-slate-100 pt-3 mt-2">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Updated just now</span>
            </div>
          </div>

          {/* Completed Visits Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow duration-300 group">
            <div className="flex items-start justify-between mb-3">
              <div className="bg-emerald-50 p-2.5 rounded-xl group-hover:bg-emerald-100 transition">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">History</span>
            </div>
            <div className="mb-2">
              <p className="text-slate-500 text-sm font-medium">Completed Visits</p>
              <p className="text-4xl font-bold text-slate-800 mt-1">1</p>
              <p className="text-sm text-slate-500 mt-0.5">This year</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 border-t border-slate-100 pt-3 mt-2">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Updated just now</span>
            </div>
          </div>

          {/* Total Appointments Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow duration-300 group">
            <div className="flex items-start justify-between mb-3">
              <div className="bg-purple-50 p-2.5 rounded-xl group-hover:bg-purple-100 transition">
                <ListChecks className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">Lifetime</span>
            </div>
            <div className="mb-2">
              <p className="text-slate-500 text-sm font-medium">Total Appointments</p>
              <p className="text-4xl font-bold text-slate-800 mt-1">3</p>
              <p className="text-sm text-slate-500 mt-0.5">All time</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 border-t border-slate-100 pt-3 mt-2">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Updated just now</span>
            </div>
          </div>

          {/* Next Appointment Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow duration-300 group">
            <div className="flex items-start justify-between mb-3">
              <div className="bg-amber-50 p-2.5 rounded-xl group-hover:bg-amber-100 transition">
                <Hourglass className="h-6 w-6 text-amber-600" />
              </div>
              <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">Upcoming</span>
            </div>
            <div className="mb-2">
              <p className="text-slate-500 text-sm font-medium">Next Appointment</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-bold text-slate-800">2</span>
                <span className="text-slate-500 text-lg font-medium">days</span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">Time remaining</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 border-t border-slate-100 pt-3 mt-2">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Updated just now</span>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            Quick Access
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="group flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-blue-300 rounded-xl py-3.5 px-4 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-blue-50/30">
              <CalendarPlus className="h-5 w-5 text-blue-600 group-hover:scale-105 transition" />
              <span className="font-medium text-slate-700 group-hover:text-blue-700">My Appointments</span>
            </button>
            <button className="group flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-blue-300 rounded-xl py-3.5 px-4 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-blue-50/30">
              <Stethoscope className="h-5 w-5 text-emerald-600 group-hover:scale-105 transition" />
              <span className="font-medium text-slate-700 group-hover:text-emerald-700">Find Doctors</span>
            </button>
            <button className="group flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-red-300 rounded-xl py-3.5 px-4 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-red-50/30">
              <Ambulance className="h-5 w-5 text-red-600 group-hover:scale-105 transition" />
              <span className="font-medium text-slate-700 group-hover:text-red-700">Emergency</span>
            </button>
            <button className="group flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-blue-300 rounded-xl py-3.5 px-4 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-blue-50/30">
              <FileText className="h-5 w-5 text-indigo-600 group-hover:scale-105 transition" />
              <span className="font-medium text-slate-700 group-hover:text-indigo-700">Medical History</span>
            </button>
          </div>
        </div>

        {/* Optional Decorative Note - mimics live update status */}
        <div className="mt-8 text-center text-xs text-slate-400 flex items-center justify-center gap-1 border-t border-slate-100 pt-6">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span>All health data is secure & encrypted • Real-time sync</span>
        </div>
      </div>
    </div>
  );
};

export default HealthCareDashboard;