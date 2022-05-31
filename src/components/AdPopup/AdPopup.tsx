import React from 'react';
import './AdPopup.css'
import { AdInfo } from '../AdInfo/AdInfo'

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

export const AdPopup = ({
  id, name, description, price, country, city, zipCode, address, date, links
}: Props) => {
  return (
    <section className="AdPopup">
      <AdInfo
        id={id}
        name={name}
        description={description}
        price={price}
        country={country}
        city={city}
        zipCode={zipCode}
        address={address}
        date={date}
        links={links}
      />
      <hr/>
      <AdInfo
        id={id}
        name={name}
        description={description}
        price={price}
        country={country}
        city={city}
        zipCode={zipCode}
        address={address}
        date={date}
        links={links}
      />
    </section>
  )
}
