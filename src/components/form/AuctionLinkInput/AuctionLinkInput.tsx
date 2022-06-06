import React, { ChangeEvent, FormEvent, useState } from 'react'
import './AuctionLinkInput.css'
import { AuctionLink } from '../../AuctionLink/AuctionLink'
import { AuctionLinkForm } from '../../../types/auction-links-form'
import { AddAuctionLinkForm } from '../AddAuctionLinkForm/AddAuctionLinkForm'

interface Props {
  form: {
    auctionLinks: AuctionLinkForm[],
  };
  removeAuctionLinkHandler: (index: number) => void;
  addAuctionLinkHandler: (auctionLink: AuctionLinkForm) => void;
}

const initialAuctionLinkForm: AuctionLinkForm = {
  name: '',
  url: '',
}

export const AuctionLinkInput = ({form, removeAuctionLinkHandler, addAuctionLinkHandler}: Props) => {
  const [linkForm, setLinkForm] = useState<AuctionLinkForm>(initialAuctionLinkForm);

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addAuctionLinkHandler(linkForm);
    setLinkForm(initialAuctionLinkForm);
  }

  return (
    <div className="AuctionLinkInput">
      <p>Aukcje: </p>
      <AddAuctionLinkForm
        onSubmit={onSubmitHandler}
        form={linkForm}
        disabled={form.auctionLinks.length >= 5}
        changeFormHandler={changeFormHandler}
      />
      {form.auctionLinks.map((e, i) => (
        <AuctionLink
          key={i}
          name={e.name}
          removeAuctionLinkHandler={() => removeAuctionLinkHandler(i)}
        />
      ))}
    </div>
  )
}
