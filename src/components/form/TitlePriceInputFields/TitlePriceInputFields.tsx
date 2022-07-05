import React, { ChangeEvent } from 'react'
import './TitlePriceInputFields.css'
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput'

interface Props {
  required?: boolean;
  form: {
    title: string,
    price: number,
  };
  changeFormHandle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TitlePriceInputFields = ({form, changeFormHandle, required}: Props) => {
  return (
    <div className="TitlePriceInputFields">
      <ShortTextInput
        label="Tytuł:"
        placeholder="tytuł"
        name="title"
        maxLength={128}
        minLength={3}
        required={required}
        value={form.title}
        onChange={changeFormHandle}
      />

      <ShortTextInput
        label="Cena(zł):"
        placeholder="cena"
        name="price"
        min={0}
        max={9999999999.99}
        step={0.1}
        type="number"
        required={required}
        value={String(form.price)}
        onChange={changeFormHandle}
      />
    </div>
  )
}
