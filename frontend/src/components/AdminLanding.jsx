import React, { useState, useEffect } from 'react';

const CollegeERPAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [adminData, setAdminData] = useState({
    adminId: '',
    password: '',
    captcha: ''
  });
  
  // Captcha system
  const [captchaText, setCaptchaText] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  
  // Dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
    totalStudents: 1247,
    pendingAdmissions: 23,
    totalFeeCollected: 2850000,
    pendingFees: 125000,
    hostelOccupancy: 342,
    availableRooms: 58,
    libraryBooks: 15420,
    booksIssued: 823
  });

  // Initialize captcha
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Generate mathematical captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer;
    let captchaString;
    
    switch(operation) {
      case '+':
        answer = num1 + num2;
        captchaString = `${num1} + ${num2}`;
        break;
      case '-':
        answer = Math.max(num1, num2) - Math.min(num1, num2);
        captchaString = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
        break;
      case '*':
        const smallNum1 = Math.floor(Math.random() * 10) + 1;
        const smallNum2 = Math.floor(Math.random() * 10) + 1;
        answer = smallNum1 * smallNum2;
        captchaString = `${smallNum1} × ${smallNum2}`;
        break;
      default:
        answer = num1 + num2;
        captchaString = `${num1} + ${num2}`;
    }
    
    setCaptchaText(captchaString);
    setCaptchaAnswer(answer);
  };

  const handleLogin = () => {
    if (!adminData.adminId || !adminData.password || !adminData.captcha) {
      alert('Please fill in all fields');
      return;
    }
    
    if (parseInt(adminData.captcha) !== captchaAnswer) {
      alert('Invalid captcha. Please try again.');
      generateCaptcha();
      setAdminData({...adminData, captcha: ''});
      return;
    }
    
    // Simple validation (in real app, this would be API call)
    if (adminData.adminId === 'admin' && adminData.password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAdminData({ adminId: '', password: '', captcha: '' });
    setCurrentView('dashboard');
    generateCaptcha();
  };

  const openGoogleSheets = (type) => {
    // Open Google Sheets for different data management
    const googleSheetsUrl = 'https://sheets.google.com/';
    window.open(googleSheetsUrl, '_blank');
    alert(`Opening Google Sheets for ${type} management. Please create a new spreadsheet for ${type} data.`);
  };

  const openGoogleForms = () => {
    // Open Google Forms for admission applications
    const googleFormsUrl = 'https://forms.google.com/';
    window.open(googleFormsUrl, '_blank');
    alert('Opening Google Forms to create admission application forms.');
  };

  const openGoogleDrive = () => {
    // Open Google Drive for document storage
    const googleDriveUrl = 'https://drive.google.com/';
    window.open(googleDriveUrl, '_blank');
    alert('Opening Google Drive for document storage and management.');
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-32 w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 px-4 sm:px-6 lg:px-8 pt-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-2xl border border-white/30">
                🔐
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
                <p className="text-sm text-white/80">College ERP Management</p>
              </div>
            </div>
          </div>
        </header>

        {/* Login Form */}
        <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-2xl">
                👨‍💼
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
              <p className="text-white/80">Secure access to management portal</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Admin ID
                </label>
                <input
                  type="text"
                  value={adminData.adminId}
                  onChange={(e) => setAdminData({...adminData, adminId: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/60 transition-all"
                  placeholder="Enter admin ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={adminData.password}
                  onChange={(e) => setAdminData({...adminData, password: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/60 transition-all"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Security Verification
                </label>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="bg-white/30 backdrop-blur-md px-4 py-3 rounded-lg border border-white/30 flex-1 text-center">
                    <span className="text-2xl font-bold text-white font-mono">{captchaText} = ?</span>
                  </div>
                  <button
                    onClick={generateCaptcha}
                    className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-all flex items-center justify-center text-white"
                    title="Refresh captcha"
                  >
                    🔄
                  </button>
                </div>
                <input
                  type="number"
                  value={adminData.captcha}
                  onChange={(e) => setAdminData({...adminData, captcha: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/60 transition-all"
                  placeholder="Enter the answer"
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-3 bg-white text-indigo-700 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-white/90 transition-all duration-300 hover:scale-105"
              >
                Login to Dashboard
              </button>

              <div className="text-center text-sm text-white/70">
                <p>Demo Credentials: admin / admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                ERP
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">College Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === 'dashboard' 
                  ? 'bg-indigo-100 text-indigo-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📊 Dashboard Overview
            </button>
            <button
              onClick={() => setCurrentView('admissions')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === 'admissions' 
                  ? 'bg-indigo-100 text-indigo-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              🎓 Admission Management
            </button>
            <button
              onClick={() => setCurrentView('fees')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === 'fees' 
                  ? 'bg-indigo-100 text-indigo-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              💰 Fee Management
            </button>
            <button
              onClick={() => setCurrentView('hostel')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === 'hostel' 
                  ? 'bg-indigo-100 text-indigo-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              🏠 Hostel Management
            </button>
            <button
              onClick={() => setCurrentView('library')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === 'library' 
                  ? 'bg-indigo-100 text-indigo-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📚 Library Management
            </button>
            <button
              onClick={() => setCurrentView('analytics')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === 'analytics' 
                  ? 'bg-indigo-100 text-indigo-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📈 Analytics Dashboard
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          
          {/* Dashboard Overview */}
          {currentView === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Students</p>
                      <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalStudents.toLocaleString()}</p>
                    </div>
                    <div className="text-3xl">👥</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Admissions</p>
                      <p className="text-2xl font-bold text-orange-600">{dashboardStats.pendingAdmissions}</p>
                    </div>
                    <div className="text-3xl">📝</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Fee Collection</p>
                      <p className="text-2xl font-bold text-green-600">₹{(dashboardStats.totalFeeCollected / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="text-3xl">💰</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Hostel Occupancy</p>
                      <p className="text-2xl font-bold text-blue-600">{dashboardStats.hostelOccupancy}/{dashboardStats.hostelOccupancy + dashboardStats.availableRooms}</p>
                    </div>
                    <div className="text-3xl">🏠</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={openGoogleForms}
                    className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
                  >
                    <div className="text-2xl mb-2">📋</div>
                    <div className="text-sm font-medium text-blue-700">Create Admission Form</div>
                  </button>
                  <button
                    onClick={() => openGoogleSheets('Fee')}
                    className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors"
                  >
                    <div className="text-2xl mb-2">💳</div>
                    <div className="text-sm font-medium text-green-700">Manage Fee Records</div>
                  </button>
                  <button
                    onClick={() => openGoogleSheets('Hostel')}
                    className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors"
                  >
                    <div className="text-2xl mb-2">🏠</div>
                    <div className="text-sm font-medium text-purple-700">Room Allocation</div>
                  </button>
                  <button
                    onClick={openGoogleDrive}
                    className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors"
                  >
                    <div className="text-2xl mb-2">📁</div>
                    <div className="text-sm font-medium text-gray-700">Document Storage</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Admission Management */}
          {currentView === 'admissions' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Admission Management</h2>
                <button
                  onClick={openGoogleForms}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Application Form
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Admission Data Management</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Manage admission applications and student data using Google Workspace tools. 
                  Create forms, collect applications, and track admission status efficiently.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={openGoogleForms}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    🔗 Open Google Forms for Applications
                  </button>
                  <button
                    onClick={() => openGoogleSheets('Admission')}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    📊 Open Google Sheets for Data
                  </button>
                  <button
                    onClick={openGoogleDrive}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    📁 Open Google Drive for Documents
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Fee Management */}
          {currentView === 'fees' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Fee Management</h2>
                <button
                  onClick={() => openGoogleSheets('Fee')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Open Fee Records
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fee Collection Management</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Track fee payments, generate receipts, and manage student financial records 
                  using integrated Google Workspace tools for seamless operations.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => openGoogleSheets('Fee Records')}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    📊 Open Fee Tracking Sheet
                  </button>
                  <button
                    onClick={openGoogleForms}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    📋 Create Payment Form
                  </button>
                  <button
                    onClick={openGoogleDrive}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    📁 Receipt Storage
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Hostel Management */}
          {currentView === 'hostel' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Hostel Management</h2>
                <button
                  onClick={() => openGoogleSheets('Hostel')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Open Room Records
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Hostel Facility Management</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Manage room allocations, track occupancy, handle booking requests, 
                  and maintain hostel records using Google Workspace integration.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => openGoogleSheets('Room Allocation')}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    📊 Room Allocation Sheet
                  </button>
                  <button
                    onClick={openGoogleForms}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    📋 Booking Request Form
                  </button>
                  <button
                    onClick={openGoogleDrive}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    📁 Hostel Documents
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Library Management */}
          {currentView === 'library' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Library Management</h2>
                <button
                  onClick={() => openGoogleSheets('Library')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Open Book Catalog
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Library Resource Management</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Catalog books, track lending records, manage digital resources, 
                  and maintain library operations using Google Workspace tools.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => openGoogleSheets('Book Catalog')}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    📊 Book Catalog Sheet
                  </button>
                  <button
                    onClick={() => openGoogleSheets('Issue Tracker')}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    📋 Issue/Return Tracker
                  </button>
                  <button
                    onClick={openGoogleDrive}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    📁 Digital Library
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Dashboard */}
          {currentView === 'analytics' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                <button
                  onClick={() => openGoogleSheets('Analytics')}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Open Data Analytics
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Trends</h3>
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📈</div>
                    <p className="text-gray-600">Interactive charts and graphs will be displayed here using Google Sheets integration</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Analytics</h3>
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">💹</div>
                    <p className="text-gray-600">Fee collection patterns and financial reports integration</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Comprehensive Analytics</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Generate detailed reports, visualize data trends, and make data-driven decisions 
                  using integrated analytics tools from Google Workspace.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => openGoogleSheets('Analytics Dashboard')}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                  >
                    📊 Open Analytics Dashboard
                  </button>
                  <button
                    onClick={() => openGoogleSheets('Reports Generator')}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    📋 Generate Custom Reports
                  </button>
                  <button
                    onClick={openGoogleDrive}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    📁 Export & Archive Reports
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CollegeERPAdmin;