import React, { ReactNode } from 'react'
import './UserMenuHeader.css';
import { ArrowButton } from '../common/ArrowButton/ArrowButton'

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
