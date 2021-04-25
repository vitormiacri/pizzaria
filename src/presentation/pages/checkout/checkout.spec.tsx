import React from 'react';
import {
  cleanup,
  fireEvent,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { renderWithHistory } from '@/presentation/test/render-help';
import Checkout from './checkout';
import db from '../../../../db.json';
import { OrderModel } from '@/domain/usecases/load-pizzas-data';

const history = createMemoryHistory({ initialEntries: ['/checkout'] });

type SutTypes = {
  sut: RenderResult;
  setStep(): void;
  setOrderItem(): void;
};
const makeSut = (order: OrderModel): SutTypes => {
  const setStep = jest.fn();
  const setOrderItem = jest.fn();
  const setOffer = jest.fn();
  const sut = renderWithHistory({
    Page: () => Checkout({ children: <Checkout /> }),
    history,
    initialState: {
      order: {
        ...order,
      },
      pizzaria: {
        ...db.pizzaria,
      },
      step: 4,
      setOffer,
      setStep,
      setOrderItem,
    },
  });
  return { sut, setStep, setOrderItem };
};

describe('Checkout Page', () => {
  beforeEach(cleanup);
  test('Should be render with correct correct values when offer is true', async () => {
    const { sut } = makeSut({
      sabor: 'Moda da Casa',
      massa: 'Crocante',
      tamanho: 'Média',
      pontos: '40',
      oferta: 'sim',
    });
    const massaLabel = sut.getByTestId('massa');
    const saborLabel = sut.getByTestId('sabor');
    const tamanhoLabel = sut.getByTestId('tamanho');
    const pontosLabel = sut.getByTestId('pontos');
    expect(massaLabel.textContent).toEqual('Massa: Crocante');
    expect(saborLabel.textContent).toEqual('Sabor: Moda da Casa');
    expect(tamanhoLabel.textContent).toEqual('Tamanho: Média');
    expect(pontosLabel.textContent).toEqual(
      'Você irá receber: 40 pontos do programa de benefícios'
    );
  });

  test('Should be render with correct correct values when offer is false', async () => {
    const { sut } = makeSut({
      sabor: 'Moda da Casa',
      massa: 'Crocante',
      tamanho: 'Média',
      pontos: '40',
      oferta: 'nao',
    });
    const massaLabel = sut.getByTestId('massa');
    const saborLabel = sut.getByTestId('sabor');
    const tamanhoLabel = sut.getByTestId('tamanho');
    expect(massaLabel.textContent).toEqual('Massa: Crocante');
    expect(saborLabel.textContent).toEqual('Sabor: Moda da Casa');
    expect(tamanhoLabel.textContent).toEqual('Tamanho: Média');
    expect(sut.queryByTestId(/pontos/i)).toBeNull();
  });

  test('Should go back when clicked on back button', async () => {
    const { sut } = makeSut({
      sabor: 'Moda da Casa',
      massa: 'Crocante',
      tamanho: 'Média',
      pontos: '40',
      oferta: 'nao',
    });
    const button = sut.getByTestId('back-button');
    waitFor(() => fireEvent.click(button));
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/checkout');
  });

  test('Should go to finished page when clicked on confirm button', async () => {
    const { sut } = makeSut({
      sabor: 'Moda da Casa',
      massa: 'Crocante',
      tamanho: 'Média',
      pontos: '40',
      oferta: 'nao',
    });
    const button = sut.getByTestId('confirm-button');
    waitFor(() => fireEvent.click(button));
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/finished');
  });
});
