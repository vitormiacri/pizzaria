import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Order } from '@/presentation/pages';
import { PizzaProvider } from '@/presentation/context/pizzas/pizzas-context';
import { RemoteLoadPizzasData } from '@/data/usecases/load-pizzas-data/remote-load-pizzas-data';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';

const Router: React.FC = () => {
  const url = 'http://localhost:3000/pizzaria';
  const axiosHttpClient = new AxiosHttpClient();
  const remoteLoadPizzaData = new RemoteLoadPizzasData(url, axiosHttpClient);
  return (
    <PizzaProvider pizzaData={remoteLoadPizzaData}>
      <BrowserRouter>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/order" exact component={Order} />
        </Switch>
      </BrowserRouter>
    </PizzaProvider>
  );
};

export default Router;
