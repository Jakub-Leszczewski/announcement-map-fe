import React, { FormEvent, useContext, useReducer } from 'react'
import './style.css'
import { Button } from '../../components/common/button/Button'
import { ShortTextInput } from '../../components/common/shortTextInput/ShortTextInput'
import { UserMenuHeader } from '../../components/common/userMenuHeader/UserMenuHeader'
import { Action, signupFormReducer, UserFormState } from './signup-form-reducer'
import { ActionType } from './action-type'
import { PasswordFields } from '../../components/passwordFields/PasswordFields'
import { useSelector } from 'react-redux'
import { StoreType } from '../../store'
import { useApi } from '../../hooks/useApi'
import { HttpMethod } from '../../utils/api/http-method'
import { AuthContext } from '../../components/auth/Auth'

const initialUserFormState: UserFormState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
}

export function SignupView() {
  const userStore = useSelector((store: StoreType) => store.user);
  const [userForm, dispatch] = useReducer<React.Reducer<UserFormState, Action>>(signupFormReducer, initialUserFormState);
  const [loading, status, data] = useApi('http://localhost:3001/api/users/451af1df-3e5a-4d20-94f6-4f189bff0266');
  // const [loadingAuth, statusAuth, dataAuth] = useApi('http://localhost:3001/api/auth/signin', HttpMethod.POST, {
  //   username: 'ezterr12',
  //   password: 'ezterr12',
  // });

  const context = useContext(AuthContext);

  // console.log(context);
  console.log(loading, status, data);
  // console.log('test')
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
      <button onClick={() => {
        console.log(userStore.jwt);
      }}>siema</button>
      <UserMenuHeader title="Rejestracja" />

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
