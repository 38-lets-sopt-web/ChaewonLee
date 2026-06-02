import { useQuery } from '@tanstack/react-query'

import { getMovieDetail } from '../apis/movie-detail'

export const useMovieDetailQuery = (movieId: number | null) =>
  useQuery({
    queryKey: ['movies', 'detail', movieId],
    queryFn: () => {
      if (movieId === null) {
        throw new Error('movieId is required.')
      }

      return getMovieDetail(movieId)
    },
    enabled: movieId !== null,
  })
