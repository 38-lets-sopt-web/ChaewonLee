import { useState } from 'react'

import MovieGrid from './components/movie-grid'
import RatingFilter, {
  type RatingFilterValue,
} from './components/rating-filter'
import { MOCK_MOVIES } from './mock-movies'

const MovieListPage = () => {
  const [ratingFilter, setRatingFilter] = useState<RatingFilterValue>(null)

  const filteredMovies =
    ratingFilter === null
      ? MOCK_MOVIES
      : MOCK_MOVIES.filter(
          (movie) =>
            movie.voteAverage >= ratingFilter.min &&
            movie.voteAverage < ratingFilter.max,
        )

  return (
    <main className="mx-auto max-w-[1120px] px-8 py-14">
      <h1 className="text-display text-primary-600">Movie Project</h1>

      <RatingFilter value={ratingFilter} onChange={setRatingFilter} />

      <MovieGrid movies={filteredMovies} />
    </main>
  )
}

export default MovieListPage
