import { useState, useEffect, useRef } from "react";
import sishyarthi from "../assets/Sishyarthi.svg";

const NAV_LINKS = [
  { id: "merit-list", label: "Merit List" },
  { id: "notice", label: "Notice" },
  { id: "programme-info", label: "Programme Information" },
  { id: "faq", label: "FAQ" },
  { id: "stats", label: "Statistics" },
  { id: "testimonials", label: "Reviews" }
];

const statTargets = {
  students: 10000,
  faculty: 600,
  staff: 700,
};

const statDurations = {
  students: 1000, // ms
  faculty: 900,
  staff: 800,
};

const ANNOUNCEMENTS = [
  "EXPRESSION OF INTEREST for 'Development of Indigenous Technology for Armour Grade Ceramic Materials for Body Armour Applications' With Industry",
  "Call for Applications: Transformative Leadership in STEMM (TLS) Workshop for Advanced PhD Scholars from SC/ST community.",
  "Joint PhD: Univ. of Queensland & IIT Delhi",
  "Convocation Pictures 2025",
  "Department of Management Studies launches 2 Year Executive MBA Program.",
  "Rules, Charges and Form for Visiting Students (UG)",
  "Hostel related information"
];

const Landing = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Animated display for stats
  const [displayStats, setDisplayStats] = useState({
    students: 0,
    faculty: 0,
    staff: 0,
  });

  // New state to control animation trigger
  const [statsAnimationStarted, setStatsAnimationStarted] = useState(false);

  // Ref to stats section element
  const statsSectionRef = useRef(null);

  // ShowNotifications and ref
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);

  const notifications = [
    "New admission request from Alice.",
    "Hostel occupancy reached 90%.",
    "Monthly fee collection at 89%.",
    "System maintenance scheduled for 12 AM.",
    "Work In Progress",
    "Wait",
  ];

  // Scroll event handler to detect stats section entering viewport to start animation
  useEffect(() => {
    const handleScroll = () => {
      if (statsAnimationStarted) return; // already started
      
      const statsSection = statsSectionRef.current;
      if (!statsSection) return;
      const rect = statsSection.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        setStatsAnimationStarted(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [statsAnimationStarted]);

  // Animate stats only when triggered
  useEffect(() => {
    if (!statsAnimationStarted) return;

    let rafId;
    const start = performance.now();
    function animate(now) {
      const elapsed = now - start;
      setDisplayStats(prev => {
        const next = { ...prev };
        for (const key of Object.keys(statTargets)) {
          const duration = statDurations[key];
          if (elapsed < duration) {
            next[key] = Math.floor(statTargets[key] * (elapsed / duration));
          } else {
            next[key] = statTargets[key];
          }
        }
        return next;
      });
      if (
        elapsed < statDurations.students ||
        elapsed < statDurations.faculty ||
        elapsed < statDurations.staff
      ) {
        rafId = requestAnimationFrame(animate);
      }
    }
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [statsAnimationStarted]);

  // Notification logic unchanged...
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        event.target.id !== "notification-icon"
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    alert(
      "Login functionality would integrate with your authentication system"
    );
    setShowAuth(false);
  };

  const handleRegister = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      alert("Please fill in all required fields");
      return;
    }
    setAuthMode("otp");
  };

  const handleOtpVerification = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      alert(`Account created successfully! Welcome ${formData.firstName}!`);
      setShowAuth(false);
      setAuthMode("login");
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      });
      setOtp(["", "", "", "", "", ""]);
      setAgreeTerms(false);
      generateCaptcha();
    } else {
      alert("Please enter the complete 6-digit OTP");
    }
  };

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Dean of Admissions",
      message:
        "This ERP system has revolutionized our admission process. Everything is now automated and efficient.",
      avatar: "👩‍🏫",
    },
    {
      name: "Mark Thompson",
      role: "Finance Director",
      message:
        "Fee collection has never been easier. The automated receipts and tracking save us hours every day.",
      avatar: "👨‍💼",
    },
    {
      name: "Lisa Chen",
      role: "Student Services",
      message:
        "Students love the seamless experience. From admission to graduation, everything is integrated.",
      avatar: "👩‍💻",
    },
  ];

  // Modified handleNavScroll to also trigger stats animation if stats section clicked
  const handleNavScroll = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      if (id === "stats" && !statsAnimationStarted) {
        setStatsAnimationStarted(true);
      }
    }
  };

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
              <div className="w-15 h-15 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl border border-white/30">
                <img className="size-fit rounded-full" src={sishyarthi} alt="" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Sishyarthi</h1>
                <p className="text-sm text-white/80">Smart Management System</p>
              </div>
            </div>

            {/* Navigation & Auth */}
            <div className="flex items-center space-x-6 relative">
              <div className="hidden md:flex items-center space-x-6">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="text-white/90 hover:text-white transition-colors font-medium"
                    onClick={e => handleNavScroll(e, link.id)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Notification Icon */}
              <button
                id="notification-icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-white/90 hover:text-white hover:bg-white/20 rounded-lg border border-white/30 backdrop-blur-md transition-all duration-300"
                aria-label="Show Notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.917V5a2 2 0 10-4 0v.083A6.002 6.002 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-600"></span>
              </button>

              {/* Notifications Popup */}
              {showNotifications && (
                <div
                  ref={notificationsRef}
                  className="absolute right-16 top-14 w-80 h-96 max-h-80 overflow-auto bg-white/10 backdrop-blur-2xl rounded-xl border border-white/20 shadow-lg z-50 p-4 text-gray-100"
                  style={{
                    boxShadow: "0 8px 48px 0 rgba(31, 38, 135, 0.25)",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(156,163,175,0.4) transparent",
                  }}
                >
                  <style>{`
                    div::-webkit-scrollbar {
                      width: 8px;
                    }
                    div::-webkit-scrollbar-track {
                      background: transparent;
                    }
                    div::-webkit-scrollbar-thumb {
                      background-color: rgba(156,163,175,0.4);
                      border-radius: 10px;
                      border: 2px solid transparent;
                      background-clip: content-box;
                    }
                    div::-webkit-scrollbar-thumb:hover {
                      background-color: rgba(156,163,175,0.6);
                    }
                  `}</style>
                  <h3 className="font-semibold text-lg mb-3">Live Notifications</h3>
                  <ul className="space-y-2">
                    {notifications.length === 0 ? (
                      <li className="text-gray-400 text-sm italic">No new notifications</li>
                    ) : (
                      notifications.map((note, idx) => (
                        <li
                          key={idx}
                          className="bg-white/20 rounded-md p-2 shadow-sm backdrop-blur-lg text-gray-100"
                        >
                          {note}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}

              {/* Auth Buttons */}
              <button
                onClick={() => {
                  setShowAuth(true);
                  setAuthMode("login");
                }}
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/20 rounded-lg border border-white/30 backdrop-blur-md transition-all duration-300 font-medium"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowAuth(true);
                  setAuthMode("register");
                }}
                className="px-6 py-2 bg-white text-indigo-600 hover:bg-white/90 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Register
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative h-screen z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">
                College Management
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-10">
              Revolutionary cloud-integrated ERP system designed to streamline
              admissions, fee management, facility booking, and analytics with
              seamless automation and intelligent insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button
                onClick={() => {
                  setShowAuth(true);
                  setAuthMode("register");
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
        <section
          ref={statsSectionRef}
          id="stats"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-10"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">📊 Live Statistics</h2>
            <p className="text-xl text-white/80">Real-time data from our integrated systems</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/15">
              {/* Students */}
              <div className="text-5xl font-bold text-yellow-300 mb-1 group-hover:scale-110 transition-transform">
                {displayStats.students.toLocaleString()}+
              </div>
              <div className="uppercase tracking-wide text-yellow-200 font-semibold text-sm mb-2">STUDENTS</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/15">
              {/* Faculty */}
              <div className="text-5xl font-bold text-yellow-300 mb-1 group-hover:scale-110 transition-transform">
                {displayStats.faculty.toLocaleString()}+
              </div>
              <div className="uppercase tracking-wide text-yellow-200 font-semibold text-sm mb-2">FACULTY</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:bg-white/15">
              {/* Staff */}
              <div className="text-5xl font-bold text-yellow-300 mb-1 group-hover:scale-110 transition-transform">
                {displayStats.staff.toLocaleString()}+
              </div>
              <div className="uppercase tracking-wide text-yellow-200 font-semibold text-sm mb-2">STAFF</div>
            </div>
          </div>
        </section>

        {/* IMPORTANT ANNOUNCEMENTS Section - REDESIGNED */}
        <section
          id="important-announcements"
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-3 mb-3">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <h2 className="text-3xl font-bold text-white">
                IMPORTANT ANNOUNCEMENTS
              </h2>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-500"></div>
            </div>
            <p className="text-lg text-white/80">Stay updated with real-time notifications</p>
          </div>
          
          <div className="bg-white/8 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl max-w-4xl mx-auto overflow-hidden">
            {/* Header with live indicator */}
            <div className="bg-white/10 px-6 py-3 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm font-medium">Live Updates</span>
                </div>
                <span className="text-white/60 text-xs">Last updated: just now</span>
              </div>
            </div>
            
            {/* Scrollable announcements */}
            <div 
              className="h-80 overflow-y-auto p-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.3) transparent",
              }}
            >
              <style>{`
                .announcements-container::-webkit-scrollbar {
                  width: 6px;
                }
                .announcements-container::-webkit-scrollbar-track {
                  background: rgba(255,255,255,0.1);
                  border-radius: 3px;
                }
                .announcements-container::-webkit-scrollbar-thumb {
                  background-color: rgba(255,255,255,0.3);
                  border-radius: 3px;
                }
                .announcements-container::-webkit-scrollbar-thumb:hover {
                  background-color: rgba(255,255,255,0.5);
                }
              `}</style>
              <div className="announcements-container space-y-3">
                {ANNOUNCEMENTS.map((announcement, idx) => (
                  <div
                    key={idx}
                    className="group bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/15 shadow-md hover:shadow-lg hover:border-white/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {announcement.isNew ? (
                          <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        ) : (
                          <div className="w-4 h-4 bg-white/40 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <p className="text-white font-medium text-base leading-relaxed group-hover:text-white/95 transition-colors pr-2">
                            {announcement.text}
                          </p>
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-white/60 text-xs">{announcement.time}</span>
                          {announcement.isNew && (
                            <span className="px-2 py-0.5 bg-green-400/20 text-green-300 text-xs rounded-full font-medium">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer with button */}
            <div className="bg-white/5 px-6 py-4 border-t border-white/20">
              <div className="text-center">
                <button className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto text-sm">
                  <span>View All Announcements</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">💬 What People Say</h2>
            <p className="text-xl text-white/80">
              Trusted by educational institutions worldwide
            </p>
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
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of educational institutions already using our ERP
              system to streamline their operations.
            </p>
            <button
              onClick={() => {
                setShowAuth(true);
                setAuthMode("register");
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
              {authMode === "login" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Registered User Login
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Enter Registration Number OR Registered Email
                      </label>
                      <input
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                        placeholder="Enter Registration Number OR Registered Email"
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
                        <span className="text-gray-600 dark:text-gray-400">
                          Remember me
                        </span>
                      </label>
                      <a
                        href="#"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleLogin}
                    className="w-full mt-6 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                  >
                    Sign In
                  </button>

                  <div className="text-center mt-6">
                    <span className="text-gray-600 dark:text-gray-400">
                      Don't have an account?{" "}
                    </span>
                    <button
                      onClick={() => setAuthMode("register")}
                      className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              )}

              {/* Register Form */}
              {authMode === "register" && (
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
                    <span className="text-gray-600 dark:text-gray-400">
                      Already have an account?{" "}
                    </span>
                    <button
                      onClick={() => setAuthMode("login")}
                      className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              )}

              {/* OTP Verification */}
              {authMode === "otp" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                    Verify Your Number 📱
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                    We've sent a 6-digit verification code to
                    <br />
                    <strong className="text-indigo-600 dark:text-indigo-400">
                      {formData.phone}
                    </strong>
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
                          if (e.key === "Backspace" && !digit && index > 0) {
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Didn't receive the code?
                    </p>
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
              © 2025 College ERP System. All rights reserved. | Built with
              modern cloud integration
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;