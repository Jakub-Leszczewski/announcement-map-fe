import React, { ChangeEvent, useState } from 'react'
import { PasswordInput } from '../../common/PasswordInput/PasswordInput'
import { Validation } from '../../../utils/validation'
import './NewPasswordInputFields.css'

interface Props {
  form: {
    newPassword: string,
    repeatNewPassword: string,
  };
  changeFormHandle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const NewPasswordInputFields = ({ form, changeFormHandle}:Props) => {
  const [passwordWasFocus, setPasswordWasFocus] = useState<boolean>(false);
  const [repeatPasswordWasFocus, setRepeatPasswordWasFocus] = useState<boolean>(false);

  const onPasswordBlur = () => {
    setPasswordWasFocus(true);
  }

  const onRepeatPasswordBlur = () => {
    setRepeatPasswordWasFocus(true);
  }

  return(
    <>
      {
        !form.newPassword || Validation.passwordValidation(form.newPassword) || !passwordWasFocus
          ? null
          : <p className="NewPasswordInputFields__validation-error">
            Hasło powinno zawierać 8-36 znaków, co najmniej jedną literę i cyfrę
          </p>
      }
      <br/>
      {
        form.newPassword === form.repeatNewPassword || !repeatPasswordWasFocus || !form.newPassword
          ? null
          : <p className="NewPasswordInputFields__validation-error">
            Hasła muszą być takie same
          </p>
      }
      <div className="NewPasswordInputFields">
        <PasswordInput
          label="Nowe hasło:"
          placeholder="nowe hasło"
          name="newPassword"
          value={form.newPassword}
          onBlur={onPasswordBlur}
          minLength={8}
          maxLength={36}
          onChange={changeFormHandle}
        />

        <PasswordInput
          label="Powtórz nowe hasło:"
          placeholder="powtórz nowe hasło"
          name="repeatNewPassword"
          value={form.repeatNewPassword}
          onBlur={onRepeatPasswordBlur}
          onChange={changeFormHandle}
        />
      </div>
    </>
  )
}
