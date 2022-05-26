import React, { ChangeEvent, useState } from 'react'
import { PasswordInput } from '../common/PasswordInput/PasswordInput'
import { ActionType } from '../../view/SignupView/action-type'
import { Action, UserFormState } from '../../view/SignupView/signup-form-reducer'
import { passwordValidation, repeatPasswordCompareWithPassword } from '../../utils/validation'

interface Props {
  value?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const ConfirmPassword = ({value, onChange, disabled}:Props) => {
  const [passwordWasFocus, setPasswordWasFocus] = useState<boolean>(false);

  const onPasswordBlur = () => {
    setPasswordWasFocus(true);
  }

  return <>
    {
     !passwordWasFocus
        ? null
        : <p className="SignupView__validation-error">
          Podaj stare hasło, to pole jest wymagane.
        </p>
    }
    <PasswordInput
      placeholder="hasło"
      value={value}
      onBlur={onPasswordBlur}
      disabled={disabled}
      onChange={onChange}
    />
  </>
}
