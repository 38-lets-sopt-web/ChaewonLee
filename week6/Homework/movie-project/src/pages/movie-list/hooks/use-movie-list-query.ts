import { useInfiniteQuery } from '@tanstack/react-query'

import type { MovieRatingFilterValue } from '../../../types/movie'
import { getMovieList } from '../apis/movie-list'

export const useMovieListQuery = (ratingFilter: MovieRatingFilterValue) => {
  const query = useInfiniteQuery({
    queryKey: ['movies', 'list', ratingFilter],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getMovieList({
        minRating: ratingFilter?.min,
        maxRating: ratingFilter?.max,
        page: pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  })

  return {
    ...query,
    movies: query.data?.pages.flatMap((page) => page.results) ?? [],
  }
}
