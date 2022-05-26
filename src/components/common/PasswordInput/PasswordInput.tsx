import React, { ChangeEvent, useState } from 'react'
import './PasswordInput.css';

interface Props {
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: string;
  disabled?: boolean;
}

export const PasswordInput = ({ placeholder, value, onChange, onFocus, onBlur, disabled, required }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const onMouseDown = () => {
    setVisible(true);
  }

  const onMouseUp = () => {
    setVisible(false);
  }

  return (
    <div className="PasswordInput">
      <input
        className="PasswordInput__input"
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        required={required}
        minLength={8}
        maxLength={36}
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
  );
}
