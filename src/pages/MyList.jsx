import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { getFavorites, removeFromFavorites } from '../utils/favorites';
import { getImageUrl } from '../utils/tmdb';

function MyList() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
    
    // Listen for changes
    const handleChange = () => loadFavorites();
    window.addEventListener('favoritesChanged', handleChange);
    
    return () => window.removeEventListener('favoritesChanged', handleChange);
  }, []);

  const loadFavorites = () => {
    const favs = getFavorites();
    setFavorites(favs);
  };

  const handleRemove = (movieId) => {
    removeFromFavorites(movieId);
    loadFavorites();
    window.dispatchEvent(new Event('favoritesChanged'));
  };

  const handleMovieClick = (movie) => {
    navigate(`/detail/${movie.media_type}/${movie.id}`);
  };

  return (
    <div className="bg-black min-h-screen pt-20 px-4 md:px-8 lg:px-16 pb-12">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
          <FaHeart className="text-red-600" />
          My List
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          {favorites.length} {favorites.length === 1 ? 'title' : 'titles'} saved
        </p>
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className="text-center py-20">
          <FaHeart className="text-gray-700 text-6xl mx-auto mb-4" />
          <p className="text-gray-400 text-xl mb-2">Your list is empty</p>
          <p className="text-gray-500 text-sm mb-6">
            Add movies and TV shows to your list by clicking the heart icon
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold transition"
          >
            Browse Movies
          </button>
        </div>
      )}

      {/* Favorites Grid */}
      {favorites.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="relative group cursor-pointer"
            >
              <div onClick={() => handleMovieClick(movie)}>
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg hover:scale-105 transition"
                />
                <div className="mt-2">
                  <h3 className="text-white text-sm font-semibold truncate">
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                    <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                    <span className="capitalize">{movie.media_type}</span>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(movie.id);
                }}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-2 rounded-full transition opacity-0 group-hover:opacity-100"
              >
                <FaTrash className="text-white text-sm" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyList;
