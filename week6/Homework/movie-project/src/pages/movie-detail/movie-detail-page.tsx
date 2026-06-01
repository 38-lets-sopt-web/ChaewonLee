import { Link, useParams } from 'react-router-dom'

import { ROUTES } from '../../routes/paths'

const MovieDetailPage = () => {
  const { movieId } = useParams()

  return (
    <main className="px-8 py-10">
      <Link className="text-label text-primary-700" to={ROUTES.HOME}>
        &lt;- 목록으로 돌아가기
      </Link>
      <h1 className="mt-6 text-heading text-primary-600">영화 상세 페이지</h1>
      <p className="mt-3 text-body text-gray-600">movieId: {movieId}</p>
    </main>
  )
}

export default MovieDetailPage
