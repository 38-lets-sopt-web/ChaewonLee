import { API_ENDPOINTS } from '../../../libs/api-endpoints'
import { http } from '../../../libs/http'
import type {
  MovieCardItem,
  MovieListResponse,
  MovieResponse,
} from '../../../types/movie'

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const POSTER_FALLBACK_URL =
  'https://placehold.co/500x750/e5e7eb/6b7280?text=No+Image'

const toMovieCardItem = (movie: MovieResponse): MovieCardItem => ({
  id: movie.id,
  title: movie.title,
  posterUrl: movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : POSTER_FALLBACK_URL,
  releaseDate: movie.release_date,
  overview: movie.overview,
  voteAverage: movie.vote_average,
})

interface GetMovieListParams {
  minRating?: number
  maxRating?: number
}

export const getMovieList = async ({
  minRating,
  maxRating,
}: GetMovieListParams = {}) => {
  const params = {
    sort_by: 'popularity.desc',
    ...(minRating !== undefined && { 'vote_average.gte': minRating }),
    ...(maxRating !== undefined && {
      'vote_average.lte': Math.min(maxRating, 10),
    }),
  }

  const response = await http.get<MovieListResponse>(
    API_ENDPOINTS.MOVIES.LIST,
    params,
  )

  return response.results.map(toMovieCardItem)
}
