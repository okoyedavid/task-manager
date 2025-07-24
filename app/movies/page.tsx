"use client";
import React, { useEffect, useState } from "react";

import { useSetUrl } from "../hooks/useSeturl";
import { Movie } from "../types";
import { AddMovieModal } from "./AddMovieModal";
import { MovieCard } from "./MovieCard";
import MoviesFilter from "./MoviesFilter";
import toast from "react-hot-toast";

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>();
  const [updated, setUpdated] = useState(false);

  const { searchParams } = useSetUrl();
  const searchQuery = searchParams.get("query") || "";
  const selectedStatus = searchParams.get("status") || "all";
  const type = searchParams.get("type") || "all";

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    async function handleFetchMovies() {
      const res = await fetch("http://localhost:4000/movies");
      const data = await res.json();
      setMovies(data.movies);
      setUpdated(false);
    }

    handleFetchMovies();
  }, [updated]);

  if (!movies) return null;

  async function handleSave(movieData: Partial<Movie>) {
    try {
      const res = await fetch("http://localhost:4000/movies", {
        method: "POST",
        body: JSON.stringify({ movie: movieData }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        if (data?.error?.errorResponse?.errmsg?.match(/duplicate key/i)) {
          toast.error("Movie already added");
        } else {
          toast.error(data?.message || "Failed to upload movie");
        }
        return;
      }

      toast.success("Movie added");
      setUpdated(true);
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Network error. Please try again.");
    }
  }

  const filteredMovies = movies.filter((movie) => {
    const matchestype = type === "all" || movie.type === type;
    const matchesStatus =
      selectedStatus === "all" || movie.status === selectedStatus;

    if (!searchQuery) return matchestype && matchesStatus;

    const matchesSearch = movie?.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // const matchesGenre =
    //   selectedGenre === "all" || movie.genre.includes(selectedGenre);
    return matchesSearch && matchesStatus && matchestype;
    // && matchesGenre;
  });

  return (
    <div className={`min-h-full py-6 px-2 md:p-6`}>
      {/* Header */}

      <MoviesFilter setIsAddModalOpen={setIsAddModalOpen} />

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            reload={() => setUpdated(true)}
            onEdit={(movie) => {
              console.log("Edit movie:", movie);
            }}
          />
        ))}
      </div>

      {filteredMovies.length === 0 && (
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
