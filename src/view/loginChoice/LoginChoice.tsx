import React from 'react';
import './style.css';
import { Button } from '../../components/common/button/Button'

export const LoginChoice = () => {
  const isOpen = true;

  if(!isOpen) return null;

  return(
    <nav className="LoginChoice__section">
      <h2>Logowanie</h2>

      <div className="LoginChoice__buttons-container">
        <Button width="100%" height={30} borderRadius="15px">Zaloguj się</Button>
        <Button width="100%" height={30} borderRadius="15px">Zarejestruj się</Button>
      </div>
    </nav>
  );
}
