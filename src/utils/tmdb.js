const API_KEY = '95adc5035d8cca4e8850ff7ad9c23431';
const BASE_URL = 'https://api.themoviedb.org/3';

// Get Trending Movies/TV Shows
export const getTrending = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

// Get Popular Movies
export const getPopular = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

// Get Top Rated Movies
export const getTopRated = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

// Get Movie Details (with cast, videos, similar movies)
export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar`
  );
  const data = await response.json();
  return data;
};

// Get TV Show Details (with cast, videos, similar shows)
export const getTVDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar`
  );
  const data = await response.json();
  return data;
};

// Get Image URL with size options
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Search for Movies and TV Shows
export const searchMulti = async (query) => {
  if (!query) return [];
  
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
};

// Get Only Movies (Discover Movies)
export const getMoviesOnly = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`
  );
  const data = await response.json();
  return data;
};

// Get Only TV Shows
export const getTVShowsOnly = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`
  );
  const data = await response.json();
  return data;
};

// Get New & Popular (Latest Releases)
export const getNewReleases = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data;
};

