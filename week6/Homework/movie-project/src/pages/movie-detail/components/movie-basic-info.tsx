import type { MovieDetailItem } from '../../../types/movie'

interface MovieBasicInfoProps {
  movie: MovieDetailItem
}

const formatCurrency = (amount: number) => {
  if (amount === 0) return '-'

  return `US$${amount.toLocaleString()}`
}

const MovieBasicInfo = ({ movie }: MovieBasicInfoProps) => {
  const rows = [
    { label: '원제', value: movie.originalTitle },
    { label: '원어', value: movie.originalLanguage },
    { label: '제작 국가', value: movie.productionCountries.join(', ') || '-' },
    { label: '사용 언어', value: movie.spokenLanguages.join(', ') || '-' },
    { label: '예산', value: formatCurrency(movie.budget) },
    { label: '수익', value: formatCurrency(movie.revenue) },
  ]

  return (
    <section className="rounded-xl bg-white p-8 shadow-sm">
      <h2 className="text-title text-gray-900">기본 정보</h2>

      <dl className="mt-6">
        {rows.map((row) => (
          <div
            className="grid grid-cols-[120px_1fr] border-b border-gray-100 py-4 last:border-b-0"
            key={row.label}
          >
            <dt className="text-label text-gray-500">{row.label}</dt>
            <dd className="text-body text-gray-900">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default MovieBasicInfo
