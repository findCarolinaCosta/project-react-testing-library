import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Requisito 7. Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });
  test(`Teste se as informações detalhadas do Pokémon selecionado 
  são mostradas na tela.`, () => {
    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);

    const pokemonName = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(pokemonName).toBeInTheDocument();

    expect(btnDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: /Summary/i });
    expect(summary).toBeInTheDocument();

    const resume = screen.getByText(/This intelligent Pokémon/i);
    expect(resume).toBeInTheDocument();
  });

  test(`Teste se existe na página uma seção com os mapas 
  contendo as localizações do pokémon`, () => {
    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);

    const sectionGameLocation = screen.getByRole('heading',
      { name: 'Game Locations of Pikachu' });
    expect(sectionGameLocation).toBeInTheDocument();

    const allLocation = screen.getAllByAltText('Pikachu location');
    allLocation.forEach((item) => expect(item).toBeInTheDocument());
    expect(allLocation).toHaveLength(2);
    expect(allLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(allLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const locationList = [
      'Kanto Viridian Forest',
      'Kanto Power Plant',
    ];
    locationList.forEach((name) => {
      const nameItem = screen.getByText(name);
      expect(nameItem).toBeInTheDocument();
    });
  });

  test(`Teste se o usuário pode favoritar um 
  pokémon através da página de detalhes`, () => {
    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    const labelCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(labelCheckbox).toBeInTheDocument();
  });
});

test('', () => {});
