"use client";
import React, { useEffect, useState } from "react";

import { Plus, Search } from "lucide-react";
import Input from "../ui/Input";
import { AddMovieModal } from "./AddMovieModal";
import { MovieCard } from "./MovieCard";
import Button from "../ui/Button";
import { Movie } from "../types";

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    async function handleFetchMovies() {
      const res = await fetch("http://localhost:4000/movies");
      const data = await res.json();
      setMovies(data.movies);
    }

    handleFetchMovies();
  });

  if (!movies) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchQuery) return;
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=true&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTUyZjI5MWRlZjViNjQxMWMxOTE2NjhiY2I0MTFjYSIsIm5iZiI6MTc1Mjc3NTUwMi40NDQsInN1YiI6IjY4NzkzYjRlYmViYzgwMGE1MGJiZTJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zDfEfHtmsHLuxdlegf7wINrcIcAisKXWVuS0d0QrHII",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results as Movie[]);
      })
      .catch((err) => console.error(err));
  }

  async function handleSave(movieData: Partial<Movie>) {
    const res = await fetch("http://localhost:4000/movies", {
      method: "POST",
      body: JSON.stringify({ movie: movieData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("successfully added movies", data);
  }

  return (
    <div className={`min-h-full p-6`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-3 mb-6">
          <form onSubmit={handleSubmit} className="relative flex-1">
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              Icon={Search}
            />
          </form>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3.5 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Movie</span>
          </Button>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onStatusChange={(movieId, status) => {
              console.log("Status changed:", movieId, status);
            }}
            onEdit={(movie) => {
              console.log("Edit movie:", movie);
            }}
          />
        ))}
      </div>

      {movies.length === 0 && (
        <div className="text-center py-12">
          <p className={`text-lg text-white mb-4`}>No movies found</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-green-500 hover:text-green-600 font-medium"
          >
            Add your first movie
          </button>
        </div>
      )}

      {/* Add Movie Modal */}
      {isAddModalOpen && (
        <AddMovieModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default MoviesPage;
