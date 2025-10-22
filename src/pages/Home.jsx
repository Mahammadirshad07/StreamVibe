import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart, FaPlay, FaInfoCircle } from 'react-icons/fa';
import { getTrending, getPopular, getTopRated, getImageUrl } from '../utils/tmdb';
import { addToFavorites, removeFromFavorites, isFavorite } from '../utils/favorites';
import VideoPlayer from '../components/VideoPlayer';

function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  // Stranger Things ID (you can change this to any movie/show)
  const HERO_MOVIE_ID = 66732; // Stranger Things
  const HERO_MOVIE_TYPE = 'tv';
  const HERO_TRAILER_KEY = 'b9EkMc79ZSU'; // Stranger Things Season 1 trailer

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingData, popularData, topRatedData] = await Promise.all([
          getTrending(),
          getPopular(),
          getTopRated()
        ]);
        
        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handlePlayClick = () => {
    setShowVideo(true);
  };

  const handleMoreInfoClick = () => {
    navigate(`/detail/${HERO_MOVIE_TYPE}/${HERO_MOVIE_ID}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pt-0">
      {/* Video Player Modal */}
      {showVideo && (
        <VideoPlayer 
          videoKey={HERO_TRAILER_KEY}
          title="Stranger Things"
          onClose={() => setShowVideo(false)}
        />
      )}

      {/* Hero Section */}
      <div 
        className="relative h-[70vh] md:h-screen w-full"
        style={{
          backgroundImage: 'url(https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>

        <div className="relative h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl">
            Stranger Things
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
            {/* Play Button */}
            <button 
              onClick={handlePlayClick}
              className="flex items-center justify-center gap-2 md:gap-3 bg-white text-black px-6 md:px-10 py-3 md:py-4 rounded-lg hover:bg-gray-300 transition font-bold text-base md:text-xl"
            >
              <FaPlay /> Play
            </button>
            
            {/* More Info Button */}
            <button 
              onClick={handleMoreInfoClick}
              className="flex items-center justify-center gap-2 md:gap-3 bg-gray-500 bg-opacity-70 text-white px-6 md:px-10 py-3 md:py-4 rounded-lg hover:bg-gray-600 transition font-bold text-base md:text-xl"
            >
              <FaInfoCircle /> More Info
            </button>
          </div>

          <p className="text-white text-sm md:text-lg lg:text-xl leading-relaxed max-w-2xl drop-shadow-lg">
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.
          </p>
        </div>
      </div>

      {/* Movie Rows Section */}
      <div className="px-4 md:px-8 lg:px-16 py-8 md:py-12 space-y-8 md:space-y-12">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="Popular on StreamVibe" movies={popular} />
        <MovieRow title="Top Rated" movies={topRated} />
      </div>
    </div>
  );
}

// MovieRow Component (keep your existing code - don't change)
function MovieRow({ title, movies }) {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const updateFavs = () => {
      const favorites = JSON.parse(localStorage.getItem('streamvibe_favorites') || '[]');
      setFavs(favorites.map(f => f.id));
    };
    
    updateFavs();
    
    window.addEventListener('storage', updateFavs);
    window.addEventListener('favoritesChanged', updateFavs);
    
    return () => {
      window.removeEventListener('storage', updateFavs);
      window.removeEventListener('favoritesChanged', updateFavs);
    };
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMovieClick = (movie) => {
    const type = movie.media_type === 'tv' ? 'tv' : 'movie';
    navigate(`/detail/${type}/${movie.id}`);
  };

  const toggleFavorite = (e, movie) => {
    e.stopPropagation();
    
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
    
    const favorites = JSON.parse(localStorage.getItem('streamvibe_favorites') || '[]');
    setFavs(favorites.map(f => f.id));
    
    window.dispatchEvent(new Event('favoritesChanged'));
  };

  return (
    <div className="relative group">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4 md:mb-6">{title}</h2>
      
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 md:p-3 rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FaChevronLeft className="text-xl md:text-2xl" />
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex gap-3 md:gap-4 overflow-x-scroll scrollbar-hide pb-4 scroll-smooth"
        >
          {movies.map((movie) => (
            <div 
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className="flex-shrink-0 w-36 sm:w-40 md:w-44 lg:w-48 rounded-lg hover:scale-105 transition cursor-pointer relative group/card"
            >
              <button
                onClick={(e) => toggleFavorite(e, movie)}
                className="absolute top-2 right-2 z-20 bg-black/70 hover:bg-black/90 p-2 rounded-full transition"
              >
                {favs.includes(movie.id) ? (
                  <FaHeart className="text-red-600 text-lg" />
                ) : (
                  <FaRegHeart className="text-white text-lg" />
                )}
              </button>

              <img 
                src={getImageUrl(movie.poster_path || movie.backdrop_path)}
                alt={movie.title || movie.name}
                className="w-full h-52 sm:h-56 md:h-60 lg:h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
                }}
              />
              <div className="mt-2">
                <h3 className="text-white text-sm font-semibold truncate">
                  {movie.title || movie.name}
                </h3>
                <p className="text-gray-400 text-xs">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 md:p-3 rounded-l opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FaChevronRight className="text-xl md:text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default Home;
