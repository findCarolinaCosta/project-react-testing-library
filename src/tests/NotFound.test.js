import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Requisito 4. Teste o componente <NotFound.js />', () => {
  beforeEach(() => {
    render(
      <NotFound />,
    );
  });
  test(`Teste se página contém um heading h2 com 
o texto Page requested not found 😭`, () => {
    const notFoundText = screen.getByRole('heading', { name:
        /Page requested not found/i });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    const img = screen.getByRole('img', { name: /Pikachu/i });
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
