import React from 'react';
import './style.css';
import { SignInChoiceView } from '../../view/signInChoiceView/SignInChoiceView'
import { SignInView } from '../../view/signInView/SignInView'

export const UserMenu = () => {
  const isOpen = true;

  if(!isOpen) return null;

  return(
    <section className="UserMenu">
      {/*<SignInChoiceView/>*/}
      <SignInView/>
    </section>
  );
}
