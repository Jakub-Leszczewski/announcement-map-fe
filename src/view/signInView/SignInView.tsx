import React, { FormEvent, useEffect, useReducer, useState } from 'react'
import './style.css';
import { Button } from '../../components/common/button/Button';
import { ShortTextInput } from '../../components/common/shortTextInput/ShortTextInput'
import { PasswordInput } from '../../components/common/passwordInput/PasswordInput'
import { UserMenuHeader } from '../../components/common/userMenuHeader/UserMenuHeader'
import { useDispatch } from 'react-redux'
import { openSignInChoice } from '../../store/slices/app-slice'
import { Action, signInFormReducer, SignInFormState } from './sign-in-form-reducer'
import { ActionType } from './action-type'
import { auth } from '../../utils/api/auth'
import { setJwt } from '../../store/slices/user-slice'

const initialSignInFormState: SignInFormState= {
  username: '',
  password: '',
}

export const SignInView = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [singInForm, dispatch] = useReducer<React.Reducer<SignInFormState, Action>>(signInFormReducer, initialSignInFormState);
  const dispatchStore = useDispatch();

  useEffect(() => {
    if(isSubmit) {
      (async () => {
        const authData = await auth('http://localhost:3001/api/auth/signin', singInForm.username, singInForm.password);
        setError(authData.error === "Incorrect username or password." ? "Błędny login lub hasło." : authData.error);
        setIsSubmit(false);

        if(authData.status === 200 && authData.jwt) {
          dispatchStore(setJwt(authData.jwt as string));
        }
      })();
    }
  }, [isSubmit])

  const goBackHandler = () => {
    dispatchStore(openSignInChoice(undefined as never));
  }

  const changeFormHandle = (action: Action) => {
    dispatch(action);
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmit(true);
  }

  return(
    <section className="SignIn">
      <UserMenuHeader title="Logowanie" onClick={goBackHandler}/>

      <form className="SignIn__form" onSubmit={submitHandler}>
        <p className="SignIn__error">{error}</p>
        <ShortTextInput
          required={true}
          minLength={3}
          maxLength={60}
          placeholder="login"
          value={singInForm.username}
          onChange={(e) => {
            changeFormHandle({type: ActionType.CHANGE_USERNAME, payload: e.target.value})
          }}
        />

        <PasswordInput
          placeholder="hasło"
          value={singInForm.password}
          onChange={(e) => {
            changeFormHandle({type: ActionType.CHANGE_PASSWORD, payload: e.target.value})
          }}
        />

        <Button width="100%" height={30} borderRadius="15px">Zaloguj się</Button>
      </form>
    </section>
  );
}
