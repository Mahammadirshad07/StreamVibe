import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('streamvibe_users') || '[]');
    
    // Find matching user
    const user = users.find(
      u => u.email === email && u.password === password
    );
    
    if (user) {
      // Save current user to localStorage
      localStorage.setItem('streamvibe_current_user', JSON.stringify(user));
      
      alert(`Welcome back, ${user.name}!`);
      navigate('/');
    } else {
      alert('Invalid email or password!');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
      }}
    >
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-black bg-opacity-80 rounded-lg p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <input
                type="email"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white placeholder-gray-400 transition"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white placeholder-gray-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded transition duration-200"
            >
              Sign In
            </button>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <label className="flex items-center cursor-pointer hover:text-gray-300 transition">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 w-4 h-4 cursor-pointer"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="hover:underline hover:text-gray-300 transition">
                Need help?
              </Link>
            </div>
          </form>

          <div className="mt-8 text-gray-400 text-base">
            <p>
              New to StreamVibe?{' '}
              <Link to="/signup" className="text-white hover:underline font-semibold transition">
                Sign up now
              </Link>
              .
            </p>
          </div>

          <div className="mt-4 text-xs text-gray-500 leading-relaxed">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <Link to="/learn-more" className="text-blue-500 hover:underline transition">
              Learn more
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
