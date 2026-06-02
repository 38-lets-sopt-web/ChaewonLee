import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  addMovieRating,
  deleteMovieRating,
  getMovieRating,
} from '../apis/movie-rating'

const MIN_RATING = 0.5
const MAX_RATING = 10

const isValidRating = (rating: number) =>
  Number.isFinite(rating) && rating >= MIN_RATING && rating <= MAX_RATING

const createMovieRatingQueryKey = (movieId: number | null) =>
  ['movies', 'rating', movieId] as const

export const useMovieRating = (movieId: number | null) => {
  const queryClient = useQueryClient()
  const [ratingInput, setRatingInput] = useState<{
    movieId: number | null
    value: string
  } | null>(null)
  const [message, setMessage] = useState('')

  const ratingQuery = useQuery({
    queryKey: createMovieRatingQueryKey(movieId),
    queryFn: () => {
      if (movieId === null) {
        throw new Error('movieId is required.')
      }

      return getMovieRating(movieId)
    },
    enabled: movieId !== null,
  })

  const serverRating = ratingQuery.data != null ? String(ratingQuery.data) : ''
  const rating =
    ratingInput?.movieId === movieId ? ratingInput.value : serverRating

  const addRatingMutation = useMutation({
    mutationFn: (ratingValue: number) => {
      if (movieId === null) {
        throw new Error('movieId is required.')
      }

      return addMovieRating(movieId, ratingValue)
    },
    onSuccess: (_, ratingValue) => {
      setRatingInput(null)
      queryClient.setQueryData(createMovieRatingQueryKey(movieId), ratingValue)
      setMessage('별점이 저장되었습니다.')
    },
    onError: () => {
      setMessage('별점 저장 중 오류가 발생했습니다.')
    },
  })

  const deleteRatingMutation = useMutation({
    mutationFn: () => {
      if (movieId === null) {
        throw new Error('movieId is required.')
      }

      return deleteMovieRating(movieId)
    },
    onSuccess: () => {
      setRatingInput({ movieId, value: '' })
      queryClient.setQueryData(createMovieRatingQueryKey(movieId), null)
      setMessage('별점이 삭제되었습니다.')
    },
    onError: () => {
      setMessage('별점 삭제 중 오류가 발생했습니다.')
    },
  })

  const saveRating = () => {
    if (movieId === null || addRatingMutation.isPending) return

    if (rating.trim() === '') {
      setMessage('별점을 입력해주세요.')
      return
    }

    const ratingValue = Number(rating)

    if (!isValidRating(ratingValue)) {
      setMessage('0.5부터 10.0까지의 숫자를 입력해주세요.')
      return
    }

    addRatingMutation.mutate(ratingValue)
  }

  const deleteRating = () => {
    if (movieId === null || deleteRatingMutation.isPending) return

    deleteRatingMutation.mutate()
  }

  const setRating = (value: string) => {
    setRatingInput({ movieId, value })
  }

  return {
    deleteRating,
    isDeletingRating: deleteRatingMutation.isPending,
    isLoadingRating: ratingQuery.isLoading,
    isSavingRating: addRatingMutation.isPending,
    message,
    rating,
    saveRating,
    setRating,
  }
}
