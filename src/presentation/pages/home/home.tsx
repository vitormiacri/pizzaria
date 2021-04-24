import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { Header, Button } from '@/presentation/components';
import Styles from './home-styles.scss';

const Home: React.FC = () => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push('/order');
  }, []);

  return (
    <div className={Styles.home}>
      <Header />
      <div className={Styles.card}>
        <h2>🍕 Seja muito bem-vindo(a)! 🍕</h2>
        <p>Aqui você encontrará diversas opções de pizzas</p>
        <p>com os mais variados sabores, massas e tamanhos!</p>
        <p>
          Faça seu pedido clicando na opção abaixo e receba sua pizza no
          conforto da sua casa! 😃
        </p>
        <Button text="FAZER PEDIDO" handleClick={handleClick} />
      </div>
    </div>
  );
};

export default Home;
