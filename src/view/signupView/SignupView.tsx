import React, { FormEvent, useReducer } from 'react'
import './style.css'
import { Button } from '../../components/common/button/Button'
import { ShortTextInput } from '../../components/common/shortTextInput/ShortTextInput'
import { UserMenuHeader } from '../../components/common/userMenuHeader/UserMenuHeader'
import { Action, signupFormReducer, UserFormState } from './signup-form-reducer'
import { ActionType } from './action-type'
import { PasswordFields } from '../../components/passwordFields/PasswordFields'
import { useDispatch } from 'react-redux'
import { openSignInChoice } from '../../store/slices/app-slice'

const initialUserFormState: UserFormState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
}

export function SignupView() {
  const [userForm, dispatch] = useReducer<React.Reducer<UserFormState, Action>>(signupFormReducer, initialUserFormState);
  const dispatchStore = useDispatch();

  const goBackHandler = () => {
    dispatchStore(openSignInChoice(undefined as never));
  }

  const changeFormHandle = (action: Action) => {
    dispatch(action);
  }

  const onSubmitHandle = (e: FormEvent) => {
    e.preventDefault();
  }

  const isOpen = true;
  if (!isOpen) return null;

  return (
    <section className="Signup">
      <UserMenuHeader title="Rejestracja" onClick={goBackHandler}/>

      <form onSubmit={onSubmitHandle} className="Signup__form">
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
        />
        <Button width="100%" height={30} borderRadius="15px">Zarejestruj</Button>
      </form>
    </section>
  );
}
