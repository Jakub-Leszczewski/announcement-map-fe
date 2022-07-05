import React, { ReactNode } from 'react'
import './Button.css'

interface Props {
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  form?: string;
}

export const Button = ({
  children, disabled, onClick, type, form
}: Props) => (
    <button
      type={type}
      className="Button"
      onClick={onClick}
      disabled={disabled}
      form={form}
    >
      {children ?? "click me"}
    </button>
  );
