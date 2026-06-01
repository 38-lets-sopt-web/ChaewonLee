import { Link } from 'react-router-dom'

import { createMovieDetailPath } from '../../../routes/paths'
import type { MovieCardItem } from '../../../types/movie'

interface MovieCardProps {
  movie: MovieCardItem
}

const MovieCard = ({ movie }: MovieCardProps) => (
  <Link
    className="block overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    to={createMovieDetailPath(movie.id)}
  >
    <img
      alt={movie.title}
      className="aspect-[2/3] w-full object-cover"
      loading="lazy"
      src={movie.posterUrl}
    />
    <div className="p-4">
      <h2 className="line-clamp-1 text-title text-gray-900">{movie.title}</h2>
      <p className="mt-2 text-body text-gray-500">{movie.releaseDate}</p>
      <p className="mt-4 line-clamp-3 text-body text-gray-700">
        {movie.overview}
      </p>
    </div>
  </Link>
)

export default MovieCard
