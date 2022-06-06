import React, { ChangeEvent } from 'react'
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput'
import './UserNameInputFields.css'

interface Props {
  required?: boolean;
  userForm: {
    firstName: string,
    lastName: string,
  };
  changeFormHandle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const UserNameInputFields = ({required, userForm, changeFormHandle}: Props) => {
  return (
    <div className="UserNameInputFields">
      <ShortTextInput
        label="Imię:"
        placeholder="imie"
        name="firstName"
        maxLength={60}
        minLength={3}
        required={required}
        value={userForm.firstName}
        onChange={changeFormHandle}
      />

      <ShortTextInput
        label="Nazwisko:"
        placeholder="nazwisko"
        name="lastName"
        maxLength={60}
        minLength={3}
        required={required}
        value={userForm.lastName}
        onChange={changeFormHandle}
      />
    </div>
  )
}
