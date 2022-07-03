import React from 'react';
import './AnnouncementShortInfo.css'
import { useDispatch } from 'react-redux'
import { openAnnouncement } from '../../store/slices/app-slice'

interface Props {
  id: string
  title: string;
  price: number;
  views: number
  country: string;
  city: string;
  zipCode: string;
  street: string | null;
  buildingNumber: string | null;
  apartamentNumber: string | null;
  createdAt: string;
}

export const AnnouncementShortInfo = ({
  id, title, price, views, country, city, zipCode, street, buildingNumber, apartamentNumber, createdAt
}: Props) => {
  const dispatch = useDispatch();

  const goAnnouncementHandler = () => {
    dispatch(openAnnouncement(id));
  }

  return (
    <section onClick={goAnnouncementHandler} className="AnnouncementShortInfo">
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

      <footer className="AnnouncementShortInfo__footer">
        <p className="AnnouncementShortInfo__date">
          {createdAt ? new Date(createdAt).toLocaleDateString() : ''}
        </p>

        <div className="AnnouncementShortInfo__views-container">
          <i className="bi bi-eye-fill"/>
          <p>{views}</p>
        </div>
      </footer>
    </section>
  );
}
