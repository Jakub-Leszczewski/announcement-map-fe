import React from 'react';
import './AnnouncementShortInfo.css'

interface Props {
  id: string
  title: string;
  price: number;
  country: string;
  city: string;
  zipCode: string;
  street: string | null;
  buildingNumber: string | null;
  apartamentNumber: string | null;
  createdAt: string;
}

export const AnnouncementShortInfo = ({
  id, title, price, country, city, zipCode, street, buildingNumber, apartamentNumber, createdAt
}: Props) => {
  return (
    <section className="AnnouncementShortInfo">
      <header className="AnnouncementShortInfo__header">
        <h3>{title ?? ''}</h3>
        <p>{Number(price ?? 0).toFixed(2)} zł</p>
      </header>
      <p className="AnnouncementShortInfo__id">id: {id}</p>


      <p className="AnnouncementShortInfo__address">
        {
          `${country ?? ''} 
              ${city ?? ''} 
              ${zipCode ?? ''} 
              ${street ?? ''} 
              ${buildingNumber ?? ''}${apartamentNumber ? `/${apartamentNumber}` : ''} `
        }
      </p>

      <p className="AnnouncementShortInfo__date">
        {createdAt ? new Date(createdAt).toLocaleDateString() : ''}
      </p>
    </section>
  );
}
