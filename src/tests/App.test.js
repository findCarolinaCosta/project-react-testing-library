import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1 - Teste do componente <App.js />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });
  test(`Teste se o topo da aplicação contém 
  um conjunto fixo de links de navegação`, () => {
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página inicial, 
  na URL / ao clicar no link Home da barra de navegação`, () => {
    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);
    const homeHeading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(homeHeading).toBeDefined();
  });

  test(`Teste se a aplicação é redirecionada para a página de About,
   na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    const aboutHeading = screen.getByRole('heading', {
      name: /About Pokédex/i,
    });
    expect(aboutHeading).toBeDefined();
  });

  test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, 
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const linkFavoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavoritePokemons);
    const favoritePokemonsHeading = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
    });
    expect(favoritePokemonsHeading).toBeDefined();
  });

  test(`Teste se a aplicação é redirecionada para a 
  página Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/páginadesconhecida');

    const notFoundText = screen.getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
