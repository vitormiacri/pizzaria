import React from 'react';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { renderWithHistory } from '@/presentation/test/render-help';
import Order from './order';
import db from '../../../../db.json';

const history = createMemoryHistory({ initialEntries: ['/order'] });

const makeSut = () => {
  const sut = renderWithHistory({
    Page: () => Order({ children: <Order /> }),
    history,
    initialState: {
      getOrder: () => ({
        massa: '',
        sabor: '',
        tamanho: '',
        oferta: '',
      }),
      pizzaria: {
        ...db.pizzaria,
      },
      step: 1,
      setStep: jest.fn(),
      setOrderItem: (item: string, value: string) => jest.fn(),
    },
  });
  return sut;
};
describe('Order Page', () => {
  beforeEach(cleanup);
  test('Should be render with correct initial values', () => {
    const sut = makeSut();
    const steps = sut.getByTestId('passos');
    const button = sut.getAllByTestId('massa');
    waitFor(() => {
      sut.getByTestId('massa');
    });
    expect(steps.textContent).toEqual('Passo 1 de 4');
    expect(button[0].textContent).toEqual('Tradicional');
    expect(button[1].textContent).toEqual('Crocante');
    expect(button[2].textContent).toEqual('Macia');
    expect(button[3].textContent).toEqual('Sem glúten');
  });

  test('Should go to Order page step 2 after button clicked', () => {
    const sut = makeSut();
    const button = sut.getByTestId('back-button');
    waitFor(() => fireEvent.click(button));
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/order');
  });

  test('Should return to Home page if back button clicked', () => {
    const sut = makeSut();
    const button = sut.getByTestId('back-button');
    waitFor(() => fireEvent.click(button));
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/order');
  });
});
