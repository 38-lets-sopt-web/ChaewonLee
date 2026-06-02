import { createBrowserRouter } from 'react-router-dom'

import MovieDetailPage from '../pages/movie-detail/movie-detail-page'
import MovieListPage from '../pages/movie-list/movie-list-page'
import Layout from './layout'
import { ROUTES } from './paths'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: Layout,
    children: [
      {
        index: true,
        Component: MovieListPage,
      },
      {
        path: ROUTES.MOVIE_DETAIL,
        Component: MovieDetailPage,
      },
    ],
  },
])
