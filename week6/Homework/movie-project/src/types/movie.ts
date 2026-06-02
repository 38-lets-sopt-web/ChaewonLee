export interface MovieResponse {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface MovieListResponse {
  page: number
  results: MovieResponse[]
  total_pages: number
  total_results: number
}

export interface MovieCardItem {
  id: number
  title: string
  posterUrl: string
  releaseDate: string
  overview: string
  voteAverage: number
}

export type MovieRatingFilterValue = {
  min: number
  max: number
} | null
