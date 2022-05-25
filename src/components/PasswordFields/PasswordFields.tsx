import React, { useState } from 'react'
import { PasswordInput } from '../common/PasswordInput/PasswordInput'
import { ActionType } from '../../view/signupView/action-type'
import { Action, UserFormState } from '../../view/signupView/signup-form-reducer'
import { passwordValidation, repeatPasswordCompareWithPassword } from '../../utils/validation'

interface Props {
  userForm: UserFormState,
  changeFormHandle: (type: Action) => void;
}

export const PasswordFields = ({userForm, changeFormHandle}:Props) => {
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
        : <p className="Signup__validation-error">
          Hasło powinno zawierać 8-36 znaków, co najmniej jedną literę i cyfrę
        </p>
    }
    <PasswordInput
      placeholder="hasło"
      value={userForm.password}
      onBlur={onPasswordBlur}
      onChange={(e) => {
        changeFormHandle({type: ActionType.CHANGE_PASSWORD, payload: e.target.value})
      }}
    />

    {
      repeatPasswordCompareWithPassword(userForm.password, userForm.repeatPassword) || !repeatPasswordWasFocus
        ? null
        : <p className="Signup__validation-error">
          Hasła muszą być takie same
        </p>
    }
    <PasswordInput
      placeholder="potwierdź hasło"
      value={userForm.repeatPassword}
      onBlur={onRepeatPasswordBlur}
      onChange={(e) => {
        changeFormHandle({type: ActionType.CHANGE_REPEAT_PASSWORD, payload: e.target.value})
      }}
    />
  </>
}
