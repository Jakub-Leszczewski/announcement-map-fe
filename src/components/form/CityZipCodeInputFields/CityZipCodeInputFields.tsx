import React, { ChangeEvent } from 'react'
import './CityZipCodeInputFields.css'
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput'

interface Props {
  form: {
    city: string,
    zipCode: string,
  };
  changeFormHandle?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CityZipCodeInputFields = ({form, changeFormHandle}: Props) => {

  return (
    <div className="CityZipCodeInputFields">
      <ShortTextInput
        placeholder="miasto*"
        name="city"
        maxLength={90}
        minLength={2}
        required
        value={form.city}
        onChange={changeFormHandle}
      />

      <ShortTextInput
        placeholder="kod pocztowy*"
        name="zipCode"
        maxLength={10}
        minLength={2}
        required
        value={form.zipCode}
        onChange={changeFormHandle}
      />
    </div>
  )
}
