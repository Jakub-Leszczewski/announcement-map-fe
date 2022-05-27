import React, { ChangeEvent } from 'react'
import './ShortTextInput.css';

interface Props {
  placeholder: string;
  email?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  value?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function ShortTextInput({
  placeholder, email, required, minLength, maxLength, value, disabled, onChange
}: Props) {
  return (
    <input
      className="ShortTextInput"
      type={email ? 'email' : 'text'}
      placeholder={placeholder}
      required={required}
      minLength={minLength ?? 0}
      maxLength={maxLength ?? 255}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  );
}
