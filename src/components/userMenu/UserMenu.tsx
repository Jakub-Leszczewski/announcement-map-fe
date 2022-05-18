import React from 'react';
import './style.css';
import { LoginChoice } from '../../view/loginChoice/LoginChoice'

export const UserMenu = () => {
  const isOpen = true;

  if(!isOpen) return null;

  return(
    <section className="UserMenu__section">
      <LoginChoice/>
    </section>
  );
}
