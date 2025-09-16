import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const enrollmentData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Enrollments",
      data: [350, 450, 400, 300, 420, 380],
      backgroundColor: "#2563eb", // Indigo 600
      borderRadius: 5,
    },
  ],
};

const enrollmentOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "#374151", // Gray-700
        font: { size: 14 },
      },
    },
    title: {
      display: true,
      text: "Enrollment Trends per Month",
      color: "#111827", // Gray-900
      font: { size: 18, weight: "bold" },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#374151",
      },
      barPercentage: 0.4,
      categoryPercentage: 0.5,
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#374151",
        stepSize: 100,
      },
      grid: {
        color: "#e5e7eb", // Gray-200
      },
    },
  },
};

const ANNOUNCEMENTS = [
  "EXPRESSION OF INTEREST for ‘Development of Indigenous Technology for Armour Grade Ceramic Materials for Body Armour Applications’ With Industry",
  "Call for Applications: Transformative Leadership in STEMM (TLS) Workshop for Advanced PhD Scholars from SC/ST community.",
  "Joint PhD: Univ. of Queensland & IIT Delhi",
  "Convocation Pictures 2025",
  "Department of Management Studies launches 2 Year Executive MBA Program.",
  "Rules, Charges and Form for Visiting Students (UG)",
  "Hostel related information",
];

