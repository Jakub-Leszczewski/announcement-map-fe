import React, { ChangeEvent, FormEvent } from 'react'
import { ConfirmPasswordInput } from '../ConfirmPasswordInput/ConfirmPasswordInput'
import { Button } from '../../common/Button/Button'
import './AccountSettingsConfirmForm.css'

interface Props {
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  form: string;
}

export const AccountSettingsConfirmForm = ({form, changeFormHandler, onSubmitHandler}: Props) => {
  return (
    <form onSubmit={onSubmitHandler} className="AccountSettingsConfirmForm">
      <ConfirmPasswordInput
        value={form}
        onChange={changeFormHandler}
      />

      <Button disabled={!form}>Zapisz</Button>
    </form>
  )
}
