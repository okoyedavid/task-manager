import React, { useState } from "react";

import { Edit, MoreVertical, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
  onStatusChange: (movieId: number, status: Movie["status"]) => void;
  onEdit: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onStatusChange,
  onEdit,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  async function handleDelete() {
    const res = await fetch(`http://localhost:4000/movies/${movie.id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log("successfully deleted movie", data);
  }

  return (
    <div
      className={`rounded-lg border bg-black/40 backdrop-blur-lg overflow-hidden  transition-all duration-200 group shadow-[0_0_2px_2px_rgba(0,255,0,0.8)] hover:shadow-[0_0_10px_4px_rgba(0,255,0,0.9)]`}
    >
      {/* Movie Poster */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          fill
          src={`https://image.tmdb.org/t/p/w500/${
            movie.poster_path || movie.backdrop_path
          }`}
          alt={movie.title}
          className="group-hover:scale-105 transition-transform duration-200"
        />

        {/* Menu Button */}
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all`}
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div
              className={`absolute right-0 top-8 bg-green-950 border border-white  shadow-white hover:shadow-none rounded-lg shadow-md py-1 z-10 min-w-32`}
            >
              <button
                onClick={() => {
                  onEdit(movie);
                  setShowMenu(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-sm text-green-50 `}
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-500`}
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="absolute bottom-2 left-2 flex items-center space-x-1 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{movie.vote_average}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className={`font-semibold text-white mb-1 line-clamp-1`}>
          {movie.title || movie.name}
        </h3>
        <p className={`text-sm text-green-50 mb-2`}>
          {movie.first_air_date || movie?.release_date}
        </p>

        {/* User Rating (if watched) */}
        {movie.status === "watched" && movie.vote_average && (
          <div className="flex items-center space-x-1 mb-2">
            <span className={`text-xs text-green-50`}>Your rating:</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className={`text-xs font-medium text-white`}>
                {movie.vote_average}/10
              </span>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex space-x-1">
          {movie.status !== "watched" && (
            <button
              onClick={() => onStatusChange(movie.id, "watched")}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2 rounded transition-colors"
            >
              Mark Watched
            </button>
          )}
          {movie.status !== "to-watch" && (
            <button
              onClick={() => onStatusChange(movie.id, "to-watch")}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs py-1 px-2 rounded transition-colors"
            >
              To Watch
            </button>
          )}
          {movie.status === "watched" && (
            <button
              onClick={() => onStatusChange(movie.id, "rewatch")}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white text-xs py-1 px-2 rounded transition-colors"
            >
              Rewatch
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
