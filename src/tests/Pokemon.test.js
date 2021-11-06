import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 6. Teste o componente <Pokemon.js />', () => {
  test(`Teste se é renderizado um card com as
    informações de determinado pokémon`, () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByText(/Average weight/i);
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`Teste se o card do Pokémon indicado na Pokédex contém um link de 
  navegação para exibir detalhes deste Pokémon. 
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;`, () => {
    const { history } = renderWithRouter(<App />);

    const btnDetails = screen.getByRole('link', { name: /more details/i });
    expect(btnDetails).toBeInTheDocument();
    userEvent.click(btnDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);

    const favoriteCheck = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(favoriteCheck);

    const iconAlt = screen.getByAltText('Pikachu is marked as favorite');
    expect(iconAlt).toBeInTheDocument();
    expect(iconAlt).toHaveAttribute('src', '/star-icon.svg');
  });
});
