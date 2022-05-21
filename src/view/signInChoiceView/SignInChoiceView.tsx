import React from 'react';
import './style.css';
import { Button } from '../../components/common/button/Button';
import { ArrowButton } from '../../components/common/arrowButton/ArrowButton'
import { UserMenuHeader } from '../../components/common/userMenuHeader/UserMenuHeader'

export const SignInChoiceView = () => {
  const isOpen = true;

  if(!isOpen) return null;

  return(
    <section className="SignInChoice">
      <UserMenuHeader title="Logowanie"/>

      <div className="SignInChoice__buttons-container">
        <Button width="100%" height={30} borderRadius="15px">Zaloguj się</Button>
        <Button width="100%" height={30} borderRadius="15px">Zarejestruj się</Button>
      </div>
    </section>
  );
}
