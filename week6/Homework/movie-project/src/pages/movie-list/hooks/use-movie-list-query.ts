import { useQuery } from '@tanstack/react-query'

import type { MovieRatingFilterValue } from '../../../types/movie'
import { getMovieList } from '../apis/movie'

export const useMovieListQuery = (ratingFilter: MovieRatingFilterValue) =>
  useQuery({
    queryKey: ['movies', ratingFilter],
    queryFn: () =>
      getMovieList({
        minRating: ratingFilter?.min,
        maxRating: ratingFilter?.max,
      }),
  })
