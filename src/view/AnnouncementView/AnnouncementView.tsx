import React, { useEffect, useState } from 'react'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { openAnnouncements } from '../../store/slices/app-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useJwt } from '../../hooks/useJwt'
import './AnnouncementView.css'
import { DeleteAnnouncementResponse, ErrorResponse } from 'types'
import { StoreType } from '../../store'
import { AnnouncementInfo } from '../../components/AnnouncementInfo/AnnouncementInfo'
import { TextButton } from '../../components/common/TextButton/TextButton'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { useSetJwt } from '../../hooks/useSetJwt'
import { ActionConfirm } from '../../components/ActionConfirm/ActionConfirm'

export const AnnouncementView = () => {
  const dispatch = useDispatch();
  const appStore = useSelector((store: StoreType) => store.app);
  const [error, setError] = useState<string | null>(null);
  const [newJwt, setNewJwt] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<boolean>(false);

  const jwt = useJwt();
  const setJwt = useSetJwt();

  if(!jwt || !setJwt) return null;

  useEffect(() => {
    if(submitStatus === 200) {
      dispatch(openAnnouncements({
        message: 'Pomyślnie usunięto.',
        error: null
      }));
    }

    if(newJwt) setJwt(newJwt);
  }, [submitStatus]);

  const yesButtonHandler = async () => {
    const data = await api<DeleteAnnouncementResponse>(`http://localhost:3001/api/announcement/${appStore.announcementPayload}`, {
      method: HttpMethods.DELETE,
      jwt,
    });

    if(data.newJwt) setNewJwt(data.newJwt);
    if(data.status !== 200) setError((data.data as ErrorResponse)?.error || null);

    setSubmitStatus(data.status);
  }

  const noButtonHandler = () => {
    setConfirm(false);
  }

  const goBackHandler = () => {
    dispatch(openAnnouncements(null));
  }

  const removeAnnouncementHandler = async () => {
    setConfirm(true);
  }

  return(
    <section className="AnnouncementView">
      <UserMenuHeader title="Ogłoszenie" onClick={goBackHandler}/>
      {error && <p className="AnnouncementView__error">{error}</p>}
      <div className="AnnouncementView__container">

        <AnnouncementInfo id={appStore.announcementPayload}/>
        <div className="AnnouncementsView__button-container">
          <TextButton onClick={() => {}}>edytuj</TextButton>
          <TextButton onClick={removeAnnouncementHandler}>usuń</TextButton>
        </div>

        {
          confirm &&
          <ActionConfirm
          message={`Czy na pewno chcesz usunąć ten produkt o id: ${appStore.announcementPayload}`}
          yesButtonHandler={yesButtonHandler}
          noButtonHandler={noButtonHandler}
        />
        }
      </div>
    </section>
  )
}
