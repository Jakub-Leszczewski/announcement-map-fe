import React, { useState } from 'react'
import { PasswordInput } from '../common/PasswordInput/PasswordInput'
import { ActionType } from '../../view/SignupView/action-type'
import { Action, UserFormState } from '../../view/SignupView/signup-form-reducer'
import { passwordValidation, repeatPasswordCompareWithPassword } from '../../utils/validation'

interface Props {
  disabled?: boolean;
  required?: boolean;
  userForm: UserFormState;
  changeFormHandle: (type: Action) => void;
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
      value={userForm.password}
      onBlur={onPasswordBlur}
      minLength={8}
      maxLength={36}
      disabled={disabled}
      required={required}
      onChange={(e) => {
        changeFormHandle({type: ActionType.CHANGE_PASSWORD, payload: e.target.value})
      }}
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
      onBlur={onRepeatPasswordBlur}
      disabled={disabled}
      required={required}
      onChange={(e) => {
        changeFormHandle({type: ActionType.CHANGE_REPEAT_PASSWORD, payload: e.target.value})
      }}
    />
  </>
}
