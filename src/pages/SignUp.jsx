import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('streamvibe_users') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      alert('Email already registered! Please sign in.');
      return;
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };
    
    // Add to users array
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('streamvibe_users', JSON.stringify(users));
    
    alert('Account created successfully! Please sign in.');
    navigate('/signin');
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center relative py-8"
      style={{
        background: 'radial-gradient(ellipse at center, #1e1e2e 0%, #0d0d1b 100%)'
      }}
    >
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-black bg-opacity-85 rounded-lg p-6 md:p-8 shadow-2xl border border-gray-800">
          
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-1">Sign Up</h1>
          <p className="text-gray-400 text-xs mb-6">Create your account to get started</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white placeholder-gray-400 transition"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white placeholder-gray-400 transition"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                className="w-full px-4 py-3 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white placeholder-gray-400 transition"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="6"
                className="w-full px-4 py-3 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white placeholder-gray-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition duration-200 mt-2"
            >
              Sign Up
            </button>

            <p className="text-xs text-gray-500 leading-relaxed mt-3">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-blue-500 hover:underline">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>.
            </p>
          </form>

          <div className="mt-6 text-gray-400 text-sm">
            <p>
              Already have an account?{' '}
              <Link to="/signin" className="text-white hover:underline font-semibold transition">
                Sign in now
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
