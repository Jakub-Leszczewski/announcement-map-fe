import React from 'react'
import './SignInChoiceView.css';
import { Button } from '../../components/common/Button/Button';
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch } from 'react-redux'
import { openWindow, Window } from '../../store/slices/app-slice'

export const SignInChoiceView = () => {
  const dispatch = useDispatch();

  const goBackHandler = () => {
    dispatch(openWindow({
      openWindow: Window.OPEN_NONE,
      data: undefined,
    }));
  }

  const goSignInHandler = () => {
    dispatch(openWindow({
      openWindow: Window.OPEN_SIGN_IN,
      data: undefined,
    }));
  }

  const goSignupHandler = () => {
    dispatch(openWindow({
      openWindow: Window.OPEN_SIGNUP,
      data: undefined,
    }));
  }

  return(
    <section className="SignInChoiceView">
      <UserMenuHeader title="Logowanie" onClick={goBackHandler}/>

      <div className="SignInChoiceView__buttons-container">
        <Button onClick={goSignInHandler}>Zaloguj się</Button>
        <Button onClick={goSignupHandler}>Zarejestruj się</Button>
      </div>
    </section>
  );
}
