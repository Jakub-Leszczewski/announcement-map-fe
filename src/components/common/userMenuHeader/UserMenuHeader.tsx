import React, { ReactNode } from 'react'
import './style.css';
import { ArrowButton } from '../arrowButton/ArrowButton'

interface Props {
  title: string;
  onClick?: () => void;
}

export const UserMenuHeader = ({title, onClick}: Props) => {
  return (
    <header className="UserMenuHeader">
      <ArrowButton onClick={onClick}/>
      <h2>{title}</h2>
    </header>
  );
}
