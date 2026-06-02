interface MovieInfoCardProps {
  label: string
  value: string
}

const MovieInfoCard = ({ label, value }: MovieInfoCardProps) => (
  <article className="rounded-xl border border-gray-200 bg-white p-5">
    <p className="text-body text-gray-500">{label}</p>
    <p className="mt-2 text-title text-gray-900">{value}</p>
  </article>
)

export default MovieInfoCard
