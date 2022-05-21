import React from 'react';
import './style.css';
import { Button } from '../../components/common/button/Button';
import { ShortTextInput } from '../../components/common/shortTextInput/ShortTextInput'
import { PasswordInput } from '../../components/common/passwordInput/PasswordInput'
import { UserMenuHeader } from '../../components/common/userMenuHeader/UserMenuHeader'

export const SignupView = () => {
  const isOpen = true;

  if(!isOpen) return null;

  return(
    <section className="Signup">
      <UserMenuHeader title="Rejestracja"/>

      <form className="Signup__form">
        <ShortTextInput placeholder="imie"/>
        <ShortTextInput placeholder="nazwisko"/>
        <ShortTextInput placeholder="login"/>
        <ShortTextInput placeholder="email"/>
        <br/>
        <PasswordInput placeholder="hasło"/>
        <PasswordInput placeholder="potwierdź hasło"/>
        <Button width="100%" height={30} borderRadius="15px">Zarejestruj</Button>
      </form>
    </section>
  );
}
