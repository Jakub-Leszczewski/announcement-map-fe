import React, { ChangeEvent, useState } from 'react'
import { PasswordInput } from '../common/PasswordInput/PasswordInput'
import { passwordValidation } from '../../utils/validation'
import { UserFormSignup } from '../../types/user-form'

interface Props {
  disabled?: boolean;
  required?: boolean;
  userForm: UserFormSignup;
  changeFormHandle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordFields = ({disabled, required, userForm, changeFormHandle}:Props) => {
  const [passwordWasFocus, setPasswordWasFocus] = useState<boolean>(false);
  const [repeatPasswordWasFocus, setRepeatPasswordWasFocus] = useState<boolean>(false);

  const onPasswordBlur = () => {
    setPasswordWasFocus(true);
  }

  const onRepeatPasswordBlur = () => {
    setRepeatPasswordWasFocus(true);
  }

  return <>
    {
      passwordValidation(userForm.password) || !passwordWasFocus
        ? null
        : <p className="SignupView__validation-error">
          Hasło powinno zawierać 8-36 znaków, co najmniej jedną literę i cyfrę
        </p>
    }
    <PasswordInput
      placeholder="hasło"
      name="password"
      value={userForm.password}
      onBlur={onPasswordBlur}
      minLength={8}
      maxLength={36}
      disabled={disabled}
      required={required}
      onChange={changeFormHandle}
    />

    {
      userForm.password === userForm.repeatPassword || !repeatPasswordWasFocus
        ? null
        : <p className="SignupView__validation-error">
          Hasła muszą być takie same
        </p>
    }
    <PasswordInput
      placeholder="potwierdź hasło"
      value={userForm.repeatPassword}
      name="repeatPassword"
      onBlur={onRepeatPasswordBlur}
      disabled={disabled}
      required={required}
      onChange={changeFormHandle}
    />
  </>
}
