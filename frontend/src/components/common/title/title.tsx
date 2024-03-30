import { ChangeEvent, useEffect, useState } from 'react';

import { useComponentVisible, useDebouncedFunction } from '../../../common/hooks/hooks';
import { BasicTitle } from '../basic-title/basic-title';
import { TitleContainer } from '../title-container/title-container';
import { TitleInput } from '../title-input/title-input';

type Props = {
  fontSize: "x-large" | "large" | "medium";
  isBold?: boolean;
  title: string;
  width?: number;
  onChange: (value: string) => void;
};

export const Title = ({ onChange, title, fontSize, isBold, width }: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [value, setValue] = useState(title);

  useEffect(() => setValue(title), [title]);
  
  const debouncedOnChange = useDebouncedFunction(onChange, 1000);

  const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedOnChange(newValue); 
  };

  return (
    <TitleContainer className="title-container" ref={ref}>
      {isComponentVisible ? (
        <TitleInput
          className="title-input"
          value={value}
          onChange={onEdit}
          onBlur={() => setIsComponentVisible(false)}
          fontSize={fontSize}
          isBold={isBold}
          autoFocus={isComponentVisible}
          width={width ?? 250}
        />
      ) : (
        <BasicTitle
          className="title-content"
          onClick={() => setIsComponentVisible(true)}
        >
          {value}
        </BasicTitle>
      )}
    </TitleContainer>
  );
};
