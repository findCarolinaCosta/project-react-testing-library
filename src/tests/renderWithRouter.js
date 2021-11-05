import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();

  const returnFromRender = render(
    <Router history={ customHistory }>
      {component}
    </Router>,
  );

  return { history: customHistory, ...returnFromRender };
}

export default renderWithRouter; // fonte: aula 14.3 com Robesto Cestari, entendi completamente e repliquei porque achei prático a forma que ele fez!
