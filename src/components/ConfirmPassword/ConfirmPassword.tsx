import React, { ChangeEvent, useState } from 'react'
import { PasswordInput } from '../common/PasswordInput/PasswordInput'

interface Props {
  value?: string,
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ConfirmPassword = ({value, onChange, disabled}:Props) => {
  const [passwordWasFocus, setPasswordWasFocus] = useState<boolean>(false);

  const onPasswordBlur = () => {
    setPasswordWasFocus(true);
  }

  return <>
    {
     !passwordWasFocus || value
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
