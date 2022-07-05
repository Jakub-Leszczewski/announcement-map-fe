import React from 'react'
import './AnnouncementInfo.css'
import { GetAnnouncementResponse } from 'types';
import { AuctionLink } from '../AuctionLink/AuctionLink'
import { useApi } from '../../hooks/useApi'
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Props {
  id: string;
}

export const AnnouncementInfo = ({ id }: Props) => {
  const [loading, status, data] = useApi<GetAnnouncementResponse>(`http://localhost:3001/api/announcement/${id}`);

  if(loading) return <section className="AnnouncementInfo">loading...</section>

  if(status !== 200 || data === null || (data && 'error' in data))
    return <section className="AnnouncementInfo">{data && 'error' in data ? data.error : 'błąd'}</section>

  {
    return (
        <section className="AnnouncementInfo">
          <header className="AnnouncementInfo__header">
            <h3>{data.title}</h3>
            <p>{Number(data.price ?? 0).toFixed(2)} zł</p>
          </header>
          <p className="AnnouncementInfo__id">id: {id}</p>

          <p className="AnnouncementInfo__address">
            {
            `${data.country} 
              ${data.city} 
              ${data.zipCode} 
              ${data.street ?? ''} 
              ${data.buildingNumber ?? ''}${data.apartamentNumber ? `/${data.apartamentNumber}` : ''} `
            }
          </p>

          <p className="AnnouncementInfo__description">{data.description}</p>

          <div className="AnnouncementInfo__link-container">
            {data.auctionLinks?.map((e) => (<AuctionLink name={e.name} url={e.url} key={e.id}/>))}
          </div>

          <footer className="AnnouncementInfo__footer">
            <p className="AnnouncementInfo__date">
              {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : ''}
            </p>

            <div className="AnnouncementInfo__views-container">
              <i className="bi bi-eye-fill"/>
              <p>{data.views}</p>
            </div>
          </footer>
        </section>
      )
  }
}
