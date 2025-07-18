import { Movie } from '../types';

export const mockMovies: Movie[] = [
  {
    id: '1',
    tmdbId: 550,
    title: 'Fight Club',
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&dpr=1',
    year: 1999,
    genre: ['Drama', 'Thriller'],
    rating: 8.8,
    overview: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club.',
    status: 'watched',
    dateAdded: new Date('2024-01-10'),
    dateWatched: new Date('2024-01-15'),
    userRating: 9,
    notes: 'Amazing cinematography and plot twists!'
  },
  {
    id: '2',
    tmdbId: 238,
    title: 'The Shawshank Redemption',
    poster: 'https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&dpr=1',
    year: 1994,
    genre: ['Drama'],
    rating: 9.3,
    overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption.',
    status: 'to-watch',
    dateAdded: new Date('2024-01-12')
  },
  {
    id: '3',
    tmdbId: 680,
    title: 'Pulp Fiction',
    poster: 'https://images.pexels.com/photos/7991581/pexels-photo-7991581.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&dpr=1',
    year: 1994,
    genre: ['Crime', 'Drama'],
    rating: 8.9,
    overview: 'The lives of two mob hitmen, a boxer, and others intertwine in four tales of violence.',
    status: 'rewatch',
    dateAdded: new Date('2024-01-08'),
    dateWatched: new Date('2024-01-20'),
    userRating: 8
  },
  {
    id: '4',
    tmdbId: 13,
    title: 'Forrest Gump',
    poster: 'https://images.pexels.com/photos/7991582/pexels-photo-7991582.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&dpr=1',
    year: 1994,
    genre: ['Drama', 'Romance'],
    rating: 8.8,
    overview: 'The presidencies of Kennedy and Johnson through the eyes of an Alabama man.',
    status: 'watched',
    dateAdded: new Date('2024-01-05'),
    dateWatched: new Date('2024-01-18'),
    userRating: 9
  }
];

export const movieGenres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
  'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'
];