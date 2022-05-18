import React from 'react';
import './style.css'

interface Props {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
}

export function Button({children, width, height, padding}: Props) {
  return(
    <button
      className="Button__button"
      style={{width, height, padding}}
    >
      {children ?? "click me"}
    </button>
  );
}
