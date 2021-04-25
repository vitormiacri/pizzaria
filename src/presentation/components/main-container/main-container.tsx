import React from 'react';
import Styles from './main-container-styles.scss';

const MainContainer: React.FC = ({ children }) => {
  return <div className={Styles.container}>{children}</div>;
};

export default MainContainer;
