import React, { createContext, useCallback, useState } from 'react';
import {
  LoadPizzaDataModel,
  LoadPizzaData,
} from '@/domain/usecases/load-pizzas-data';

type PizzaContextData = {
  pizzaria: LoadPizzaDataModel;
  getPizzaData(): void;
};

type PizzaProvider = {
  pizzaData: LoadPizzaData;
};

export const PizzaContext = createContext<PizzaContextData>(
  {} as PizzaContextData
);

export const PizzaProvider: React.FC<PizzaProvider> = ({
  pizzaData,
  children,
}) => {
  const [pizza, setPizza] = useState<LoadPizzaDataModel>();
  const getPizzaData = useCallback(async () => {
    const response = await pizzaData.loadData();
    setPizza({
      ...response,
    });
  }, []);

  return (
    <PizzaContext.Provider value={{ pizzaria: pizza, getPizzaData }}>
      {children}
    </PizzaContext.Provider>
  );
};
