import type { ChangeEvent } from 'react'

export type RatingFilterValue = {
  min: number
  max: number
} | null

interface RatingFilterProps {
  value: RatingFilterValue
  onChange: (value: RatingFilterValue) => void
}

const ALL_RATING_VALUE = 'all'

const RATING_OPTIONS = [
  { label: '전체', value: ALL_RATING_VALUE },
  { label: '1점 대', value: '1' },
  { label: '2점 대', value: '2' },
  { label: '3점 대', value: '3' },
  { label: '4점 대', value: '4' },
  { label: '5점 대', value: '5' },
  { label: '6점 대', value: '6' },
  { label: '7점 대', value: '7' },
  { label: '8점 대', value: '8' },
  { label: '9점 대', value: '9' },
  { label: '10점 대', value: '10' },
] as const

const RatingFilter = ({ value, onChange }: RatingFilterProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value

    if (selectedValue === ALL_RATING_VALUE) {
      onChange(null)
      return
    }

    const rating = Number(selectedValue)

    onChange({
      min: rating,
      max: rating + 1,
    })
  }

  const selectedValue = value === null ? ALL_RATING_VALUE : String(value.min)

  return (
    <section className="mt-8 rounded-xl bg-white p-4 shadow-sm">
      <select
        aria-label="별점 필터"
        className="h-11 min-w-44 rounded-lg border border-gray-200 bg-white px-4 text-label text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        onChange={handleChange}
        value={selectedValue}
      >
        {RATING_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </section>
  )
}

export default RatingFilter
