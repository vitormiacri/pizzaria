import React, { useCallback, useContext, useEffect } from 'react';

import { Header, MainContainer } from '@/presentation/components';
import { PizzaContext } from '@/presentation/context/pizzas/pizzas-context';
import Styles from './order-styles.scss';
import Step1 from './components/step1/step1';
import Step2 from './components/step2/step2';
import Step3 from './components/step3/step3';

const Order: React.FC = () => {
  const { getPizzaData, step } = useContext(PizzaContext);

  useEffect(() => {
    getPizzaData();
  }, []);

  return (
    <MainContainer>
      <Header />
      <div className={Styles.card}>
        <p data-testid="passos">Passo {step} de 4</p>
        {step === 1 ? <Step1 /> : null}
        {step === 2 ? <Step2 /> : null}
        {step === 3 ? <Step3 /> : null}
      </div>
    </MainContainer>
  );
};

export default Order;
