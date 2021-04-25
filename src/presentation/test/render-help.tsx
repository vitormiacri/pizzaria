import React from 'react';
import { Router } from 'react-router-dom';
import { MemoryHistory } from 'history';
import { render, RenderResult } from '@testing-library/react';
import { LoadPizzaDataModel } from '@/domain/usecases/load-pizzas-data';
import { PizzaProvider } from '../context/pizzas/pizzas-context';
import { HttpClientSpy } from '@/data/test/mock-http';
import { RemoteLoadPizzasData } from '@/data/usecases/load-pizzas-data/remote-load-pizzas-data';

type Params = {
  Page: React.FC;
  history: MemoryHistory;
};

export const renderWithHistory = ({ Page, history }: Params): RenderResult => {
  const url = '';
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadPizzasData(url, httpClientSpy);
  return render(
    <PizzaProvider pizzaData={sut}>
      <Router history={history}>
        <Page />
      </Router>
    </PizzaProvider>
  );
};
