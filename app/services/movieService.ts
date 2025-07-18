import { Movie } from "../types";

export const searchMovies = async (
  query: string,
  type: "movie" | "tv"
): Promise<Movie[]> => {
  const url = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(
    query
  )}&include_adult=true&language=en-US&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTUyZjI5MWRlZjViNjQxMWMxOTE2NjhiY2I0MTFjYSIsIm5iZiI6MTc1Mjc3NTUwMi40NDQsInN1YiI6IjY4NzkzYjRlYmViYzgwMGE1MGJiZTJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zDfEfHtmsHLuxdlegf7wINrcIcAisKXWVuS0d0QrHII",
    },
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();

    return json.results as Movie[];
  } catch (err) {
    console.error("Error fetching movies:", err);
    return [];
  }
};
