import React from 'react';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { renderWithHistory } from '@/presentation/test/render-help';
import Finished from './finished';
import db from '../../../../db.json';

const history = createMemoryHistory({ initialEntries: ['/finished'] });

const makeSut = () => {
  const sut = renderWithHistory({
    Page: () => Finished({ children: <Finished /> }),
    history,
    initialState: {
      order: {
        massa: '',
        sabor: '',
        tamanho: '',
        oferta: '',
        pontos: '0',
      },
      pizzaria: {
        ...db.pizzaria,
      },
      step: 1,
      setStep: jest.fn(),
      setOffer: jest.fn(),
      setOrderItem: jest.fn(),
    },
  });
  return sut;
};

describe('Finished Page', () => {
  afterEach(cleanup);

  test('Should go back to home page', () => {
    const sut = makeSut();
    const button = sut.getByTestId('back-button');
    waitFor(() => fireEvent.click(button));
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/home');
  });
});
