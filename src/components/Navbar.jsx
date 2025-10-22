import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black via-black/50 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 max-w-screen-2xl mx-auto">
        
        {/* LEFT: Logo */}
        <Link to="/" className="hover:opacity-80 transition flex-shrink-0">
          <span className="text-xl sm:text-2xl md:text-3xl font-black text-red-700 tracking-wide">
            STREAMVIBE
          </span>
        </Link>

        {/* CENTER: Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-6 lg:gap-8">
          <Link to="/" className="text-white hover:text-gray-300 transition font-semibold text-sm lg:text-base whitespace-nowrap">
            Home
          </Link>
          <Link to="/tv-shows" className="text-white hover:text-gray-300 transition font-semibold text-sm lg:text-base whitespace-nowrap">
            TV Shows
          </Link>
          <Link to="/movies" className="text-white hover:text-gray-300 transition font-semibold text-sm lg:text-base whitespace-nowrap">
            Movies
          </Link>
          <Link to="/new" className="text-white hover:text-gray-300 transition font-semibold text-sm lg:text-base whitespace-nowrap">
            New & Popular
          </Link>
          <Link to="/mylist" className="text-white hover:text-gray-300 transition font-semibold text-sm lg:text-base whitespace-nowrap">
            My List
          </Link>
        </div>

        {/* RIGHT: Search Bar & Sign In */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          
          {/* Search Bar - Always Visible on Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-gray-800 text-white px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-gray-700 w-48 lg:w-56 transition"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                <FaSearch />
              </button>
            </div>
          </form>

          {/* Sign In Button - Desktop */}
          <Link 
            to="/signin" 
            className="hidden lg:block bg-red-600 hover:bg-red-700 text-white px-4 lg:px-6 py-2 rounded font-semibold transition text-xs lg:text-sm whitespace-nowrap"
          >
            Sign In
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden text-white text-xl sm:text-2xl p-2"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-black bg-opacity-98 absolute top-full left-0 right-0 py-4 sm:py-6 px-4 sm:px-6 space-y-2 sm:space-y-4 shadow-2xl border-t border-gray-800">
          
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, TV shows..."
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button 
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-md transition font-semibold"
              >
                <FaSearch />
              </button>
            </div>
          </form>

          <Link 
            to="/" 
            className="block text-white hover:text-red-600 hover:bg-gray-900 transition font-semibold text-base sm:text-lg py-2 sm:py-3 px-3 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/tv-shows" 
            className="block text-white hover:text-red-600 hover:bg-gray-900 transition font-semibold text-base sm:text-lg py-2 sm:py-3 px-3 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            TV Shows
          </Link>
          <Link 
            to="/movies" 
            className="block text-white hover:text-red-600 hover:bg-gray-900 transition font-semibold text-base sm:text-lg py-2 sm:py-3 px-3 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Movies
          </Link>
          <Link 
            to="/new" 
            className="block text-white hover:text-red-600 hover:bg-gray-900 transition font-semibold text-base sm:text-lg py-2 sm:py-3 px-3 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            New & Popular
          </Link>
          <Link 
            to="/mylist" 
            className="block text-white hover:text-red-600 hover:bg-gray-900 transition font-semibold text-base sm:text-lg py-2 sm:py-3 px-3 rounded"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My List
          </Link>
          
          {/* Mobile Sign In */}
          <Link 
            to="/signin" 
            className="block bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded font-bold text-center text-base sm:text-lg mt-3 sm:mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
