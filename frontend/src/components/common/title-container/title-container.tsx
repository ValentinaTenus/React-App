import React, { ReactNode } from 'react';

import styles from './styles.module.css';

type TitleContainerProps = {
  children: ReactNode;
  className?: string;
  ref?: React.LegacyRef<HTMLDivElement>;
};

const TitleContainer: React.ForwardRefExoticComponent<TitleContainerProps> = React.forwardRef(
  ({ children, className}, ref) => {
    const combinedClassName = `${styles.title_container} ${className || ''}`;

    return (
      <div className={combinedClassName} ref={ref}>
        {children}
      </div>
    );
  }
);

export { TitleContainer };