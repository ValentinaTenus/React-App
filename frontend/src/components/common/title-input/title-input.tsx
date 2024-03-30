import React, { type ChangeEvent } from 'react';

interface TitleInputProps {
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  fontSize: string;
  isBold: boolean | undefined;
  autoFocus: boolean;
  width: number;
}

const TitleInput: React.FC<TitleInputProps> = ({
  className,
  value,
  onChange,
  onBlur,
  fontSize,
  isBold,
  autoFocus,
  width,
}) => {
  return (
    <input
      className={className}
      type="text"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
      style={{
        fontSize: `${fontSize}px`,
        fontWeight: isBold ? 'bold' : 'normal',
        width: `${width}px`,
      }}
    />
  );
};

export { TitleInput };