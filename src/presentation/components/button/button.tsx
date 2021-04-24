import React from 'react';
import Styles from './button-styles.scss';

type Props = {
  text: string;
  handleClick(): void;
};

const Button: React.FC<Props> = ({ text, handleClick, ...rest }) => {
  return (
    <button
      className={Styles.button}
      type="button"
      data-testid="order-init"
      onClick={handleClick}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
