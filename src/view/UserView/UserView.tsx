import React, { useEffect, useState } from 'react'
import './UserView.css'
import { Button } from '../../components/common/Button/Button'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch } from 'react-redux'
import { openWindow, Window } from '../../store/slices/app-slice'
import { UserAvatarBig } from '../../components/UserAvatarBig/UserAvatarBig'
import { setJwt } from '../../store/slices/user-slice'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { useUserDataAuth } from '../../hooks/useUserDataAuth'

export const UserView = () => {
  const dispatch = useDispatch();
  const userData = useUserDataAuth();
  const [logout, setLogout] = useState<boolean>(false);
  const [logoutStatus, setLogoutStatus] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      if(logout) {
        const logoutData = await api('http://localhost:3001/api/auth/logout', {method: HttpMethods.DELETE});
        if(logoutData.status === 200) {
          setLogoutStatus(200);
          setLogout(false);
        }
      }
    })();

    if(logoutStatus === 200) {
      dispatch(setJwt(null));
      dispatch(openWindow({
        openWindow: Window.OPEN_NONE,
        data: undefined,
      }));
    }
  }, [logout, logoutStatus]);

  const goBackHandler = () => {
    dispatch(openWindow({
      openWindow: Window.OPEN_NONE,
      data: undefined,
    }));
  }

  const logoutHandler = () => {
    setLogout(true);
  }

  const goAccountSettingsHandler = () => {
    dispatch(openWindow({
      openWindow: Window.OPEN_ACCOUNT_SETTINGS,
      data: undefined,
    }));
  }

  const goAddAnnouncementHandler = () => {
    dispatch(openWindow({
      openWindow: Window.OPEN_ADD_ANNOUNCEMENT,
      data: undefined,
    }));
  }


  if (!userData) return null;

  return(
    <section className="UserView">
      <UserMenuHeader title="Użytkownik" onClick={goBackHandler}/>
      <div className="UserView__avatar">
        <UserAvatarBig/>
      </div>

      <h2 className="UserView__name">{userData.firstName + ' ' + userData.lastName}</h2>

      <div className="UserView__buttons-container">
        <Button >Twoje ogłoszenia</Button>
        <Button onClick={goAddAnnouncementHandler}>Dodaj ogłoszenie</Button>
        <Button onClick={goAccountSettingsHandler}>Zarządzaj kontem</Button>
      </div>

      <div className="UserView__buttons-container">
        <Button onClick={logoutHandler}>Wyloguj się</Button>
      </div>
    </section>
  );
}
