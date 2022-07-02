import React from 'react';
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { openAnnouncements, openUser } from '../../store/slices/app-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useJwt } from '../../hooks/useJwt'
import './AnnouncementView.css'
import { useApiAuth } from '../../hooks/useApiAuth'
import { GetUserAnnouncementsResponse } from 'types';
import { StoreType } from '../../store'
import { AnnouncementInfo } from '../../components/AnnouncementInfo/AnnouncementInfo'
import { TextButton } from '../../components/common/TextButton/TextButton'

export const AnnouncementView = () => {
  const dispatch = useDispatch();
  const appStore = useSelector((store: StoreType) => store.app);
  const jwt = useJwt();

  if(!jwt) return null;

  const [loading, status, data] = useApiAuth<GetUserAnnouncementsResponse>(
    `http://localhost:3001/api/announcement/${appStore.announcementPayload}`
  );

  const goBackHandler = () => {
    dispatch(openAnnouncements());
  }

  const removeAnnouncementHandler = () => {

  }

  if(loading) return <section className="AnnouncementView">loading...</section>
  if(status !== 200 || data === null || (data && 'error' in data))
    return <section className="AnnouncementInfo">{data && 'error' in data ? data.error : 'błąd'}</section>

  return(
    <section className="AnnouncementView">
      <UserMenuHeader title="Ogłoszenie" onClick={goBackHandler}/>
      <div className="AnnouncementView__container">
        <AnnouncementInfo id={appStore.announcementPayload}/>
        <div className="AnnouncementsView__button-container">
          <TextButton onClick={() => {}}>edytuj</TextButton>
          <TextButton onClick={() => {}}>usuń</TextButton>
        </div>
      </div>
    </section>
  )
}
