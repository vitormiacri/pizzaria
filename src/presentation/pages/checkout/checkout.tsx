import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { Header, Button } from '@/presentation/components';
import Image from '../../../assets/pizza-oferta.png';
import Styles from './home-styles.scss';

const Checkout: React.FC = () => {
  const history = useHistory();

  const handleClickOrder = useCallback(() => {
    history.push('/order');
  }, []);

  const handleClickOffer = useCallback(() => {
    history.push('/checkout');
  }, []);

  return (
    <div className={Styles.home}>
      <Header />
      <div className={Styles.card}>
        <h2>Seja muito bem-vindo(a)!</h2>
        <div className={Styles.offer}>
          <img src={Image} alt="Moda da Casa" />
          <div>
            <p>A oferta do dia é a Moda da Casa!</p>
            <Button
              text="QUERO A OFERTA"
              handleClick={() => console.log()}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
