interface MovieRatingPanelProps {
  isDeletingRating: boolean
  isLoadingRating: boolean
  isSavingRating: boolean
  message: string
  onChangeRating: (rating: string) => void
  onDeleteRating: () => void
  onSaveRating: () => void
  rating: string
}

const MovieRatingPanel = ({
  isDeletingRating,
  isLoadingRating,
  isSavingRating,
  message,
  onChangeRating,
  onDeleteRating,
  onSaveRating,
  rating,
}: MovieRatingPanelProps) => (
  <section className="rounded-xl bg-white p-8 shadow-sm">
    <h2 className="text-title text-gray-900">별점 남기기</h2>
    <p className="mt-6 text-label text-gray-900">0.5 ~ 10.0</p>

    <input
      aria-label="영화 별점"
      className="mt-4 h-12 w-full rounded-xl border border-gray-200 px-4 text-body outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
      disabled={isSavingRating || isDeletingRating}
      max="10"
      min="0.5"
      onChange={(event) => onChangeRating(event.target.value)}
      placeholder={isLoadingRating ? '별점 불러오는 중...' : '별점을 입력하세요'}
      step="0.5"
      type="number"
      value={rating}
    />

    <div className="mt-4 flex flex-wrap gap-2">
      <button
        disabled={isSavingRating || isDeletingRating}
        className="rounded-lg bg-gray-900 px-5 py-3 text-label text-white transition hover:bg-gray-700"
        onClick={onSaveRating}
        type="button"
      >
        {isSavingRating ? '저장 중...' : '별점 저장'}
      </button>
      <button
        disabled={isSavingRating || isDeletingRating}
        className="rounded-lg border border-gray-200 px-5 py-3 text-label text-gray-500 transition hover:border-gray-300 hover:text-gray-700"
        onClick={onDeleteRating}
        type="button"
      >
        {isDeletingRating ? '삭제 중...' : '별점 삭제하기'}
      </button>
    </div>

    {message && <p className="mt-4 text-body text-primary-700">{message}</p>}
  </section>
)

export default MovieRatingPanel
