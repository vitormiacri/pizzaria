import React, { useContext } from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { renderWithHistory } from '@/presentation/test/render-help';
import Home from './home';

const history = createMemoryHistory({ initialEntries: ['/home'] });

const makeSut = () => {
  const sut = renderWithHistory({
    Page: () => Home({ children: <Home /> }),
    history,
  });
  return sut;
};

describe('Home Component', () => {
  afterEach(cleanup);

  test('Should go to Order page', () => {
    const sut = makeSut();
    const button = sut.getByTestId('order-button');
    waitFor(() => fireEvent.click(button));
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/order');
  });

  test('Should go to Checkout page', () => {
    const sut = makeSut();
    const button = sut.getByTestId('checkout-button');
    waitFor(() => fireEvent.click(button));
    expect(history.length).toBe(3);
    expect(history.location.pathname).toBe('/checkout');
  });
});
