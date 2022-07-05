import React from 'react';
import './UserPopup.css'

interface Props {
  isGeolocation: boolean;
}

export const UserPopup = ({isGeolocation}: Props) => {
  return (
    <p className="UserPopup">
      {isGeolocation ? 'tu jesteś' : 'Twoje urządzenie nie wyraziło zgody na pobranie lokalizacji'}
    </p>
  )
}
