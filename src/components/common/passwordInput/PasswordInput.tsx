import React, { useState } from 'react'
import './style.css';

export const PasswordInput = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const onMouseDown = () => {
    setVisible(true);
  }

  const onMouseUp = () => {
    setVisible(false);
  }

  return (
    <div className="PasswordInput">
      <input className="PasswordInput__input" type={visible ? "text" : "password"}/>
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
