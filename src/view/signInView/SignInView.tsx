import React from 'react';
import './style.css';
import { Button } from '../../components/common/button/Button';
import { ArrowButton } from '../../components/common/arrowButton/ArrowButton'
import { ShortTextInput } from '../../components/common/shortTextInput/ShortTextInput'
import { PasswordInput } from '../../components/common/passwordInput/PasswordInput'
import { UserMenuHeader } from '../../components/common/userMenuHeader/UserMenuHeader'

export const SignInView = () => {
  const isOpen = true;

  if(!isOpen) return null;

  return(
    <section className="SignIn">
      <UserMenuHeader title="Logowanie"/>

      <form className="SignIn__form">
        <ShortTextInput placeholder="login"/>
        <PasswordInput placeholder="hasło"/>
        <Button width="100%" height={30} borderRadius="15px">Zaloguj się</Button>
      </form>
    </section>
  );
}
