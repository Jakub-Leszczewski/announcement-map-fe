import React, { ChangeEvent } from 'react'
import './ShortTextInput.css';

interface Props {
  placeholder: string;
  email?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export function ShortTextInput({
  placeholder, email, required, minLength, maxLength, onChange, value
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
    />
  );
}
