import React, { ChangeEvent, useState } from 'react'
import { PasswordInput } from '../../common/PasswordInput/PasswordInput'
import { Validation } from '../../../utils/validation'
import './PasswordInputFields.css'

interface Props {
  form: {
    password: string,
    repeatPassword: string,
  };
  changeFormHandle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInputFields = ({ form, changeFormHandle}:Props) => {
  const [passwordWasFocus, setPasswordWasFocus] = useState<boolean>(false);
  const [repeatPasswordWasFocus, setRepeatPasswordWasFocus] = useState<boolean>(false);

  const onPasswordBlur = () => {
    setPasswordWasFocus(true);
  }

  const onRepeatPasswordBlur = () => {
    setRepeatPasswordWasFocus(true);
  }

  return (
    <>
      {
        Validation.passwordValidation(form.password) || !passwordWasFocus
          ? null
          : <p className="PasswordInputFields__validation-error">
            Hasło powinno zawierać 8-36 znaków, co najmniej jedną literę i cyfrę
          </p>
      }
      <br/>
      {
        form.password === form.repeatPassword || !repeatPasswordWasFocus
          ? null
          : <p className="PasswordInputFields__validation-error">
            Hasła muszą być takie same
          </p>
      }

      <div className="PasswordInputFields">
        <PasswordInput
          label="Hasło:"
          placeholder="hasło"
          name="password"
          value={form.password}
          onBlur={onPasswordBlur}
          minLength={8}
          maxLength={36}
          required
          onChange={changeFormHandle}
        />

        <PasswordInput
          label="Powtórz hasło"
          placeholder="powtórz hasło"
          value={form.repeatPassword}
          name="repeatPassword"
          onBlur={onRepeatPasswordBlur}
          required
          onChange={changeFormHandle}
        />
      </div>
    </>
  )
}
