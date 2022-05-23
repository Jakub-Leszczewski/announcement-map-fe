import React from 'react';
import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Props {
  onClick?: () => void;
}

export const ArrowButton = ({onClick}: Props) => {
  return(
    <button className="ArrowButton" onClick={onClick}>
      <i className="bi bi-arrow-left-short"/>
    </button>
  )
}
