import { UniqueEntityID } from './unique.entity-id';
import { test, expect } from 'vitest';
import { Movie } from './movie';

test('it should be able to create a new Movie', () => {
  const movie = Movie.create({
    userId: new UniqueEntityID('user-01'),
    tmdbId: new UniqueEntityID('movie-01'),
    title: 'Interstellar',
    synopsis: 'A group of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    releaseDate: '2014-11-07',
    genre: 'Sci-Fi',
    state: 'Available',
    rating: 8,
    recommended: true,
  });

  console.log(movie)

  expect(movie.title).toBe('Interstellar');
  expect(movie.synopsis).toBe('A group of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.');
  expect(movie.releaseDate).toBe('2014-11-07');
  expect(movie.genre).toBe('Sci-Fi');
  expect(movie.state).toBe('Available');
  expect(movie.rating).toBe(8);
  expect(movie.recommended).toBe(true);


  expect(movie.createdAt).toBeInstanceOf(Date);


  expect(movie.userId).toBeInstanceOf(UniqueEntityID);
  expect(movie.tmdbId).toBeInstanceOf(UniqueEntityID)
});