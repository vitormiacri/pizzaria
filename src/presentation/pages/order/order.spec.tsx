import React from 'react';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { renderWithHistory } from '@/presentation/test/render-help';
import Order from './order';
import db from '../../../../db.json';

const history = createMemoryHistory({ initialEntries: ['/order'] });

const makeSut = (step = 1) => {
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
      step,
      setStep: (value) => value + 1,
      setOrderItem: (item: string, value: string) => jest.fn(),
    },
  });
  return sut;
};
describe('Order Page', () => {
  beforeEach(cleanup);
  test('Should be render with correct initial values', async () => {
    const sut = makeSut();
    const steps = sut.getByTestId('passos');
    const button = sut.getAllByTestId('massa');
    await waitFor(() => {
      sut.getAllByTestId('massa');
    });
    expect(steps.textContent).toEqual('Passo 1 de 4');
    expect(button[0].textContent).toEqual('Tradicional');
    expect(button[1].textContent).toEqual('Crocante');
    expect(button[2].textContent).toEqual('Macia');
    expect(button[3].textContent).toEqual('Sem glúten');
  });

  test('Should return to Home page if back button clicked', async () => {
    const sut = makeSut();
    const button = sut.getByTestId('back-button');
    await waitFor(() => fireEvent.click(button));
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/home');
  });

  test('Should be show all flavors if step is 2', async () => {
    const sut = makeSut(2);
    const buttonSabores = sut.getAllByTestId('sabor');
    expect(buttonSabores[0].textContent).toEqual('Calabresa');
    expect(buttonSabores[1].textContent).toEqual('Portuguesa');
  });

  test('Should be show all sizes if step is 3', async () => {
    const sut = makeSut(3);
    const buttonSabores = sut.getAllByTestId('tamanhos');
    expect(buttonSabores[0].textContent).toEqual('Pequena');
    expect(buttonSabores[1].textContent).toEqual('Média');
    expect(buttonSabores[2].textContent).toEqual('Grande');
    expect(buttonSabores[3].textContent).toEqual('Gigante');
  });
});
