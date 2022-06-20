import React, { useEffect, useState } from 'react'
import './AnnouncementInfo.css'
import { api } from '../../utils/api/api'
import { AnnouncementEntity, AuctionLinkEntity } from 'types';
import { useJwt } from '../../hooks/useJwt'
import { AuctionLink } from '../AuctionLink/AuctionLink'

interface Props {
  id: string;
  title?: string;
  description?: string
  price?: number;
  country?: string;
  city?: string;
  zipCode?: string;
  street?: string;
  buildingNumber?: string;
  apartamentNumber?: string;
  date?: Date;
  fetchData?: boolean;
  auctionLinks?: AuctionLinkEntity[];
}

export const AnnouncementInfo = ({
  id, title, description, price, country, city, zipCode, street, buildingNumber, apartamentNumber, date, auctionLinks, fetchData
}: Props) => {
  const jwt = useJwt();
  const [announcementData, setAnnouncementData] = useState<AnnouncementEntity & {auctionLinks: AuctionLinkEntity[]}
    | null>(null);

  useEffect(() => {
    (async () => {
      if(fetchData) {
        const data = await api<AnnouncementEntity & {auctionLinks: AuctionLinkEntity[]}>(`http://localhost:3001/api/announcement/${id}`, { jwt });
        if(data.data && data.status === 200) setAnnouncementData(data.data);
        else setAnnouncementData(null);
      }
    })();
  }, []);

  if(!announcementData && fetchData) return (
    <section className="AnnouncementInfo">loading...</section>
  )

  return (
    <section className="AnnouncementInfo">
      <header className="AnnouncementInfo__header">
        <h3>{fetchData && announcementData ? announcementData?.title : title}</h3>
        <p>{fetchData && announcementData ? Number(announcementData?.price).toFixed(2) : price?.toFixed(2)}zł</p>
      </header>
      <p className="AnnouncementInfo__id">id: {id}</p>

      <p className="AnnouncementInfo__address">{
        fetchData && announcementData
          ? `${announcementData.country} 
          ${announcementData.city} 
          ${announcementData.zipCode} 
          ${announcementData.street || ''} 
          ${announcementData.buildingNumber || ''}${announcementData.apartamentNumber ? `/${announcementData.apartamentNumber}` : ''} `
          : `${country || ''} ${city || ''} ${zipCode || ''} ${street || ''} ${buildingNumber || ''} ${apartamentNumber}` || ''}
      </p>

      <p className="AnnouncementInfo__description">{fetchData && announcementData ? announcementData?.description : description}</p>

      <div className="AnnouncementInfo__link-container">
        {
          fetchData && announcementData
            ? announcementData.auctionLinks?.map((e) => (<AuctionLink name={e.name} url={e.url} key={e.id}/>))
            : auctionLinks?.map((e) => (<AuctionLink name={e.name} url={e.url} key={e.id}/>))
        }
      </div>
      <p className="AnnouncementInfo__date">
        {
        fetchData && announcementData
          ? new Date(announcementData.createdAt).toLocaleDateString()
          : date?.toLocaleDateString()
        }
      </p>
    </section>
  )
}
