const API_KEY = "b5ce8056";
const BASE_URL = " http://www.omdbapi.com/";

TODO
//Revisit TMDB API token generation later

// A manual list of popular IMDb IDs
const popularIds = [
  "tt0468569", // The Dark Knight
  "tt1375666", // Inception
  "tt4154796", // Avengers: Endgame
  "tt0111161", // Shawshank Redemption
  "tt0133093", // The Matrix
];

export const getPopularMovies = async () => {
  const requests = popularIds.map(id =>
    fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`).then(r => r.json())
  );

  return Promise.all(requests);
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
  );

  const data = await response.json();

  // OMDb returns { Search: [...], totalResults, Response }
  return data.Search || [];
};
