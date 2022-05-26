import React, { FormEvent, useEffect, useReducer, useState } from 'react'
import './SignInView.css';
import { Button } from '../../components/common/Button/Button';
import { ShortTextInput } from '../../components/common/ShortTextInput/ShortTextInput'
import { PasswordInput } from '../../components/common/PasswordInput/PasswordInput'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch, useSelector } from 'react-redux'
import { openSignInChoice } from '../../store/slices/app-slice'
import { Action, signInFormReducer, SignInFormState } from './sign-in-form-reducer'
import { ActionType } from './action-type'
import { auth } from '../../utils/api/auth'
import { setJwt } from '../../store/slices/user-slice'
import { StoreType } from '../../store'

const initialSignInFormState: SignInFormState= {
  username: '',
  password: '',
}

export const SignInView = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [singInForm, dispatch] = useReducer<React.Reducer<SignInFormState, Action>>(signInFormReducer, initialSignInFormState);
  const appStore = useSelector((store: StoreType) => store.app);
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
    dispatchStore(openSignInChoice(undefined));
  }

  const changeFormHandle = (action: Action) => {
    dispatch(action);
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmit(true);
  }

  return(
    <section className="SignInView">
      <UserMenuHeader title="Logowanie" onClick={goBackHandler}/>

      <form className="SignInView__form" onSubmit={submitHandler}>
        {error && <p className="SignInView__error">{error}</p>}
        {appStore.payload && <p className="SignInView__info">{appStore.payload}</p>}
        <ShortTextInput
          required
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
          required
          onChange={(e) => {
            changeFormHandle({type: ActionType.CHANGE_PASSWORD, payload: e.target.value})
          }}
        />

        <Button width="100%" height={30} borderRadius="15px">Zaloguj się</Button>
      </form>
    </section>
  );
}
