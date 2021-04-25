import React from 'react';
import { Router } from 'react-router-dom';
import { MemoryHistory } from 'history';
import { render, RenderResult } from '@testing-library/react';
import {
  LoadPizzaDataModel,
  OrderModel,
} from '@/domain/usecases/load-pizzas-data';
import { PizzaContext } from '../context/pizzas/pizzas-context';
import { HttpClientSpy } from '@/data/test/mock-http';
import { RemoteLoadPizzasData } from '@/data/usecases/load-pizzas-data/remote-load-pizzas-data';

type Params = {
  Page: React.FC;
  history: MemoryHistory;
  initialState: {
    pizzaria: LoadPizzaDataModel;
    step: number;
    setStep(newStep: number): void;
    getOrder(): OrderModel;
    setOrderItem(item: string, value: string): void;
  };
};

export const renderWithHistory = ({
  Page,
  history,
  initialState,
}: Params): RenderResult => {
  const url = '';
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadPizzasData(url, httpClientSpy);

  return render(
    <PizzaContext.Provider
      value={{
        ...initialState,
        getPizzaData: () => sut,
      }}
    >
      <Router history={history}>
        <Page />
      </Router>
    </PizzaContext.Provider>
  );
};
