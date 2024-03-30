import { ReactNode } from 'react';

import styles from './styles.module.css';

type BasicTitleProperties = {
    className?: string;
    onClick: () => void;
    children: ReactNode;
  };

const BasicTitle: React.FC<BasicTitleProperties> = ({ children, onClick}) => {
  return (
    <h3 className={styles.basic_title}
        onClick={onClick}
    >{children}</h3>)
    
};

export { BasicTitle };