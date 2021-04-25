import React, { createContext, useCallback, useState } from 'react';
import {
  LoadPizzaDataModel,
  LoadPizzaData,
  OrderModel,
} from '@/domain/usecases/load-pizzas-data';

type PizzaContextData = {
  pizzaria: LoadPizzaDataModel;
  step: number;
  order: OrderModel;
  setOffer(offer: OrderModel): void;
  getPizzaData(): void;
  setStep(newStep: number): void;
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

  const setOffer = useCallback(
    (order: OrderModel) => {
      setOrder({
        ...order,
      });
    },
    [order]
  );

  const setNewOrderItem = useCallback(
    (item: string, value: string) => {
      setOrder({
        ...order,
        [item]: value,
      });
    },
    [order]
  );

  const getPizzaData = useCallback(async () => {
    const response = await pizzaData.loadData();
    setPizza({
      ...response,
    });
  }, [pizza]);

  return (
    <PizzaContext.Provider
      value={{
        pizzaria: pizza,
        step,
        order,
        setOffer,
        setStep: (newStep) => setStep(newStep),
        setOrderItem: (item, value) => setNewOrderItem(item, value),
        getPizzaData,
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
};
