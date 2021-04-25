import React, { useCallback, useContext } from 'react';

import { PizzaContext } from '@/presentation/context/pizzas/pizzas-context';
import Styles from '../../order-styles.scss';
import { Button } from '@/presentation/components';

const Step2: React.FC = () => {
  const { pizzaria, setStep, setOrderItem } = useContext(PizzaContext);

  const handleBack = useCallback(() => {
    setStep(1);
  }, []);

  const handleClick = useCallback((value: string) => {
    setStep(3);
    setOrderItem('sabor', value);
  }, []);

  return (
    <>
      <h2>Selecione o sabor:</h2>
      <div className={Styles.list}>
        {pizzaria &&
          pizzaria.sabores.map((sabor, index) => (
            <button
              type="button"
              data-testid="sabor"
              key={index}
              onClick={() => handleClick(sabor)}
            >
              <p>{sabor}</p>
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

export default Step2;
