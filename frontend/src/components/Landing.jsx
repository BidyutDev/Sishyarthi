import { useState, useEffect } from 'react';

const Landing = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'otp'
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [stats, setStats] = useState({
    totalStudents: 1247,
    feeCollectionRate: 89,
    hostelOccupancy: 342,
    newAdmissions: 156
  });


  // Simulate real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalStudents: Math.max(0, prev.totalStudents + Math.floor(Math.random() * 3) - 1),
        feeCollectionRate: Math.max(0, Math.min(100, prev.feeCollectionRate + Math.floor(Math.random() * 3) - 1)),
        hostelOccupancy: Math.max(0, prev.hostelOccupancy + Math.floor(Math.random() * 3) - 1),
        newAdmissions: Math.max(0, prev.newAdmissions + Math.floor(Math.random() * 3) - 1)
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    alert('Login functionality would integrate with your authentication system');
    setShowAuth(false);
  };

  const handleRegister = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }
    setAuthMode('otp');
  };

  const handleOtpVerification = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      alert(`Account created successfully! Welcome ${formData.firstName}!`);
      setShowAuth(false);
      setAuthMode('login');
      setFormData({
        firstName: '', middleName: '', lastName: '', email: '', phone: '', password: ''
      });
      setOtp(['', '', '', '', '', '']);
    } else {
      alert('Please enter the complete 6-digit OTP');
    }
  };

  const features = [
    {
      icon: '🎓',
      title: 'Smart Admissions',
      description: 'Automated application processing with document verification and real-time tracking.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: '💰',
      title: 'Digital Payments',
      description: 'Secure fee collection with instant receipts and automated payment reminders.',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: '🏠',
      title: 'Facility Management',
      description: 'Complete hostel and facility booking with real-time availability tracking.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: '📊',
      title: 'Analytics & Reports',
      description: 'Comprehensive insights with real-time data visualization and automated reporting.',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Dean of Admissions',
      message: 'This ERP system has revolutionized our admission process. Everything is now automated and efficient.',
      avatar: '👩‍🏫'
    },
    {
      name: 'Mark Thompson',
      role: 'Finance Director',
      message: 'Fee collection has never been easier. The automated receipts and tracking save us hours every day.',
      avatar: '👨‍💼'
    },
    {
      name: 'Lisa Chen',
      role: 'Student Services',
      message: 'Students love the seamless experience. From admission to graduation, everything is integrated.',
      avatar: '👩‍💻'
    }
  ];

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-32 w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 px-4 sm:px-6 lg:px-8 pt-6">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-2xl border border-white/30">
                ERP
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">College ERP</h1>
                <p className="text-sm text-white/80">Smart Management System</p>
              </div>
            </div>

            {/* Navigation & Auth */}
            <div className="flex items-center space-x-6">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-white/90 hover:text-white transition-colors font-medium">Features</a>
                <a href="#stats" className="text-white/90 hover:text-white transition-colors font-medium">Statistics</a>
                <a href="#testimonials" className="text-white/90 hover:text-white transition-colors font-medium">Reviews</a>
              </div>
              
              
              {/* Auth Buttons */}
              <button
                onClick={() => {
                  setShowAuth(true);
                  setAuthMode('login');
                }}
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/20 rounded-lg border border-white/30 backdrop-blur-md transition-all duration-300 font-medium"
              >
                Login
              </button>
              
              <button
                onClick={() => {
                  setShowAuth(true);
                  setAuthMode('register');
                }}
                className="px-6 py-2 bg-white text-indigo-600 hover:bg-white/90 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Register
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">
                College Management
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-10">
              Revolutionary cloud-integrated ERP system designed to streamline admissions, fee management, 
              facility booking, and analytics with seamless automation and intelligent insights.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button 
                onClick={() => {
                  setShowAuth(true);
                  setAuthMode('register');
                }}
                className="group px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <span>▶</span>
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">📊 Live Statistics</h2>
            <p className="text-xl text-white/80">Real-time data from our integrated systems</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/15">
              <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform">
                {stats.totalStudents.toLocaleString()}
              </div>
              <div className="text-white/80 font-medium text-lg mb-4">Total Students</div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full animate-pulse" style={{width: '85%'}}></div>
              </div>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/15">
              <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform">
                {stats.feeCollectionRate}%
              </div>
              <div className="text-white/80 font-medium text-lg mb-4">Fee Collection</div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full animate-pulse" style={{width: `${stats.feeCollectionRate}%`}}></div>
              </div>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/15">
              <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform">
                {stats.hostelOccupancy.toLocaleString()}
              </div>
              <div className="text-white/80 font-medium text-lg mb-4">Hostel Occupancy</div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full animate-pulse" style={{width: '70%'}}></div>
              </div>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/15">
              <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform">
                {stats.newAdmissions.toLocaleString()}
              </div>
              <div className="text-white/80 font-medium text-lg mb-4">New Admissions</div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-gradient-to-r from-pink-400 to-purple-500 h-3 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">🚀 Powerful Features</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive tools designed to streamline every aspect of college management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/15 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`}></div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`text-5xl group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                </div>
                
                <p className="text-white/80 text-lg leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="mt-6">
                  <button className={`px-6 py-3 bg-gradient-to-r ${feature.gradient} text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">💬 What People Say</h2>
            <p className="text-xl text-white/80">Trusted by educational institutions worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/90 italic">"{testimonial.message}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/20 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Institution?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of educational institutions already using our ERP system to streamline their operations.
            </p>
            <button 
              onClick={() => {
                setShowAuth(true);
                setAuthMode('register');
              }}
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              Start Your Free Trial
            </button>
          </div>
        </section>

        {/* Auth Modal */}
        {showAuth && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
              
              {/* Close Button */}
              <button
                onClick={() => setShowAuth(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 transition-colors"
              >
                ✕
              </button>

              {/* Login Form */}
              {authMode === 'login' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Welcome Back! 👋
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        placeholder="your.email@college.edu"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        placeholder="Enter your password"
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                      </label>
                      <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Forgot password?</a>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogin}
                    className="w-full mt-6 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                  >
                    Sign In
                  </button>
                  
                  <div className="text-center mt-6">
                    <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
                    <button
                      onClick={() => setAuthMode('register')}
                      className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              )}

              {/* Register Form */}
              {authMode === 'register' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Create Your Account 🎓
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                          placeholder="John"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Middle Name (Optional)
                      </label>
                      <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        placeholder="Michael (optional)"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        placeholder="john.doe@college.edu"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        placeholder="Create a strong password"
                      />
                    </div>

                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-2" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        I agree to the Terms of Service and Privacy Policy
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleRegister}
                    className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Create Account
                  </button>
                  
                  <div className="text-center mt-6">
                    <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
                    <button
                      onClick={() => setAuthMode('login')}
                      className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              )}

              {/* OTP Verification */}
              {authMode === 'otp' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                    Verify Your Number 📱
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                    We've sent a 6-digit verification code to<br />
                    <strong className="text-indigo-600 dark:text-indigo-400">{formData.phone}</strong>
                  </p>
                  
                  <div className="flex justify-center space-x-3 mb-6">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && index > 0) {
                            document.getElementById(`otp-${index - 1}`).focus();
                          }
                        }}
                        className="w-12 h-12 text-center text-xl font-bold border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        maxLength={1}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={handleOtpVerification}
                    className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Verify & Create Account
                  </button>
                  
                  <div className="text-center mt-4 space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Didn't receive the code?</p>
                    <button className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline text-sm">
                      Resend Code (60s)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="relative z-10 bg-white/5 backdrop-blur-md border-t border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white/70">
              © 2025 College ERP System. All rights reserved. | Built with modern cloud integration
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;