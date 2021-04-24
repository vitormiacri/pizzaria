import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Home from './home';
import { Router } from 'react-router';

const history = createMemoryHistory({ initialEntries: ['/home'] });

describe('Home Component', () => {
  test('Should go to Order page', () => {
    const { getByTestId } = render(
      <Router history={history}>
        <Home />
      </Router>
    );
    const button = getByTestId('order-init');
    fireEvent.click(button);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/order');
  });
});
