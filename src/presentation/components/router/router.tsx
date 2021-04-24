import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '@/presentation/pages/home/home';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
