import React, { ChangeEvent, FormEvent } from 'react'
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput'
import { PasswordInput } from '../../common/PasswordInput/PasswordInput'
import { Button } from '../../common/Button/Button'
import { UserFormSignIn } from '../../../types/user-form'
import './SignInForm.css'

interface Props {
  form: UserFormSignIn;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export const SignInForm = ({form, changeFormHandler, onSubmitHandler}: Props) => {
  return (
    <form className="SignInForm" onSubmit={onSubmitHandler}>
      <ShortTextInput
        label="Nazwa użytkownika:"
        placeholder="nazwa użytkownika"
        name="username"
        maxLength={60}
        minLength={3}
        value={form.username}
        onChange={changeFormHandler}
      />

      <PasswordInput
        label="Hasło:"
        placeholder="hasło"
        name="password"
        value={form.password}
        onChange={changeFormHandler}
      />

      <Button>Zaloguj się</Button>
    </form>
  );
}
