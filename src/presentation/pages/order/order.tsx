import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Header, Button, MainContainer } from '@/presentation/components';
import { PizzaContext } from '@/presentation/context/pizzas/pizzas-context';
import Styles from './order-styles.scss';

const Order: React.FC = () => {
  const history = useHistory();
  const { pizzaria, getPizzaData, step, setStep } = useContext(PizzaContext);

  const handleClick = useCallback(() => {
    setStep(2);
    history.push('/order/step2');
  }, []);

  const handleBack = useCallback(() => {
    history.replace('/home');
  }, []);

  useEffect(() => {
    getPizzaData();
  }, []);

  return (
    <MainContainer>
      <Header />
      <div className={Styles.card}>
        <p data-testid="passos">Passo {step} de 4</p>
        <h2>Selecione a massa:</h2>
        <div className={Styles.list}>
          {pizzaria &&
            pizzaria.massas.map((massa, index) => (
              <button
                type="button"
                data-testid="massa"
                key={index}
                onClick={handleClick}
              >
                <p>{massa}</p>
              </button>
            ))}
        </div>
        <Button
          text="Voltar"
          data-testid="back-button"
          handleClick={handleBack}
        />
      </div>
    </MainContainer>
  );
};

export default Order;
