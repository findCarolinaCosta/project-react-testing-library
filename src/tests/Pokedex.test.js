import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Pokemons from '../data';

describe('Requisito 5. Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });

  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const titleHeding = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(titleHeding).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon da lista quando o botão Próximo 
  pokémon é clicado`, () => {
    const btnNext = screen.getByTestId('next-pokemon');
    expect(btnNext).toContainHTML('Próximo pokémon');
    const nextPokemon = screen.getByTestId('pokemon-name');

    Pokemons.forEach((item) => {
      expect(nextPokemon).toHaveTextContent(item.name);
      userEvent.click(btnNext);
    });
    expect(nextPokemon).toContainHTML('Pikachu'); // se voltou do ínicio
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const cardImg = screen.getAllByRole('img');
    expect(cardImg).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const pokemonTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const btnType = screen.getAllByTestId('pokemon-type-button');
    const arrayBtnType = btnType.map((type) => type.innerHTML);
    expect(arrayBtnType).toEqual(pokemonTypes);

    userEvent.click(btnType[1]);
    const pokemonName = screen.getByText('Charmander');
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    const btnNext = screen.getByTestId('next-pokemon');
    userEvent.click(btnNext);
    expect(pokemonType.textContent).toBe('Fire');

    const btnAll = screen.getByText('All');
    expect(btnAll).toBeVisible();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(btnNext);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();

    const btnFire = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(btnFire);
    expect(charmander).toBeInTheDocument();

    const btnAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(btnAll);
    expect(pikachu).toBeInTheDocument();
  });
});
