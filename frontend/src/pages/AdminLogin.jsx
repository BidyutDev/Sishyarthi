import {useState , useEffect} from "react";
const AdminLogin = () => {

      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [adminData, setAdminData] = useState({
        adminId: '',
        password: '',
        captcha: ''
      });
      
      // Captcha system
      const [captchaText, setCaptchaText] = useState('');
      const [captchaAnswer, setCaptchaAnswer] = useState(0);
      
    
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
}


export default AdminLogin