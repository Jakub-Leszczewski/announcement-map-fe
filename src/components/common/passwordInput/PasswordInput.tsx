import React, { useState } from 'react'
import './style.css';

interface Props {
  placeholder: string;
}

export const PasswordInput = ({ placeholder }: Props) => {
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
