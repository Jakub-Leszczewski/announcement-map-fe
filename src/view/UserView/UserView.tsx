import React, { useContext, useEffect, useState } from 'react'
import './UserView.css'
import { Button } from '../../components/common/Button/Button'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch, useSelector } from 'react-redux'
import { openAccountSettings, openNone, openSignup } from '../../store/slices/app-slice'
import { UserAvatarBig } from '../../components/UserAvatarBig/UserAvatarBig'
import { setJwt } from '../../store/slices/user-slice'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { StoreType } from '../../store'

export const UserView = () => {
  const [logout, setLogout] = useState<boolean>(false);
  const [logoutStatus, setLogoutStatus] = useState<number | null>(null);
  const userStore = useSelector((store: StoreType) => store.user);
  const dispatch = useDispatch();

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
      dispatch(openNone(undefined));
    }
  }, [logout, logoutStatus]);

  const goBackHandler = () => {
    dispatch(openNone(undefined));
  }

  const logoutHandler = () => {
    setLogout(true);
  }

  const goAccountSettingsHandler = () => {
    dispatch(openAccountSettings(undefined));
  }

  return(
    <section className="UserView">
      <UserMenuHeader title="Użytkownik" onClick={goBackHandler}/>
      <div className="UserView__avatar">
        <UserAvatarBig/>
      </div>

      <h2 className="UserView__name">{userStore.user?.firstName + ' ' + userStore.user?.lastName}</h2>

      <div className="UserView__buttons-container">
        <Button width="100%" height={30} borderRadius="15px" >Twoje ogłoszenia</Button>
        <Button width="100%" height={30} borderRadius="15px" >Dodaj ogłoszenie</Button>
        <Button width="100%" height={30} borderRadius="15px" onClick={goAccountSettingsHandler}>Zarządzaj kontem</Button>
      </div>

      <div className="UserView__buttons-container">
        <Button width="100%" height={30} borderRadius="15px" onClick={logoutHandler}>Wyloguj się</Button>
      </div>
    </section>
  );
}
