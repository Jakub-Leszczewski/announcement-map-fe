import React, { ChangeEvent, useState } from 'react'
import { PasswordInput } from '../../common/PasswordInput/PasswordInput'
import './ConfirmPasswordInput.css'

interface Props {
  value?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ConfirmPasswordInput = ({value, onChange}:Props) => {
  const [passwordWasFocus, setPasswordWasFocus] = useState<boolean>(false);

  const onPasswordBlur = () => {
    setPasswordWasFocus(true);
  }

  return <>
    {
     !passwordWasFocus || value
        ? null
        : <p className="ConfirmPasswordInput__validation-error">
          Podaj stare hasło, to pole jest wymagane.
        </p>
    }
    <PasswordInput
      label="Hasło:"
      required
      placeholder="hasło"
      value={value}
      onBlur={onPasswordBlur}
      onChange={onChange}
    />
  </>
}
