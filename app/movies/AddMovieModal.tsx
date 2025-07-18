import React, { useState } from "react";

import { Search, Star, X } from "lucide-react";
import Image from "next/image";
import { searchMovies } from "../services/movieService";
import { Movie } from "../types";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface AddMovieModalProps {
  onClose: () => void;
  onSave: (movieData: Partial<Movie>) => void;
}

export const AddMovieModal: React.FC<AddMovieModalProps> = ({
  onClose,
  onSave,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState({
    status: "to-watch" as Movie["status"],
    userRating: "",
    notes: "",
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const movies = await searchMovies(searchQuery);
      setSearchResults(movies);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSave = () => {
    if (!selectedMovie) return;

    const movieData: Partial<Movie> = {
      id: selectedMovie.id,
      title: selectedMovie.title,
      poster_path: selectedMovie.poster_path,
      release_date: String(new Date(selectedMovie.release_date).getFullYear()),
      genre_ids: [...selectedMovie.genre_ids], // In real app, map genre_ids to genre names
      vote_average: selectedMovie.vote_average,
      overview: selectedMovie.overview,
      status: formData.status,
      userRating: formData.userRating
        ? parseInt(formData.userRating)
        : undefined,
      notes: formData.notes || undefined,
      dateWatched: formData.status === "watched" ? new Date() : undefined,
    };

    onSave(movieData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`border border-green-400/20 bg-black/40 backdrop-blur-xl rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b border-green-400`}
        >
          <h2 className={`text-xl font-semibold text-white`}>Add Movie</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-green-900 text-green-50 hover:text-white transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 w-full">
          {/* Search Section */}
          <div className="mb-6 w-full">
            <label className={`block text-sm font-medium text-white mb-2`}>
              Search for a movie
            </label>
            <div className="flex space-x-2">
              <Input
                Icon={Search}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Enter movie title..."
              />

              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-lg font-medium text-white mb-3`}>
                Search Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => setSelectedMovie(movie)}
                    className={`bg-black/40 backdrop-blur-2xl rounded-lg p-3 cursor-pointer border-2 transition-all ${
                      selectedMovie?.id === movie.id
                        ? "border-blue-500"
                        : `border-transparent hover:border-green-400`
                    }`}
                  >
                    <div className="flex space-x-3">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${
                          movie.poster_path || movie.backdrop_path
                        }`}
                        height={96}
                        width={64}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-medium text-white line-clamp-2 mb-1`}
                        >
                          {movie.title}
                        </h4>
                        <p className={`text-sm text-green-50 mb-2`}>
                          {new Date(movie.release_date).getFullYear()}
                        </p>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className={`text-xs text-green-50`}>
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Movie Details */}
          {selectedMovie && (
            <div className="mb-6">
              <h3 className={`text-lg font-medium text-white mb-3`}>
                Selected Movie
              </h3>
              <div
                className={`bg-black/40 backdrop-blur-2xl rounded-lg p-4 border border-green-400`}
              >
                <div className="flex space-x-4">
                  <Image
                    height={144}
                    width={96}
                    src={`https://image.tmdb.org/t/p/w500/${
                      selectedMovie.poster_path || selectedMovie.backdrop_path
                    }`}
                    alt={selectedMovie.title}
                    className="w-24 h-36 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className={`text-xl font-semibold text-white mb-2`}>
                      {selectedMovie.title}
                    </h4>
                    <p className={`text-green-50 mb-2`}>
                      {new Date(selectedMovie.release_date).getFullYear()}
                    </p>
                    <div className="flex items-center space-x-1 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className={`text-white`}>
                        {selectedMovie.vote_average.toFixed(1)}/10
                      </span>
                    </div>
                    <p className={`text-sm text-green-50 line-clamp-3`}>
                      {selectedMovie.overview}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Movie Details Form */}
          {selectedMovie && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status */}
                <div>
                  <label
                    className={`block text-sm font-medium text-white mb-2`}
                  >
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as Movie["status"],
                      }))
                    }
                    className={`w-full px-3 py-2 rounded-lg bg-green-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="to-watch">To Watch</option>
                    <option value="watched">Watched</option>
                    <option value="rewatch">Rewatch</option>
                  </select>
                </div>

                {/* User Rating */}
                {formData.status === "watched" && (
                  <div>
                    <label
                      className={`block text-sm font-medium text-white mb-2`}
                    >
                      Your Rating (1-10)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.userRating}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          userRating: e.target.value,
                        }))
                      }
                      className={`w-full px-3 py-2 rounded-lg bg-green-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Rate this movie..."
                    />
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className={`block text-sm font-medium text-white mb-2`}>
                  Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg bg-green-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Add your thoughts about this movie..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-end space-x-3 p-6 border-t border-green-400`}
        >
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={handleSave}
            disabled={!selectedMovie}
          >
            Add Movie
          </Button>
        </div>
      </div>
    </div>
  );
};
