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

export interface MovieGenreResponse {
  id: number
  name: string
}

export interface ProductionCompanyResponse {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export interface ProductionCountryResponse {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguageResponse {
  english_name: string
  iso_639_1: string
  name: string
}

export interface MovieDetailResponse {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: unknown | null
  budget: number
  genres: MovieGenreResponse[]
  homepage: string
  id: number
  imdb_id: string | null
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: ProductionCompanyResponse[]
  production_countries: ProductionCountryResponse[]
  release_date: string
  revenue: number
  runtime: number | null
  softcore?: boolean
  spoken_languages: SpokenLanguageResponse[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
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

export interface MovieDetailItem {
  id: number
  title: string
  originalTitle: string
  originalLanguage: string
  overview: string
  posterUrl: string
  backdropUrl: string
  releaseDate: string
  genres: string[]
  voteAverage: number
  voteCount: number
  runtime: number
  status: string
  productionCountries: string[]
  spokenLanguages: string[]
  budget: number
  revenue: number
}
