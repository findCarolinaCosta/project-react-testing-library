import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Requisito 3. Teste o componente <FavoritePokemons.js />', () => {
  beforeEach(() => {
    render(
      <FavoritePokemons />,
    );
  });

  test(`Teste se é exibido na tela a mensagem No 
  favorite pokemon found, se a pessoa não tiver pokémons favoritos`, () => {
    const nothingFoundText = screen.getByText('No favorite pokemon found');
    expect(nothingFoundText).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btnMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(btnMoreDetails);

    const favoriteCheck = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck);

    const linkFavs = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavs);
  });
});
