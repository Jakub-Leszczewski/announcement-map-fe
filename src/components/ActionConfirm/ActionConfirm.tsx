import React from 'react';
import './ActionConfirm.css';
import { Button } from '../common/Button/Button'

interface Props {
  message: string;
  yesButtonHandler: () => void;
  noButtonHandler: () => void;
}

export const ActionConfirm = ({message, yesButtonHandler, noButtonHandler}: Props) => {
  return (
    <section className="ActionConfirm">
      <div className="ActionConfirm__container">
        <p className="ActionConfirm__message">{message}</p>
        <div className="ActionConfirm__button-container">
          <Button onClick={yesButtonHandler}>Tak</Button>
          <Button onClick={noButtonHandler}>Nie</Button>
        </div>
      </div>
    </section>
  );
}
