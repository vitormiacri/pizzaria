import React, { createContext, useCallback, useState } from 'react';
import {
  LoadPizzaDataModel,
  LoadPizzaData,
  OrderModel,
} from '@/domain/usecases/load-pizzas-data';

type PizzaContextData = {
  pizzaria: LoadPizzaDataModel;
  getPizzaData(): void;
  step: number;
  setStep(newStep: number): void;
  getOrder(): OrderModel;
  setOrderItem(item: string, value: string): void;
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
  const [step, setStep] = useState<number>(1);
  const [order, setOrder] = useState<OrderModel>({
    massa: '',
    sabor: '',
    tamanho: '',
    oferta: 'nao',
  });

  const getOrder = useCallback(() => {
    return order;
  }, []);

  const setNewOrderItem = useCallback((item: string, value: string) => {
    setOrder({
      ...order,
      [item]: value,
    });
  }, []);

  const getPizzaData = useCallback(async () => {
    const response = await pizzaData.loadData();
    setPizza({
      ...response,
    });
  }, []);

  return (
    <PizzaContext.Provider
      value={{
        pizzaria: pizza,
        step,
        setStep: (newStep) => setStep(newStep),
        getOrder,
        setOrderItem: (item, value) => setNewOrderItem(item, value),
        getPizzaData,
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
};
