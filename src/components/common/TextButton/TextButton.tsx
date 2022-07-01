import React from 'react';
import './TextButton.css';

interface Props {
  onClick: () => void;
  children: React.ReactNode
}

export const TextButton = ({onClick, children}: Props) => {
  return (
    <button
      className="RemoveButton"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
