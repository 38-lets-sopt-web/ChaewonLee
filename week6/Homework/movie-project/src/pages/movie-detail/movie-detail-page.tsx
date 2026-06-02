import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ROUTES } from '../../routes/paths'
import MovieBasicInfo from './components/movie-basic-info'
import MovieDetailHero from './components/movie-detail-hero'
import MovieOverview from './components/movie-overview'
import MovieRatingPanel from './components/movie-rating-panel'
import { useMovieDetailQuery } from './hooks/use-movie-detail-query'
import { useMovieRating } from './hooks/use-movie-rating'

const MovieDetailPage = () => {
  const { movieId } = useParams()
  const parsedMovieId = movieId === undefined ? NaN : Number(movieId)
  const numericMovieId = Number.isNaN(parsedMovieId) ? null : parsedMovieId
  const { data: movie, isError, isLoading } =
    useMovieDetailQuery(numericMovieId)
  const {
    deleteRating,
    isDeletingRating,
    isLoadingRating,
    isSavingRating,
    message,
    rating,
    saveRating,
    setRating,
  } = useMovieRating(numericMovieId)

  const handleChangeRating = useCallback(
    (nextRating: string) => {
      setRating(nextRating)
    },
    [setRating],
  )

  return (
    <main className="mx-auto max-w-[1120px] px-8 py-10">
      <Link className="text-label text-gray-900" to={ROUTES.HOME}>
        ← 목록으로 돌아가기
      </Link>

      {isLoading && (
        <p className="mt-10 text-center text-body text-gray-500">
          Loading movie detail...
        </p>
      )}

      {isError && (
        <p className="mt-10 text-center text-body text-gray-500">
          Failed to load movie detail.
        </p>
      )}

      {movie && (
        <div className="mt-6 space-y-8">
          <MovieDetailHero movie={movie} />
          <MovieOverview overview={movie.overview} />

          <div className="grid gap-8 lg:grid-cols-[1fr_460px]">
            <MovieBasicInfo movie={movie} />
            <MovieRatingPanel
              isDeletingRating={isDeletingRating}
              isLoadingRating={isLoadingRating}
              isSavingRating={isSavingRating}
              message={message}
              onChangeRating={handleChangeRating}
              onDeleteRating={deleteRating}
              onSaveRating={saveRating}
              rating={rating}
            />
          </div>
        </div>
      )}
    </main>
  )
}

export default MovieDetailPage
