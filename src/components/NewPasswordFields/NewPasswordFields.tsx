import React, { useState } from 'react'
import { PasswordInput } from '../common/PasswordInput/PasswordInput'
import { passwordValidation, repeatPasswordCompareWithPassword } from '../../utils/validation'
import { ActionType } from '../../view/AccountSettingsView/action-type'
import { Action, UserFormState } from '../../view/AccountSettingsView/account-settings-form-reducer'

interface Props {
  userForm: UserFormState,
  changeFormHandle: (type: Action) => void;
  disabled?: boolean;
  required?: boolean;
}

export const NewPasswordFields = ({userForm, changeFormHandle, disabled, required}:Props) => {
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
      passwordValidation(userForm.newPassword) || !passwordWasFocus
        ? null
        : <p className="SignupView__validation-error">
          Hasło powinno zawierać 8-36 znaków, co najmniej jedną literę i cyfrę
        </p>
    }
    <PasswordInput
      placeholder="nowe hasło"
      value={userForm.newPassword}
      onBlur={onPasswordBlur}
      disabled={disabled}
      required={required}
      onChange={(e) => {
        changeFormHandle({type: ActionType.CHANGE_NEW_PASSWORD, payload: e.target.value})
      }}
    />

    {
      repeatPasswordCompareWithPassword(userForm.newPassword, userForm.repeatNewPassword) || !repeatPasswordWasFocus
        ? null
        : <p className="SignupView__validation-error">
          Hasła muszą być takie same
        </p>
    }
    <PasswordInput
      placeholder="potwierdź nowe hasło"
      value={userForm.repeatNewPassword}
      onBlur={onRepeatPasswordBlur}
      disabled={disabled}
      required={required}
      onChange={(e) => {
        changeFormHandle({type: ActionType.CHANGE_REPEAT_NEW_PASSWORD, payload: e.target.value})
      }}
    />
  </>
}
