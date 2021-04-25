import React from 'react';
import {
  cleanup,
  fireEvent,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { renderWithHistory } from '@/presentation/test/render-help';
import Order from './order';
import db from '../../../../db.json';

const history = createMemoryHistory({ initialEntries: ['/order'] });

type SutTypes = {
  sut: RenderResult;
  setStep(): void;
  setOrderItem(): void;
};
const makeSut = (step = 1): SutTypes => {
  const setStep = jest.fn();
  const setOrderItem = jest.fn();
  const setOffer = jest.fn();
  const sut = renderWithHistory({
    Page: () => Order({ children: <Order /> }),
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
      step,
      setOffer,
      setStep,
      setOrderItem,
    },
  });
  return { sut, setStep, setOrderItem };
};

describe('Order Page', () => {
  beforeEach(cleanup);
  test('Should be render with correct initial values', async () => {
    const { sut, setStep, setOrderItem } = makeSut();
    const steps = sut.getByTestId('passos');
    const button = sut.getAllByTestId('massa');
    await waitFor(() => {
      sut.getAllByTestId('massa');
      fireEvent.click(button[0]);
    });
    expect(steps.textContent).toEqual('Passo 1 de 4');
    expect(button[0].textContent).toEqual('Tradicional');
    expect(button[1].textContent).toEqual('Crocante');
    expect(button[2].textContent).toEqual('Macia');
    expect(button[3].textContent).toEqual('Sem glúten');
    expect(setStep).toBeCalled();
    expect(setOrderItem).toBeCalled();
  });

  test('Should return to Home page if back button clicked', async () => {
    const { sut } = makeSut();
    const button = sut.getByTestId('back-button');
    await waitFor(() => fireEvent.click(button));
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/home');
  });

  test('Should be show all flavors if step is 2', async () => {
    const { sut, setStep, setOrderItem } = makeSut(2);
    const steps = sut.getByTestId('passos');
    const buttonSabores = sut.getAllByTestId('sabor');
    await waitFor(() => fireEvent.click(buttonSabores[0]));
    expect(steps.textContent).toEqual('Passo 2 de 4');
    expect(buttonSabores[0].textContent).toEqual('Calabresa');
    expect(buttonSabores[1].textContent).toEqual('Portuguesa');
    expect(setStep).toBeCalled();
    expect(setOrderItem).toBeCalled();
  });

  test('Should be show all sizes if step is 3', async () => {
    const { sut, setOrderItem } = makeSut(3);
    const steps = sut.getByTestId('passos');
    const buttonTamanhos = sut.getAllByTestId('tamanhos');
    await waitFor(() => fireEvent.click(buttonTamanhos[0]));
    expect(steps.textContent).toEqual('Passo 3 de 4');
    expect(buttonTamanhos[0].textContent).toEqual('Pequena');
    expect(buttonTamanhos[1].textContent).toEqual('Média');
    expect(buttonTamanhos[2].textContent).toEqual('Grande');
    expect(buttonTamanhos[3].textContent).toEqual('Gigante');
    expect(setOrderItem).toBeCalled();
  });
});
