import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router';

import { PizzaContext } from '@/presentation/context/pizzas/pizzas-context';
import Styles from '../../order-styles.scss';
import { Button } from '@/presentation/components';

const Step3: React.FC = () => {
  const history = useHistory();
  const { pizzaria, setStep, setOrderItem } = useContext(PizzaContext);

  const handleBack = useCallback(() => {
    setStep(2);
  }, []);

  const handleClick = useCallback((value: string) => {
    setOrderItem('tamanho', value);
    history.push('/checkout');
  }, []);

  return (
    <>
      <h2>Selecione o sabor:</h2>
      <div className={Styles.list}>
        {pizzaria &&
          pizzaria.tamanhos.map((tamanho, index) => (
            <button
              type="button"
              data-testid="tamanhos"
              key={index}
              onClick={() => handleClick(tamanho)}
            >
              <p>{tamanho}</p>
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

export default Step3;
