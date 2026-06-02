import type { MovieCardItem } from '../../../types/movie'
import MovieCard from './movie-card'

interface MovieGridProps {
  movies: MovieCardItem[]
}

const MovieGrid = ({ movies }: MovieGridProps) => {
  if (movies.length === 0) {
    return (
      <p className="mt-10 text-center text-body text-gray-500">
        조건에 맞는 영화가 없습니다.
      </p>
    )
  }

  return (
    <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  )
}

export default MovieGrid
