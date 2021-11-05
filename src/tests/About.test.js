import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 2. Teste o componente <About.js />.', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const titleHeading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(titleHeading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const wordBothSentences = screen.getAllByText(/Pokémons/i);
    expect(wordBothSentences).toHaveLength(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex: link', () => {
    const pokedexImg = screen.getByRole('img', { name: 'Pokédex' });
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
