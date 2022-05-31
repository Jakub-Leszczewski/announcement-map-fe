import React from 'react';
import './AdInfo.css'

interface Props {
  id: string;
  name: string;
  description: string
  price: number;
  country: string;
  city: string;
  zipCode: string;
  address: string;
  date: Date;
  links: {
    id: string;
    name: string;
    url: string;
  }[];
}

export const AdInfo = ({
  id, name, description, price, country, city, zipCode, address, date, links
}: Props) => {
  return (
    <section className="AdInfo">
      <header className="AdInfo__header">
        <h3>{name}</h3>
        <p>{price.toFixed(2)}zł</p>
      </header>
      <p className="AdInfo__id">id: {id}</p>

      <p className="AdInfo__address">{country} {zipCode} {city} {address}</p>
      <p className="AdInfo__description">{description}</p>
      <div className="AdInfo__link-container">
        {links.map((e) => (
          <a key={e.id} href={e.url}>{e.name}</a>
        ))}
      </div>
      <p className="AdInfo__date">{date.toLocaleDateString()}</p>
    </section>
  )
}
