import React, { ChangeEvent, FormEvent, FormEventHandler } from 'react'
import './AddAuctionLinkForm.css'
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput'
import { Button } from '../../common/Button/Button'
import { AuctionLinkForm } from '../../../types/auction-links-form'

interface Props {
  form: AuctionLinkForm;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
}

export const AddAuctionLinkForm = ({form, changeFormHandler, onSubmit, disabled}: Props) => {
  return (
    <form onSubmit={onSubmit} id="auction-link-form" className="AddAuctionLinkForm">
      <ShortTextInput
        placeholder="nazwa"
        name="name"
        value={form.name}
        onChange={changeFormHandler}
        disabled={disabled}
      />

      <ShortTextInput
        placeholder="adres url"
        type="url"
        name="url"
        value={form.url}
        onChange={changeFormHandler}
        disabled={disabled}
      />

      <Button
        disabled={!form.name || !form.url || disabled}
      >Dodaj</Button>
    </form>
  )
}
