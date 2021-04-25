import React from 'react';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { renderWithHistory } from '@/presentation/test/render-help';
import Home from './home';
import db from '../../../../db.json';

const history = createMemoryHistory({ initialEntries: ['/home'] });

const makeSut = () => {
  const sut = renderWithHistory({
    Page: () => Home({ children: <Home /> }),
    history,
    initialState: {
      order: {
        massa: '',
        sabor: '',
        tamanho: '',
        oferta: '',
      },
      pizzaria: {
        ...db.pizzaria,
      },
      step: 1,
      setStep: jest.fn(),
      setOffer: jest.fn(),
      setOrderItem: (item: string, value: string) => jest.fn(),
    },
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
