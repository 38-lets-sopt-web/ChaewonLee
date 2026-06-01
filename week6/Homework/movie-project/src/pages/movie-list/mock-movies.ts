import type { MovieCardItem } from '../../types/movie'

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export const MOCK_MOVIES: MovieCardItem[] = [
  {
    id: 564,
    title: 'The Mummy',
    overview:
      "Dashing legionnaire Rick O'Connell stumbles upon the hidden ruins of Hamunaptra while in the midst of a battle to claim the area in 1920s Egypt. It has been over three thousand years since former High Priest Imhotep suffered a fate worse than death as a punishment for a forbidden love-along with a curse that guarantees eternal doom upon the world if he is ever awoken.",
    posterUrl: `${TMDB_IMAGE_BASE_URL}/yhIsVvcUm7QxzLfT6HW2wLf5ajY.jpg`,
    releaseDate: '1999-04-16',
    voteAverage: 6.97,
  },
  {
    id: 1327819,
    title: 'Hoppers',
    overview:
      "Scientists have discovered how to 'hop' human consciousness into lifelike robotic animals, allowing people to communicate with animals as animals. Animal lover Mabel seizes an opportunity to use the technology, uncovering mysteries within the animal world beyond anything she could have imagined.",
    posterUrl: `${TMDB_IMAGE_BASE_URL}/xjtWQ2CL1mpmMNwuU5HeS4Iuwuu.jpg`,
    releaseDate: '2026-03-04',
    voteAverage: 8.083,
  },
]
