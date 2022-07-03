import React, { ChangeEvent, FormEvent } from 'react'
import './PasswordConfirm.css';
import { AccountSettingsConfirmForm } from '../form/AccountSettingsConfirmForm/AccountSettingsConfirmForm'

interface Props {
  message: string;
  error: string | null;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onConfirmHandler: (e: FormEvent<HTMLFormElement>) => void;
  form: {
    password: string;
  }
}

export const PasswordConfirm = ({message, form, error, changeFormHandler, onConfirmHandler}: Props) => {
  return (
    <section className="PasswordConfirm">
      {error && <p className="PasswordConfirm__error">{error}</p>}
      <div className="PasswordConfirm__container">
        <p className="PasswordConfirm__message">{message}</p>
        <AccountSettingsConfirmForm
          form={form.password}
          changeFormHandler={changeFormHandler}
          onSubmitHandler={onConfirmHandler}
        />
      </div>
    </section>
  );
}
