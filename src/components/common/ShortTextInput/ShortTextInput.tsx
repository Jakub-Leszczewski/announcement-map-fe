import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react'
import './ShortTextInput.css';

interface Props {
  min?: string | number;
  max?: string | number;
  step?: string | number;
  type?: HTMLInputTypeAttribute;
  pattern?: string;
  inputMode?: "search" | "text" | "email" | "tel" | "url" | "none" | "numeric" | "decimal";
  placeholder?: string;
  label?: string;
  name?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  value?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function ShortTextInput({
  pattern, inputMode, min, max, step, label, type, placeholder, name, required, minLength, maxLength, value, disabled, onChange
}: Props) {
  return (
    <label className="ShortTextInput">
      {label && <span>{label}{required && <span className="ShortTextInput--required">*</span>}</span>}
      <input
        className="ShortTextInput__input"
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        required={required}
        minLength={minLength ?? 0}
        maxLength={maxLength ?? 255}
        onChange={onChange}
        value={value}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        pattern={pattern}
        inputMode={inputMode}
      />
    </label>
  );
}
