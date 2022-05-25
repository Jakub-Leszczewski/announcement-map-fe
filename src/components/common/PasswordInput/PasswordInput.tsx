import React, { ChangeEvent, useState } from 'react'
import './PasswordInput.css';

interface Props {
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const PasswordInput = ({ placeholder, value, onChange, onFocus, onBlur }: Props) => {
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
        required={true}
        minLength={8}
        maxLength={36}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
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
