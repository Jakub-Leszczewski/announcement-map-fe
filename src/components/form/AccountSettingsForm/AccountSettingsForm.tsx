import React, { ChangeEvent, FormEvent } from 'react'
import { UserFormUpdate } from '../../../types/user-form'
import { UserNameInputFields } from '../UserNameFields/UserNameInputFields'
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput'
import { NewPasswordInputFields } from '../NewPasswordInputFields/NewPasswordInputFields'
import { Button } from '../../common/Button/Button'
import { Validation } from '../../../utils/validation'
import './AccountSettingsForm.css'

interface Props {
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  form: UserFormUpdate;
}

export const AccountSettingsForm = ({form, changeFormHandler, onSubmitHandler}: Props) => {
  return (
    <form onSubmit={onSubmitHandler} className="AccountSettingsForm">
      <UserNameInputFields
        form={form}
        changeFormHandle={changeFormHandler}
      />

      <ShortTextInput
        label="Email:"
        placeholder="email"
        name="email"
        type="email"
        maxLength={255}
        minLength={3}
        value={form.email}
        onChange={changeFormHandler}
      />

      <br />
      <NewPasswordInputFields
        form={form}
        changeFormHandle={changeFormHandler}
      />

      <Button
        disabled={
          !(Validation.passwordValidation(form.newPassword) || !form.newPassword)
          || form.newPassword !== form.repeatNewPassword
        }
      >Zapisz</Button>
    </form>
  );

}
