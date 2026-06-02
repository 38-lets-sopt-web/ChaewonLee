export const API_ENDPOINTS = {
  MOVIES: {
    LIST: '/discover/movie',
    DETAIL: (movieId: number) => `/movie/${movieId}`,
    RATING: (movieId: number) => `/movie/${movieId}/rating`,
    RATED_MOVIES: (guestSessionId: string) =>
      `/guest_session/${guestSessionId}/rated/movies`,
  },
  AUTH: {
    GUEST_SESSION: '/authentication/guest_session/new',
  },
} as const