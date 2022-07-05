import React from 'react'
import './AnnouncementInfo.css'
import { GetAnnouncementResponse } from 'types';
import { AuctionLink } from '../AuctionLink/AuctionLink'
import { useApi } from '../../hooks/useApi'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { apiUrl } from '../../config'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'

interface Props {
  id: string;
}

export const AnnouncementInfo = ({ id }: Props) => {
  const [loading, status, data] = useApi<GetAnnouncementResponse>(`${apiUrl}/announcement/${id}`);


  if(!loading && (status !== 200 || data === null || (data && 'error' in data)))
    return <section className="AnnouncementInfo">{data && 'error' in data ? data.error : 'błąd'}</section>

  {
    return (
        <section className="AnnouncementInfo">
          {
            data && !loading ?
            <>
              <header className="AnnouncementInfo__header">
                <h3>{(data as GetAnnouncementResponse).title}</h3>
                <p>{Number((data as GetAnnouncementResponse).price ?? 0).toFixed(2)} zł</p>
              </header>
              <p className="AnnouncementInfo__id">id: {id}</p>

              <p className="AnnouncementInfo__address">
                {
                  `${(data as GetAnnouncementResponse).country}
              ${(data as GetAnnouncementResponse).city}
              ${(data as GetAnnouncementResponse).zipCode}
              ${(data as GetAnnouncementResponse).street ?? ''}
              ${(data as GetAnnouncementResponse).buildingNumber ?? ''}
              ${(data as GetAnnouncementResponse).apartamentNumber ? `/${(data as GetAnnouncementResponse).apartamentNumber}` : ''}`
                }
              </p>

              <p className="AnnouncementInfo__description">{(data as GetAnnouncementResponse).description}</p>

              <div className="AnnouncementInfo__link-container">
                {(data as GetAnnouncementResponse).auctionLinks?.map((e) => (<AuctionLink name={e.name} url={e.url} key={e.id}/>))}
              </div>

              <footer className="AnnouncementInfo__footer">
                <p className="AnnouncementInfo__date">
                  {
                    (data as GetAnnouncementResponse).createdAt
                    ? new Date((data as GetAnnouncementResponse).createdAt).toLocaleDateString()
                    : ''
                  }
                </p>

                <div className="AnnouncementInfo__views-container">
                  <i className="bi bi-eye-fill"/>
                  <p>{(data as GetAnnouncementResponse).views}</p>
                </div>
              </footer>
            </> : <LoadingSpinner/>
          }
        </section>
      )
  }
}
