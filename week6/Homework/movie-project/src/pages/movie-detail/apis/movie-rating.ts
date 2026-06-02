import { API_ENDPOINTS } from '../../../libs/api-endpoints'
import { http } from '../../../libs/http'
import type { MovieResponse } from '../../../types/movie'

const GUEST_SESSION_STORAGE_KEY = 'movie-project-guest-session-id'

interface GuestSessionResponse {
  success: boolean
  guest_session_id: string
  expires_at: string
}

interface StoredGuestSession {
  expiresAt: string
  guestSessionId: string
}

interface RatedMovieResponse extends MovieResponse {
  rating: number
}

interface RatedMovieListResponse {
  page: number
  results: RatedMovieResponse[]
  total_pages: number
  total_results: number
}

interface MovieRatingResponse {
  status_code: number
  status_message: string
}

const createGuestSession = async () => {
  const response = await http.get<GuestSessionResponse>(
    API_ENDPOINTS.AUTH.GUEST_SESSION,
  )

  localStorage.setItem(
    GUEST_SESSION_STORAGE_KEY,
    JSON.stringify({
      expiresAt: response.expires_at,
      guestSessionId: response.guest_session_id,
    } satisfies StoredGuestSession),
  )

  return response.guest_session_id
}

const getStoredGuestSession = () => {
  const storedGuestSession = localStorage.getItem(GUEST_SESSION_STORAGE_KEY)

  if (storedGuestSession === null) {
    return null
  }

  try {
    const parsedGuestSession = JSON.parse(
      storedGuestSession,
    ) as StoredGuestSession
    const isExpired = new Date(parsedGuestSession.expiresAt) <= new Date()

    if (isExpired) {
      localStorage.removeItem(GUEST_SESSION_STORAGE_KEY)
      return null
    }

    return parsedGuestSession.guestSessionId
  } catch {
    localStorage.removeItem(GUEST_SESSION_STORAGE_KEY)
    return null
  }
}

const getGuestSessionId = async () => {
  const guestSessionId = getStoredGuestSession()

  if (guestSessionId !== null) {
    return guestSessionId
  }

  return createGuestSession()
}

export const getMovieRating = async (movieId: number) => {
  const guestSessionId = await getGuestSessionId()
  const response = await http.get<RatedMovieListResponse>(
    API_ENDPOINTS.MOVIES.RATED_MOVIES(guestSessionId),
  )

  const ratedMovie = response.results.find((movie) => movie.id === movieId)

  return ratedMovie?.rating ?? null
}

export const addMovieRating = async (movieId: number, rating: number) => {
  const guestSessionId = await getGuestSessionId()

  return http.post<MovieRatingResponse, { value: number }>(
    API_ENDPOINTS.MOVIES.RATING(movieId),
    { value: rating },
    { guest_session_id: guestSessionId },
  )
}

export const deleteMovieRating = async (movieId: number) => {
  const guestSessionId = await getGuestSessionId()

  return http.delete<MovieRatingResponse>(API_ENDPOINTS.MOVIES.RATING(movieId), {
    guest_session_id: guestSessionId,
  })
}
