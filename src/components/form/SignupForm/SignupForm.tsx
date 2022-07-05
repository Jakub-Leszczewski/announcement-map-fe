import React, { ChangeEvent, FormEvent } from 'react'
import { UserNameInputFields } from '../UserNameFields/UserNameInputFields'
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput'
import { PasswordInputFields } from '../PasswordInputFields/PasswordInputFields'
import { Button } from '../../common/Button/Button'
import { Validation } from '../../../utils/validation'
import { UserFormSignup } from '../../../types/user-form'
import './SignupForm.css'

interface Props {
  form: UserFormSignup;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export const SignupForm = ({form, changeFormHandler, onSubmitHandler}: Props) => {
  return (
    <form onSubmit={onSubmitHandler} className="SignupForm">
      <UserNameInputFields
        form={form}
        changeFormHandle={changeFormHandler}
        required
      />

      <ShortTextInput
        label="Nazwa użytkownika:"
        placeholder="nazwa użytkownika"
        name="username"
        maxLength={60}
        minLength={3}
        required
        value={form.username}
        onChange={changeFormHandler}
      />

      <ShortTextInput
        label="Email:"
        placeholder="email"
        name="email"
        type="email"
        maxLength={255}
        minLength={3}
        required
        value={form.email}
        onChange={changeFormHandler}
      />

      <br />
      <PasswordInputFields
        form={form}
        changeFormHandle={changeFormHandler}
      />

      <Button
        disabled={form.password !== form.repeatPassword || !Validation.passwordValidation(form.password)}
      >Zarejestruj</Button>
    </form>
  )
}
