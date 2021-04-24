import React, { memo } from 'react';
import Logo from '../logo/logo';
import Styles from './header-styles.scss';

type Props = React.HTMLAttributes<HTMLElement>;

const Header: React.FC<Props> = ({ className, ...rest }) => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>Pizzaria da Stoom</h1>
    </header>
  );
};

export default memo(Header);
