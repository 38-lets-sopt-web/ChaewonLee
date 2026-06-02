import { Link, useParams } from 'react-router-dom'

import { ROUTES } from '../../routes/paths'
import MovieBasicInfo from './components/movie-basic-info'
import MovieDetailHero from './components/movie-detail-hero'
import MovieOverview from './components/movie-overview'
import MovieRatingPanel from './components/movie-rating-panel'
import { MOCK_MOVIE_DETAIL } from './mock-movie-detail'

const MovieDetailPage = () => {
  const { movieId } = useParams()
  const movie = MOCK_MOVIE_DETAIL

  return (
    <main className="mx-auto max-w-[1120px] px-8 py-10">
      <Link className="text-label text-gray-900" to={ROUTES.HOME}>
        ← 목록으로 돌아가기
      </Link>

      <div className="mt-6 space-y-8">
        <MovieDetailHero movie={movie} />
        <MovieOverview overview={movie.overview} />

        <div className="grid gap-8 lg:grid-cols-[1fr_460px]">
          <MovieBasicInfo movie={movie} />
          <MovieRatingPanel />
        </div>
      </div>

      <p className="sr-only">movieId: {movieId}</p>
    </main>
  )
}

export default MovieDetailPage
