import React from 'react'
import './UserMenu.css'
import { SignupView } from '../../view/SignupView/SignupView'
import { useSelector } from 'react-redux'
import { StoreType } from '../../store'
import { Window} from '../../store/types/app-slice-types'
import { SignInChoiceView } from '../../view/SignInChoiceView/SignInChoiceView'
import { SignInView } from '../../view/SignInView/SignInView'
import { UserView } from '../../view/UserView/UserView'
import { AccountSettingsView } from '../../view/AccountSettingsView/AccountSettingsView'
import { AccountSettingsConfirmView } from '../../view/AccountSettingsConfirmView/AccountSettingsConfirmView'
import { useIsAuth } from '../../hooks/useIsAuth'
import { AddAnnouncementView } from '../../view/AddAnnouncementView/AddAnnouncementView'
import { AnnouncementsView } from '../../view/AnnouncementsView/AnnouncementsView'

export const UserMenu = () => {
  const appStore = useSelector((store: StoreType) => store.app);
  const isAuth = useIsAuth();

  if(appStore.openWindow === Window.OPEN_NONE) return null;

  return(
    <section className="UserMenu">
      {appStore.openWindow === Window.OPEN_SIGN_IN_CHOICE && !isAuth && <SignInChoiceView/>}
      {appStore.openWindow === Window.OPEN_SIGN_IN && !isAuth && <SignInView/>}
      {appStore.openWindow === Window.OPEN_SIGNUP && !isAuth && <SignupView/>}
      {appStore.openWindow === Window.OPEN_USER && isAuth && <UserView/>}
      {appStore.openWindow === Window.OPEN_ACCOUNT_SETTINGS && isAuth && <AccountSettingsView/>}
      {appStore.openWindow === Window.OPEN_ACCOUNT_SETTINGS_CONFIRM && isAuth && <AccountSettingsConfirmView/>}
      {appStore.openWindow === Window.OPEN_ADD_ANNOUNCEMENT && isAuth && <AddAnnouncementView/>}
      {appStore.openWindow === Window.OPEN_ANNOUNCEMENTS && isAuth && <AnnouncementsView/>}
    </section>
  );
}
