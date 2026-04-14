import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStethoscope, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === 'admin@healthcare.com' && password === 'admin123') {
        console.log('Login successful');
        // Redirect to Home (which will show admin dashboard)
        navigate('/admindashboard');
      } else if (email === 'doctor@healthcare.com' && password === 'doctor123') {
        console.log('Doctor login successful');
        navigate('/doctordashboard');
      } else if (email === 'patient@healthcare.com' && password === 'patient123') {
        console.log('Patient login successful');
        navigate('/patientdashboard');
      } else {
        setError('Invalid email or password. Try: admin@healthcare.com / admin123');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Logo & Header */}
          <div className="text-center pt-8 pb-6 px-6">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg">
                <FaStethoscope className="text-white text-4xl" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">HealthCare+</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-5">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition"
                  placeholder="admin@healthcare.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition"
                  placeholder="••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Demo Credentials */}
            <div className="pt-4 text-center border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2">Demo Credentials</p>
              <div className="space-y-1 text-xs text-gray-500">
                <p><span className="font-medium">Admin:</span> admin@healthcare.com / admin123</p>
                <p><span className="font-medium">Doctor:</span> doctor@healthcare.com / doctor123</p>
                <p><span className="font-medium">Patient:</span> patient@healthcare.com / patient123</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;