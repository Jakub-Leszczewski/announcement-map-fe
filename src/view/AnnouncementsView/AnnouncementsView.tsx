import React from 'react';
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { openUser } from '../../store/slices/app-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useJwt } from '../../hooks/useJwt'
import './AnnouncementsView.css'
import { useApiAuth } from '../../hooks/useApiAuth'
import { GetUserAnnouncementsResponse } from 'types';
import { AnnouncementShortInfo } from '../../components/AnnouncementShortInfo/AnnouncementShortInfo'
import { useUserDataAuth } from '../../hooks/useUserDataAuth'
import { StoreType } from '../../store'

export const AnnouncementsView = () => {
  const appStore = useSelector((store: StoreType) => store.app);
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
      {
        appStore.announcementsPayload.message &&
        <p className="AnnouncementsView__message">{appStore.announcementsPayload.message}</p>
      }
      <div className="AnnouncementsView__container">
        {
          data.length > 0
            ? (data as GetUserAnnouncementsResponse)?.map((e) => (
              <AnnouncementShortInfo
                key={e.id}
                id={e.id}
                title={e.title}
                price={e.price}
                views={e.views}
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
