import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { Header, Button, MainContainer } from '@/presentation/components';
import Styles from './finished-styles.scss';

const Finished: React.FC = () => {
  const history = useHistory();

  const handleClickOrder = useCallback(() => {
    history.push('/home');
  }, []);

  return (
    <MainContainer>
      <Header />
      <div className={Styles.card}>
        <h2>Pedido confirmado com sucesso!</h2>
        <p>Em breve seu pedido sairá para entrega!</p>
        <Button
          text="VOLTAR PARA O INÍCIO"
          data-testid="back-button"
          handleClick={handleClickOrder}
        ></Button>
      </div>
    </MainContainer>
  );
};

export default Finished;
