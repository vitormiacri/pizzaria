import React from 'react';

import Header from '@/presentation/components/header/header';
import Styles from './home-styles.scss';

const Home: React.FC = () => {
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
        <button type="button">INICIAR PEDIDO</button>
      </div>
    </div>
  );
};

export default Home;
