import React from 'react';
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { openUser } from '../../store/slices/app-slice'
import { useDispatch } from 'react-redux'
import { useJwt } from '../../hooks/useJwt'
import './AnnouncementsView.css'
import { useApiAuth } from '../../hooks/useApiAuth'
import { GetUserAnnouncementsResponse } from 'types';
import { AnnouncementShortInfo } from '../../components/AnnouncementShortInfo/AnnouncementShortInfo'
import { useUserDataAuth } from '../../hooks/useUserDataAuth'

export const AnnouncementsView = () => {
  const dispatch = useDispatch();
  const jwt = useJwt();
  const user = useUserDataAuth();

  if(!jwt || !user) return null;

  const [loading, status, data] = useApiAuth<GetUserAnnouncementsResponse>(`http://localhost:3001/api/user/${user.id}/announcement`)

  const goBackHandler = () => {
    dispatch(openUser());
  }

  if(loading) return <section className="AnnouncementsView">loading...</section>
  if(status !== 200 || data === null || (data && 'error' in data))
    return <section className="AnnouncementInfo">{data && 'error' in data ? data.error : 'błąd'}</section>

  return(
    <section className="AnnouncementsView">
      <UserMenuHeader title="Twoje ogłoszenia" onClick={goBackHandler}/>
      <div className="AnnouncementsView__announcement-container">
        {
          data.length > 0
            ? (data as GetUserAnnouncementsResponse)?.map((e) => (
              <AnnouncementShortInfo
                key={e.id}
                id={e.id}
                title={e.title}
                price={e.price}
                country={e.country}
                city={e.city}
                zipCode={e.zipCode}
                street={e.street}
                buildingNumber={e.buildingNumber}
                apartamentNumber={e.apartamentNumber}
                createdAt={e.createdAt}
              />
            ))
          : <p>brak</p>
        }
      </div>
    </section>
  )
}
