interface MovieOverviewProps {
  overview: string
}

const MovieOverview = ({ overview }: MovieOverviewProps) => (
  <section className="rounded-xl bg-white p-8 shadow-sm">
    <h2 className="text-title text-gray-900">줄거리</h2>
    <p className="mt-6 text-body text-gray-700">
      {overview || '줄거리 정보가 없습니다.'}
    </p>
  </section>
)

export default MovieOverview
