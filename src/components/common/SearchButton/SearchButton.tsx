import React from 'react';
import './SearchButton.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Props {
  onClick?: () => void;
}

export const SearchButton = ({onClick}: Props) => {
  return(
    <button className="SearchButton" onClick={onClick}>
      <i className="bi bi-search"/>
    </button>
  )
}
