import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { PizzaContext } from '@/presentation/context/pizzas/pizzas-context';
import { Header, Button, MainContainer } from '@/presentation/components';
import Image from '../../../assets/pizza-oferta.png';
import Styles from './checkout-styles.scss';

const Checkout: React.FC = () => {
  const { order } = useContext(PizzaContext);
  const history = useHistory();

  const handleClickBack = useCallback(() => {
    history.goBack();
  }, []);

  const handleClickConfirm = useCallback(() => {
    history.push('/finished');
  }, []);

  return (
    <MainContainer>
      <Header />
      <div className={Styles.card}>
        <h2>Confirme o seu pedido</h2>
        <div className={Styles.offer}>
          <img src={Image} alt="Moda da Casa" />
          <div className={Styles.order} data-testid="order-resume">
            <p data-testid="massa">{`Massa: ${order.massa}`}</p>
            <p data-testid="sabor">{`Sabor: ${order.sabor}`}</p>
            <p data-testid="tamanho">{`Tamanho: ${order.tamanho}`}</p>
            {order.oferta === 'sim' && (
              <p data-testid="pontos">{`Você irá receber: ${order.pontos} pontos do programa de benefícios`}</p>
            )}
          </div>
          <div className={Styles.footer}>
            <Button
              text="VOLTAR"
              data-testid="back-button"
              handleClick={handleClickBack}
            ></Button>
            <Button
              text="CONFIRMAR"
              data-testid="confirm-button"
              handleClick={handleClickConfirm}
            ></Button>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Checkout;
