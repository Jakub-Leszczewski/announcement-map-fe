import React, { FormEvent, useEffect, useReducer, useState } from 'react'
import './SignupView.css'
import { Button } from '../../components/common/Button/Button'
import { ShortTextInput } from '../../components/common/ShortTextInput/ShortTextInput'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { Action, signupFormReducer, UserFormState } from './signup-form-reducer'
import { ActionType } from './action-type'
import { PasswordFields } from '../../components/PasswordFields/PasswordFields'
import { useDispatch } from 'react-redux'
import { openSignIn, openSignInChoice } from '../../store/slices/app-slice'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { passwordValidation } from '../../utils/validation'

const initialUserFormState: UserFormState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
}

export function SignupView() {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [userForm, dispatch] = useReducer<React.Reducer<UserFormState, Action>>(signupFormReducer, initialUserFormState);
  const dispatchStore = useDispatch();

  useEffect(() => {
    (async () => {
      if(isSubmit) {
        const data = await api('http://localhost:3001/api/auth/signup', {
          method: HttpMethods.POST,
          payload: userForm,
        });

        if(data.status !== 201 && data.data?.error) {
          setError(data.data.error)
        } else if(data.status === 201) {
          dispatchStore(openSignIn({message: 'Konto zostało pomyślnie utworzone.'}));
        }

        setIsSubmit(false);
      }
    })();
  }, [isSubmit]);

  const goBackHandler = () => {
    dispatchStore(openSignInChoice(undefined));
  }

  const changeFormHandle = (action: Action) => {
    dispatch(action);
  }

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
  }

  return (
    <section className="SignupView">
      <UserMenuHeader title="Rejestracja" onClick={goBackHandler}/>

      <form onSubmit={onSubmitHandle} className="SignupView__form">
        {error && <p className="SignupView__validation-error">{error}</p>}

        <ShortTextInput
          placeholder="imie"
          maxLength={60}
          minLength={3}
          required
          value={userForm.firstName}
          onChange={(e) => {
            changeFormHandle({type: ActionType.CHANGE_FIRST_NAME, payload: e.target.value})
          }}
        />
        <ShortTextInput
          placeholder="nazwisko"
          maxLength={60}
          minLength={3}
          required
          value={userForm.lastName}
          onChange={(e) => {
            changeFormHandle({type: ActionType.CHANGE_LAST_NAME, payload: e.target.value})
          }}
        />
        <ShortTextInput
          placeholder="login"
          maxLength={60}
          minLength={3}
          required
          value={userForm.username}
          onChange={(e) => {
            changeFormHandle({type: ActionType.CHANGE_USERNAME, payload: e.target.value})
          }}
        />
        <ShortTextInput
          placeholder="email"
          email
          maxLength={255}
          minLength={3}
          required
          value={userForm.email}
          onChange={(e) => {
            changeFormHandle({type: ActionType.CHANGE_EMAIL, payload: e.target.value})
          }}
        />

        <br />
        <PasswordFields
          userForm={userForm}
          changeFormHandle={changeFormHandle}
          required
        />
        <Button
          width="100%"
          height={30}
          borderRadius="15px"
          disabled={userForm.password !== userForm.repeatPassword || !passwordValidation(userForm.password)}
        >Zarejestruj</Button>
      </form>
    </section>
  );
}
