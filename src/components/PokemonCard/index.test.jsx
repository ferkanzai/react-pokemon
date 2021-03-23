import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import PokemonCard from './index';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children }) => {
    return <a href={to}>{children}</a>;
  },
}));

const mockProps = {
  pokemon: {
    name: 'golduck',
    id: '55',
    types: [
      {
        type: {
          name: 'water',
        },
      },
    ],
  },
  // setPokemonList: () => void
};

describe('PokemonCard', () => {
  it('card is visible', () => {
    const { debug } = render(<PokemonCard {...mockProps} />);
    debug();
    const card = screen.queryByTestId('pokemon-card');
    expect(card).toBeVisible();
  });
});
