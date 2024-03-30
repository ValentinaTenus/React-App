import { ChangeEvent, RefObject } from 'react';

import { BasicTitle } from '../basic-title/basic-title';
import { TitleContainer } from '../title-container/title-container';
import { TitleInput } from '../title-input/title-input';

import styles from './styles.module.css';

type Props = {
  fontSize: "x-large" | "large" | "medium";
  isBold?: boolean;
  title: string;
  width?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isComponentVisible: boolean;
  setIsComponentVisible: (value: boolean) => void;
  ref: RefObject<HTMLDivElement>;
};

export const Title = ({ 
  onChange, fontSize, isBold, width, isComponentVisible, title, setIsComponentVisible, ref 
}: Props) => {

  return (
    <TitleContainer className={styles.title_container} ref={ref}>
      {isComponentVisible ? (
        <TitleInput
          className={styles.title__input}
          value={title}
          onChange={onChange}
          onBlur={() => setIsComponentVisible(false)}
          fontSize={fontSize}
          isBold={isBold}
          autoFocus={isComponentVisible}
          width={width ?? 250}
        />
      ) : (
        <BasicTitle
          className={styles.basic_title}
          onClick={() => setIsComponentVisible(true)}
        >
          {title}
        </BasicTitle>
      )}
    </TitleContainer>
  );
};
