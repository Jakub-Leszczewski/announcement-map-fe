import React, { ChangeEvent } from 'react'
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput'
import { CityZipCodeInputFields } from '../CityZipCodeInputFields/CityZipCodeInputFields';
import './AddressInputFields.css'
import {
  StreetBuildingApartamentInputFields
} from '../StreetBuildingApartamentInputFields/StreetBuildingApartamentInputFields'

interface Props {
  form: {
    country: string,
    city: string,
    zipCode: string,
    street: string | null,
    buildingNumber: string | null,
    apartamentNumber: string | null,
  };
  changeFormHandle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AddressInputFields = ({form, changeFormHandle}: Props) => {
  return(
    <div className="AddressInputFields">
      <p>Adres:</p>
      <ShortTextInput
        placeholder="kraj*"
        name="country"
        maxLength={60}
        minLength={2}
        required
        value={form.country}
        onChange={changeFormHandle}
      />

      <CityZipCodeInputFields
        changeFormHandle={changeFormHandle}
        form={form}
      />

      <StreetBuildingApartamentInputFields
        form={form}
        changeFormHandle={changeFormHandle}
      />


    </div>
  )
}
