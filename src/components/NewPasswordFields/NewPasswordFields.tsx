import React, { ChangeEvent, useState } from 'react'
import { PasswordInput } from '../common/PasswordInput/PasswordInput'
import { passwordValidation } from '../../utils/validation'
import { UserFormUpdate } from '../../types/user-form'

interface Props {
  disabled?: boolean;
  required?: boolean;
  userForm: UserFormUpdate;
  changeFormHandle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const NewPasswordFields = ({disabled, required, userForm, changeFormHandle}:Props) => {
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
      !userForm.newPassword || passwordValidation(userForm.newPassword) || !passwordWasFocus
        ? null
        : <p className="SignupView__validation-error">
          Hasło powinno zawierać 8-36 znaków, co najmniej jedną literę i cyfrę
        </p>
    }
    <PasswordInput
      placeholder="nowe hasło"
      name="newPassword"
      value={userForm.newPassword}
      onBlur={onPasswordBlur}
      disabled={disabled}
      required={required}
      minLength={8}
      maxLength={36}
      onChange={changeFormHandle}
    />

    {
      userForm.newPassword === userForm.repeatNewPassword || !repeatPasswordWasFocus || !userForm.newPassword
        ? null
        : <p className="SignupView__validation-error">
          Hasła muszą być takie same
        </p>
    }
    <PasswordInput
      placeholder="potwierdź nowe hasło"
      name="repeatNewPassword"
      value={userForm.repeatNewPassword}
      onBlur={onRepeatPasswordBlur}
      disabled={disabled}
      required={required}
      onChange={changeFormHandle}
    />
  </>
}
