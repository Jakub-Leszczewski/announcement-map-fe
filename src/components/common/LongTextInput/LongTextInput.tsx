import React, { ChangeEvent } from 'react'
import './LongTextInput.css'

interface Props {
  name?: string;
  required?: boolean;
  label?: string;
  value?: string;
  maxLength?: number;
  minLength?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const LongTextInput = ({onChange, value, label, required, name, maxLength, minLength}: Props) => {
  return (
    <label className="LongTextInput">
      {label && <span>{label}{required && <span className="LongTextInput--required">*</span>}</span>}
    <textarea
      className="LongTextInput__input"
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      minLength={minLength}
    />
    </label>
  )
}
