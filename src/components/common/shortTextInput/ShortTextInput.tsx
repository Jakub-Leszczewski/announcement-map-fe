import React from 'react';
import './style.css';

interface Props {
  placeholder: string;
}

export const ShortTextInput = ({placeholder}: Props) => {
  return (
    <input
      className="ShortTextInput"
      type="text"
      placeholder={placeholder}
    />
  );
}
