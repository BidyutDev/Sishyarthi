import React, { useState, useEffect } from 'react';

const CollegeERPSystem = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 1247,
    feeCollectionRate: 89,
    hostelOccupancy: 342,
    newAdmissions: 156
  });

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Simulate real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalStudents: Math.max(0, prev.totalStudents + Math.floor(Math.random() * 3) - 1),
        feeCollectionRate: Math.max(0, Math.min(100, prev.feeCollectionRate + Math.floor(Math.random() * 3) - 1)),
        hostelOccupancy: Math.max(0, prev.hostelOccupancy + Math.floor(Math.random() * 3) - 1),
        newAdmissions: Math.max(0, prev.newAdmissions + Math.floor(Math.random() * 3) - 1)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleActionClick = (actionName) => {
    alert(`${actionName} - This would integrate with your Google Workspace/Microsoft 365 tools`);
  };

  const moduleData = [
    {
      id: 'admissions',
      icon: '🎓',
      title: 'Admissions Management',
      description: 'Streamline student intake with automated forms, document verification, and real-time application tracking through Google Forms and Sheets integration.',
      bgColor: 'from-cyan-400 to-cyan-600',
      actions: [
        { name: '📝 New Application Form', primary: true },
        { name: '📊 View Applications Database', primary: false },
        { name: '✅ Admission Status Updates', primary: false }
      ]
    },
    {
      id: 'finance',
      icon: '💰',
      title: 'Fee Management',
      description: 'Automate fee collection, generate digital receipts, and track payment status with integrated email notifications and SMS alerts.',
      bgColor: 'from-yellow-400 to-orange-500',
      actions: [
        { name: '💳 Record Payment', primary: true },
        { name: '🧾 Generate Receipt', primary: false },
        { name: '📈 Payment Reports', primary: false }
      ]
    },
    {
      id: 'hostel',
      icon: '🏠',
      title: 'Hostel & Facilities',
      description: 'Manage room allocations, library resources, and facility bookings with real-time availability tracking and automated notifications.',
      bgColor: 'from-green-400 to-emerald-600',
      actions: [
        { name: '🏠 Room Allocation', primary: true },
        { name: '📚 Library Management', primary: false },
        { name: '📊 Occupancy Reports', primary: false }
      ]
    },
    {
      id: 'analytics',
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Real-time insights and comprehensive reports powered by Google Data Studio and Power BI with automated data visualization.',
      bgColor: 'from-purple-400 to-purple-600',
      actions: [
        { name: '📈 Live Dashboard', primary: true },
        { name: '📊 Custom Reports', primary: false },
        { name: '📧 Automated Reports', primary: false }
      ]
    }
  ];

  const integrationServices = [
    { name: 'Google Workspace', icon: 'G', status: 'Connected', color: 'bg-blue-500' },
    { name: 'Microsoft 365', icon: 'M', status: 'Connected', color: 'bg-blue-600' },
    { name: 'Forms Integration', icon: 'F', status: 'Active', color: 'bg-green-500' },
    { name: 'Sheets Database', icon: 'S', status: 'Synced', color: 'bg-green-600' },
    { name: 'Power Automate', icon: 'P', status: 'Processing', color: 'bg-purple-600' },
    { name: 'Data Studio', icon: 'A', status: 'Live', color: 'bg-purple-500' }
  ];

  const workflows = [
    {
      title: 'Admission Processing',
      description: 'Form submission → Auto-populate database → Send confirmation email → Notify admissions team',
      color: 'border-l-indigo-500 bg-indigo-50 dark:bg-indigo-900/20',
      textColor: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      title: 'Fee Collection',
      description: 'Payment recorded → Generate digital receipt → SMS notification → Update student status',
      color: 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      title: 'Hostel Allocation',
      description: 'Room request → Check availability → Auto-assign → Send room details → Update occupancy',
      color: 'border-l-green-500 bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    }
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 dark:from-gray-900 dark:to-gray-800">
        
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-white/20 dark:border-gray-700/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              
              {/* Logo Section */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  ERP
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">College Management System</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cloud-Integrated ERP Solution</p>
                </div>
              </div>

              {/* User Info & Theme Toggle */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center justify-center text-lg hover:scale-110 hover:rotate-12 shadow-lg"
                  title="Toggle dark mode"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>
                <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-semibold text-gray-700 dark:text-gray-300">
                  AD
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Dashboard Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
              Student Management Hub
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Integrated ERP system powered by Google Workspace & Microsoft 365 tools for seamless student administration
            </p>
          </div>

          {/* Statistics Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white text-center mb-6">📊 Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 dark:border-gray-700/50 shadow-lg">
                <div className="text-3xl font-bold text-indigo-600 dark:text-cyan-400 mb-1">
                  {stats.totalStudents.toLocaleString()}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Total Students</div>
              </div>
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 dark:border-gray-700/50 shadow-lg">
                <div className="text-3xl font-bold text-indigo-600 dark:text-cyan-400 mb-1">
                  {stats.feeCollectionRate}%
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Fee Collection Rate</div>
              </div>
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 dark:border-gray-700/50 shadow-lg">
                <div className="text-3xl font-bold text-indigo-600 dark:text-cyan-400 mb-1">
                  {stats.hostelOccupancy.toLocaleString()}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Hostel Occupancy</div>
              </div>
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 dark:border-gray-700/50 shadow-lg">
                <div className="text-3xl font-bold text-indigo-600 dark:text-cyan-400 mb-1">
                  {stats.newAdmissions.toLocaleString()}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">New Admissions</div>
              </div>
            </div>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {moduleData.map((module) => (
              <div
                key={module.id}
                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.bgColor} flex items-center justify-center text-white text-2xl shadow-lg`}>
                    {module.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{module.title}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {module.description}
                </p>
                
                <div className="space-y-3">
                  {module.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleActionClick(action.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        action.primary
                          ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400'
                      } hover:translate-x-1`}
                    >
                      <span>{action.name}</span>
                      <span className="text-lg">→</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Integration Status Panel */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-gray-700/50 shadow-xl mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              🔗 Cloud Integration Status
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {integrationServices.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 p-4 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50"
                >
                  <div className={`w-8 h-8 ${service.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                    {service.icon}
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{service.name}</div>
                    <div className={`text-xs ${
                      service.status === 'Processing' 
                        ? 'text-yellow-600 dark:text-yellow-400' 
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {service.status === 'Processing' ? '⚡' : '✅'} {service.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Information */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-gray-700/50 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              ⚡ Automated Workflows
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workflows.map((workflow, index) => (
                <div
                  key={index}
                  className={`p-6 border-l-4 rounded-r-lg ${workflow.color}`}
                >
                  <h4 className={`font-bold ${workflow.textColor} mb-3`}>
                    {workflow.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {workflow.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
    );
  };

export default CollegeERPSystem;