import { useCallback, useState } from 'react'

import type { MovieRatingFilterValue } from '../../types/movie'
import MovieGrid from './components/movie-grid'
import RatingFilter from './components/rating-filter'
import { useInfiniteScroll } from './hooks/use-infinite-scroll'
import { useMovieListQuery } from './hooks/use-movie-list-query'

const MovieListPage = () => {
  const [ratingFilter, setRatingFilter] =
    useState<MovieRatingFilterValue>(null)

  const {
    movies,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useMovieListQuery(ratingFilter)

  const handleLoadMore = useCallback(() => {
    void fetchNextPage()
  }, [fetchNextPage])

  const loadMoreRef = useInfiniteScroll({
    enabled: !!hasNextPage,
    isLoading: isFetchingNextPage,
    onIntersect: handleLoadMore,
  })

  return (
    <main className="mx-auto max-w-[1120px] px-8 py-14">
      <h1 className="text-display text-primary-600">Movie Project</h1>

      <RatingFilter value={ratingFilter} onChange={setRatingFilter} />

      {isLoading && (
        <p className="mt-10 text-center text-body text-gray-500">
          Loading movies...
        </p>
      )}

      {isError && (
        <p className="mt-10 text-center text-body text-gray-500">
          Failed to load movies.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <MovieGrid movies={movies} />

          <div ref={loadMoreRef} className="h-10" />

          {isFetchingNextPage && (
            <p className="mt-4 text-center text-body text-gray-500">
              Loading more movies...
            </p>
          )}
        </>
      )}
    </main>
  )
}

export default MovieListPage