const AdminLanding = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  // Dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
    totalStudents: 1247,
    pendingAdmissions: 23,
    totalFeeCollected: 2850000,
    pendingFees: 125000,
    hostelOccupancy: 342,
    availableRooms: 58,
    libraryBooks: 15420,
    booksIssued: 823,
  });

  // Notifications state - add notification management here
  const [notifications, setNotifications] = useState([
    "New admission request from Alice.",
    "Hostel occupancy reached 90%.",
    "Monthly fee collection at 89%.",
    "System maintenance scheduled for 12 AM.",
    "Work In Progress",
    "Wait",
  ]);
  const [newNotification, setNewNotification] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleLogout = () => {
    setCurrentView("dashboard");
    // Assuming setIsLoggedIn and other states exist, but omitted as per original code
  };

  const openGoogleSheets = (type) => {
    // Open Google Sheets for different data management
    const googleSheetsUrl = "https://sheets.google.com/";
    window.open(googleSheetsUrl, "_blank");
    alert(
      `Opening Google Sheets for ${type} management. Please create a new spreadsheet for ${type} data.`
    );
  };

  const openGoogleForms = () => {
    // Open Google Forms for admission applications
    const googleFormsUrl = "https://forms.google.com/";
    window.open(googleFormsUrl, "_blank");
    alert("Opening Google Forms to create admission application forms.");
  };

  const openGoogleDrive = () => {
    // Open Google Drive for document storage
    const googleDriveUrl = "https://drive.google.com/";
    window.open(googleDriveUrl, "_blank");
    alert("Opening Google Drive for document storage and management.");
  };

  // Notification management handlers
  const handleAddNotification = () => {
    const trimmed = newNotification.trim();
    if (trimmed.length > 0) {
      setNotifications([trimmed, ...notifications]);
      setNewNotification("");
    }
  };

  const handleEditNotification = (index) => {
    setEditIndex(index);
    setEditValue(notifications[index]);
  };

  const handleSaveEdit = (index) => {
    const trimmed = editValue.trim();
    if (trimmed.length > 0) {
      const updated = [...notifications];
      updated[index] = trimmed;
      setNotifications(updated);
      setEditIndex(null);
      setEditValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  const handleDeleteNotification = (index) => {
    const updated = notifications.filter((_, i) => i !== index);
    setNotifications(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setEditValue("");
    }
  };

  // Modified handleNavScroll to maintain previous behavior
  const handleNavScroll = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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
                <h1 className="text-xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  College Management System
                </p>
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
              onClick={() => setCurrentView("dashboard")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === "dashboard"
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              📊 Dashboard Overview
            </button>
            <button
              onClick={() => setCurrentView("admissions")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === "admissions"
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              🎓 Admission Management
            </button>
            <button
              onClick={() => setCurrentView("fees")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === "fees"
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              💰 Fee Management
            </button>
            <button
              onClick={() => setCurrentView("hostel")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === "hostel"
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              🏠 Hostel Management
            </button>
            <button
              onClick={() => setCurrentView("library")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === "library"
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              📚 Library Management
            </button>
            <button
              onClick={() => setCurrentView("analytics")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === "analytics"
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              📈 Analytics Dashboard
            </button>
            <button
              onClick={() => setCurrentView("notifications")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === "notifications"
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              🔔 Notification Management
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          {/* Dashboard Overview */}
          {currentView === "dashboard" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Dashboard Overview
              </h2>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Students
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardStats.totalStudents.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-3xl">👥</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Pending Admissions
                      </p>
                      <p className="text-2xl font-bold text-orange-600">
                        {dashboardStats.pendingAdmissions}
                      </p>
                    </div>
                    <div className="text-3xl">📝</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Fee Collection
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        ₹
                        {(dashboardStats.totalFeeCollected / 100000).toFixed(1)}
                        L
                      </p>
                    </div>
                    <div className="text-3xl">💰</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Hostel Occupancy
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {dashboardStats.hostelOccupancy}/
                        {dashboardStats.hostelOccupancy +
                          dashboardStats.availableRooms}
                      </p>
                    </div>
                    <div className="text-3xl">🏠</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={openGoogleForms}
                    className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
                  >
                    <div className="text-2xl mb-2">📋</div>
                    <div className="text-sm font-medium text-blue-700">
                      Create Admission Form
                    </div>
                  </button>
                  <button
                    onClick={() => openGoogleSheets("Fee")}
                    className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors"
                  >
                    <div className="text-2xl mb-2">💳</div>
                    <div className="text-sm font-medium text-green-700">
                      Manage Fee Records
                    </div>
                  </button>
                  <button
                    onClick={() => openGoogleSheets("Hostel")}
                    className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors"
                  >
                    <div className="text-2xl mb-2">🏠</div>
                    <div className="text-sm font-medium text-purple-700">
                      Room Allocation
                    </div>
                  </button>
                  <button
                    onClick={openGoogleDrive}
                    className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors"
                  >
                    <div className="text-2xl mb-2">📁</div>
                    <div className="text-sm font-medium text-gray-700">
                      Document Storage
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Admission Management */}
          {currentView === "admissions" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Admission Management
                </h2>
                <button
                  onClick={openGoogleForms}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Application Form
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Admission Data Management
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Manage admission applications and student data using Google
                  Workspace tools. Create forms, collect applications, and track
                  admission status efficiently.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={openGoogleForms}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    🔗 Open Google Forms for Applications
                  </button>
                  <button
                    onClick={() => openGoogleSheets("Admission")}
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
          {currentView === "fees" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Fee Management
                </h2>
                <button
                  onClick={() => openGoogleSheets("Fee")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Open Fee Records
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Fee Collection Management
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Track fee payments, generate receipts, and manage student
                  financial records using integrated Google Workspace tools for
                  seamless operations.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => openGoogleSheets("Fee Records")}
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
          {currentView === "hostel" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Hostel Management
                </h2>
                <button
                  onClick={() => openGoogleSheets("Hostel")}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Open Room Records
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Hostel Facility Management
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Manage room allocations, track occupancy, handle booking
                  requests, and maintain hostel records using Google Workspace
                  integration.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => openGoogleSheets("Room Allocation")}
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
          {currentView === "library" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Library Management
                </h2>
                <button
                  onClick={() => openGoogleSheets("Library")}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Open Book Catalog
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Library Resource Management
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Catalog books, track lending records, manage digital
                  resources, and maintain library operations using Google
                  Workspace tools.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => openGoogleSheets("Book Catalog")}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    📊 Book Catalog Sheet
                  </button>
                  <button
                    onClick={() => openGoogleSheets("Issue Tracker")}
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
          {currentView === "analytics" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Analytics Dashboard
                </h2>
                <button
                  onClick={() => openGoogleSheets("Analytics")}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Open Data Analytics
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Enrollment Trends with Bar Chart */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Enrollment Trends
                  </h3>
                  <div className="text-center py-8">
                    <Bar data={enrollmentData} options={enrollmentOptions} />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Financial Analytics
                  </h3>
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">💹</div>
                    <p className="text-gray-600">
                      Fee collection patterns and financial reports integration
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Comprehensive Analytics
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Generate detailed reports, visualize data trends, and make
                  data-driven decisions using integrated analytics tools from
                  Google Workspace.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => openGoogleSheets("Analytics Dashboard")}
                    className="block w-full max-w-md mx-auto px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                  >
                    📊 Open Analytics Dashboard
                  </button>
                  <button
                    onClick={() => openGoogleSheets("Reports Generator")}
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

          {/* Notification Management */}
          {currentView === "notifications" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Notification Management
              </h2>

              {/* Add Notification */}
              <div className="mb-6 max-w-xl">
                <label
                  htmlFor="new-notification"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Add New Notification
                </label>
                <textarea
                  id="new-notification"
                  rows={3}
                  value={newNotification}
                  onChange={(e) => setNewNotification(e.target.value)}
                  placeholder="Type new notification here..."
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 transition"
                />
                <button
                  onClick={handleAddNotification}
                  className="mt-3 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Add Notification
                </button>
              </div>

              {/* Notifications List */}
              <div className="max-w-xl space-y-4">
                {notifications.length === 0 && (
                  <p className="text-gray-500 italic">
                    No notifications available.
                  </p>
                )}
                {notifications.map((note, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 shadow border border-gray-200 flex items-start justify-between space-x-4"
                  >
                    <div className="flex-1">
                      {editIndex === idx ? (
                        <>
                          <textarea
                            rows={2}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 transition"
                          />
                          <div className="mt-2 space-x-2">
                            <button
                              onClick={() => handleSaveEdit(idx)}
                              className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-800">{note}</p>
                      )}
                    </div>
                    {editIndex !== idx && (
                      <div className="flex flex-col space-y-1">
                        <button
                          title="Edit"
                          onClick={() => handleEditNotification(idx)}
                          className="text-indigo-600 hover:text-indigo-800 transition"
                        >
                          ✏️
                        </button>
                        <button
                          title="Delete"
                          onClick={() => handleDeleteNotification(idx)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminLanding;
