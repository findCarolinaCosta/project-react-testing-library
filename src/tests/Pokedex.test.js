import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

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
    userEvent.click(btnNext);
    const nextPokemon = screen.getByTestId('pokemon-name');
    expect(nextPokemon).toContainHTML('Charmander');
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
  }); // ficará faltando boa parte dos mini testes sobre os filtros para estar mais completo porém passando no requisito

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const btnFire = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(btnFire);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();

    const btnAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(btnAll);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
