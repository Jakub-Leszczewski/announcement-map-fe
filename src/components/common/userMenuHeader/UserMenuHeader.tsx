import React, { ReactNode } from 'react'
import './style.css';
import { ArrowButton } from '../arrowButton/ArrowButton'

interface Props {
  title: string;
}

export const UserMenuHeader = ({title}: Props) => {
  return (
    <header className="UserMenuHeader">
      <ArrowButton/>
      <h2>{title}</h2>
    </header>
  );
}
