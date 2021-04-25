import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router';

import { PizzaContext } from '@/presentation/context/pizzas/pizzas-context';
import Styles from '../../order-styles.scss';
import { Button } from '@/presentation/components';

const Step1: React.FC = () => {
  const history = useHistory();
  const { pizzaria, setStep, setOrderItem } = useContext(PizzaContext);

  const handleBack = useCallback(() => {
    history.replace('/home');
  }, []);

  const handleClick = useCallback((value: string) => {
    setStep(2);
    setOrderItem('massa', value);
  }, []);

  return (
    <>
      <h2>Selecione a massa:</h2>
      <div className={Styles.list}>
        {pizzaria &&
          pizzaria.massas.map((massa, index) => (
            <button
              type="button"
              data-testid="massa"
              key={index}
              onClick={() => handleClick(massa)}
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
    </>
  );
};

export default Step1;
