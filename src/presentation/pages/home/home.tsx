import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import { PizzaContext } from '@/presentation/context/pizzas/pizzas-context';
import { Header, Button, MainContainer } from '@/presentation/components';
import Image from '../../../assets/pizza-oferta.png';
import Styles from './home-styles.scss';

const Home: React.FC = () => {
  const history = useHistory();
  const { setOffer, pizzaria, getPizzaData } = useContext(PizzaContext);

  const handleClickOrder = useCallback(() => {
    history.push('/order');
  }, []);

  const handleClickOffer = useCallback(() => {
    const { ofertaDia } = pizzaria;
    setOffer({
      ...ofertaDia.pizza,
      oferta: 'sim',
      pontos: ofertaDia.pontos,
    });
    history.push('/checkout');
  }, [pizzaria]);

  useEffect(() => {
    getPizzaData();
  }, []);

  return (
    <MainContainer>
      <Header />
      <div className={Styles.card}>
        <h2>Seja muito bem-vindo(a)!</h2>
        <div className={Styles.offer}>
          <img src={Image} alt="Moda da Casa" />
          <div>
            {pizzaria && (
              <>
                <p>
                  {`A oferta do dia é uma pizza ${pizzaria.ofertaDia.pizza.tamanho} de ${pizzaria.ofertaDia.pizza.sabor} com massa ${pizzaria.ofertaDia.pizza.massa}!`}
                </p>
                <p>{`Peça e ganhe +${pizzaria.ofertaDia.pontos} pontos!`}</p>
              </>
            )}

            <Button
              text="QUERO A OFERTA"
              data-testid="checkout-button"
              handleClick={handleClickOffer}
            ></Button>
          </div>
        </div>
        <div className={Styles.custom}>
          <p>Ou se preferir </p>
          <Button
            text="MONTE A SUA"
            data-testid="order-button"
            handleClick={handleClickOrder}
          ></Button>
        </div>
      </div>
    </MainContainer>
  );
};

export default Home;
