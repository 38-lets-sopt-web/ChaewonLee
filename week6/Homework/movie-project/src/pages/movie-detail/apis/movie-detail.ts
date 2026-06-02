import { API_ENDPOINTS } from '../../../libs/api-endpoints'
import { http } from '../../../libs/http'
import type { MovieDetailItem, MovieDetailResponse } from '../../../types/movie'

const TMDB_POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280'
const POSTER_FALLBACK_URL =
  'https://placehold.co/500x750/e5e7eb/6b7280?text=No+Image'
const BACKDROP_FALLBACK_URL =
  'https://placehold.co/1280x720/e5e7eb/6b7280?text=No+Backdrop'

const toMovieDetailItem = (movie: MovieDetailResponse): MovieDetailItem => ({
  id: movie.id,
  title: movie.title,
  originalTitle: movie.original_title,
  originalLanguage: movie.original_language,
  overview: movie.overview,
  posterUrl: movie.poster_path
    ? `${TMDB_POSTER_BASE_URL}${movie.poster_path}`
    : POSTER_FALLBACK_URL,
  backdropUrl: movie.backdrop_path
    ? `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`
    : BACKDROP_FALLBACK_URL,
  releaseDate: movie.release_date,
  genres: movie.genres.map((genre) => genre.name),
  voteAverage: movie.vote_average,
  voteCount: movie.vote_count,
  runtime: movie.runtime,
  status: movie.status,
  productionCountries: movie.production_countries.map((country) => country.name),
  spokenLanguages: movie.spoken_languages.map(
    (language) => language.english_name,
  ),
  budget: movie.budget,
  revenue: movie.revenue,
})

export const getMovieDetail = async (movieId: number) => {
  const response = await http.get<MovieDetailResponse>(
    API_ENDPOINTS.MOVIES.DETAIL(movieId),
    {
      language: 'ko-KR',
    },
  )

  return toMovieDetailItem(response)
}
