import React, { ChangeEvent } from 'react'
import './AuctionLink.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Props {
  name: string;
  url?: string;
  removeAuctionLinkHandler?: () => void;
}

export const AuctionLink = ({name, url, removeAuctionLinkHandler}: Props) => {
  console.log(url);
  return (
    <div className="AuctionLink" onClick={removeAuctionLinkHandler}>
      {
        url && !removeAuctionLinkHandler
        ? <a target="_blank" href={url}>{name}</a>
        : <><span>{name}</span> {removeAuctionLinkHandler &&<i className="bi bi-trash-fill"/>}</>
      }
    </div>
  );
}
