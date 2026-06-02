import type { MovieDetailItem } from '../../../types/movie'
import MovieInfoCard from './movie-info-card'

interface MovieDetailHeroProps {
  movie: MovieDetailItem
}

const formatRuntime = (runtime: number | null) => {
  if (runtime === null) return '-'

  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60

  if (hours === 0) return `${minutes}분`

  return `${hours}시간 ${minutes}분`
}

const MovieDetailHero = ({ movie }: MovieDetailHeroProps) => (
  <section className="overflow-hidden rounded-xl bg-white shadow-sm">
    <img
      alt={`${movie.title} 배경 이미지`}
      className="aspect-[16/6] w-full object-cover"
      src={movie.backdropUrl}
    />

    <div className="grid gap-8 p-8 md:grid-cols-[260px_1fr]">
      <img
        alt={`${movie.title} 포스터`}
        className="aspect-[2/3] w-full rounded-xl object-cover"
        src={movie.posterUrl}
      />

      <div>
        <p className="text-label text-gray-500">{movie.releaseDate}</p>
        <h1 className="mt-3 text-display text-gray-900">{movie.title}</h1>

        <ul className="mt-5 flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <li
              className="rounded-full border border-gray-200 px-4 py-2 text-label text-gray-700"
              key={genre}
            >
              {genre}
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <MovieInfoCard
            label="평점"
            value={`${movie.voteAverage.toFixed(1)} / 10`}
          />
          <MovieInfoCard
            label="투표 수"
            value={movie.voteCount.toLocaleString()}
          />
          <MovieInfoCard label="상영 시간" value={formatRuntime(movie.runtime)} />
          <MovieInfoCard label="상태" value={movie.status} />
        </div>
      </div>
    </div>
  </section>
)

export default MovieDetailHero
