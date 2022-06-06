import React, { ChangeEvent, useState } from 'react'
import './PasswordInput.css';

interface Props {
  placeholder: string;
  label?: string
  name?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  maxLength?: number;
  minLength?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput = ({
  placeholder, label, name, value, disabled, required, onChange, onFocus, onBlur, maxLength, minLength
}: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const onMouseDown = () => {
    setVisible(true);
  }

  const onMouseUp = () => {
    setVisible(false);
  }

  return (
    <label className="PasswordInput">
      {label && <span>{label}{required && <span className="PasswordInput--required">*</span>}</span>}

      <div className="PasswordInput__container">
        <input
          className="PasswordInput__input"
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          disabled={disabled}
        />

        <div className="PasswordInput__icon" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
          {
            visible
              ? <i className="bi bi-eye-slash-fill"/>
              :<i className="bi bi-eye-fill"/>
          }
        </div>
      </div>
    </label>
  );
}
