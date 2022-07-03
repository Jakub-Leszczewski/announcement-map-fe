import React, { ChangeEvent } from 'react'
import './StreetBuildingApartamentInputFields.css'
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput'

interface Props {
  form: {
    street: string | null,
    buildingNumber: string | null,
    apartamentNumber: string | null,
  };
  changeFormHandle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const StreetBuildingApartamentInputFields = ({form, changeFormHandle}: Props) => {
  return (
    <div className="AddressInputFields__Address">
      <ShortTextInput
        placeholder="ulica"
        name="street"
        maxLength={90}
        minLength={2}
        value={form.street || ''}
        onChange={changeFormHandle}
      />

      <ShortTextInput
        placeholder="nr. budynku"
        name="buildingNumber"
        maxLength={20}
        minLength={1}
        value={form.buildingNumber || ''}
        onChange={changeFormHandle}
      />

      <ShortTextInput
        placeholder="nr. lokalu"
        name="apartamentNumber"
        maxLength={20}
        minLength={1}
        value={form.apartamentNumber || ''}
        onChange={changeFormHandle}
      />
    </div>
  )
}
