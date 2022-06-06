import React, { ChangeEvent } from 'react'
import { AuctionLinkEntityRes } from 'types'
import './AuctionLinkInput.css'

interface Props {
  form: AuctionLinkEntityRes[];
  changeFormHandle?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AuctionLinkInput = () => {
  return (
    <div className="AuctionLinkInput">
      <p></p>
    </div>
  )
}
