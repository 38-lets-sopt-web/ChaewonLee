export const ROUTES = {
  HOME: '/',
  MOVIE_DETAIL: 'movies/:movieId',
} as const

export const createMovieDetailPath = (movieId: number) => `/movies/${movieId}`
