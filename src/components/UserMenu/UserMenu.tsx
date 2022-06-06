import React from 'react'
import './UserMenu.css'
import { SignupView } from '../../view/SignupView/SignupView'
import { useSelector } from 'react-redux'
import { StoreType } from '../../store'
import { ActionType } from '../../store/slices/app-slice'
import { SignInChoiceView } from '../../view/SignInChoiceView/SignInChoiceView'
import { SignInView } from '../../view/SignInView/SignInView'
import { UserView } from '../../view/UserView/UserView'
import { AccountSettingsView } from '../../view/AccountSettingsView/AccountSettingsView'
import { AccountSettingsConfirmView } from '../../view/AccountSettingsConfirmView/AccountSettingsConfirmView'
import { useIsAuth } from '../../hooks/useIsAuth'
import { AddAnnouncementView } from '../../view/AddAnnouncementView/AddAnnouncementView'

export const UserMenu = () => {
  const appStore = useSelector((store: StoreType) => store.app);
  const userStore = useSelector((store: StoreType) => store.user);
  const isAuth = useIsAuth();

  if(appStore.openWindow === ActionType.OPEN_NONE) return null;

  return(
    <section className="UserMenu">
      {appStore.openWindow === ActionType.OPEN_SIGN_IN_CHOICE && !isAuth && <SignInChoiceView/>}
      {appStore.openWindow === ActionType.OPEN_SIGN_IN && !isAuth && <SignInView/>}
      {appStore.openWindow === ActionType.OPEN_SIGNUP && !isAuth && <SignupView/>}
      {appStore.openWindow === ActionType.OPEN_USER && isAuth && <UserView/>}
      {appStore.openWindow === ActionType.OPEN_ACCOUNT_SETTINGS && isAuth && <AccountSettingsView/>}
      {appStore.openWindow === ActionType.OPEN_ACCOUNT_SETTINGS_CONFIRM && isAuth && <AccountSettingsConfirmView/>}
      {appStore.openWindow === ActionType.OPEN_ADD_ANNOUNCEMENT && isAuth && <AddAnnouncementView/>}
    </section>
  );
}
