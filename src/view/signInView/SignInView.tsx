import React from 'react';
import './style.css';
import { Button } from '../../components/common/button/Button';
import { ArrowButton } from '../../components/common/arrowButton/ArrowButton'
import { ShortTextInput } from '../../components/common/shortTextInput/ShortTextInput'
import { PasswordInput } from '../../components/common/passwordInput/PasswordInput'

export const SignInView = () => {
  const isOpen = true;

  if(!isOpen) return null;

  return(
    <section className="SignIn">
      <header>
        <ArrowButton/>
        <h2>Logowanie</h2>
      </header>

      <form className="SignIn__form">
        <ShortTextInput/>
        <PasswordInput/>
        <Button width="100%" height={30} borderRadius="15px">Zaloguj się</Button>
      </form>
    </section>
  );
}
