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

export const UserMenu = () => {
  const appStore = useSelector((store: StoreType) => store.app);
  const userStore = useSelector((store: StoreType) => store.user);

  if(appStore.openWindow === ActionType.OPEN_NONE) return null;

  return(
    <section className="UserMenu">
      {appStore.openWindow === ActionType.OPEN_SIGN_IN_CHOICE && !userStore.user && <SignInChoiceView/>}
      {appStore.openWindow === ActionType.OPEN_SIGN_IN && !userStore.user && <SignInView/>}
      {appStore.openWindow === ActionType.OPEN_SIGNUP && !userStore.user && <SignupView/>}
      {appStore.openWindow === ActionType.OPEN_USER && userStore.user && <UserView/>}
      {appStore.openWindow === ActionType.OPEN_ACCOUNT_SETTINGS && userStore.user && <AccountSettingsView/>}
      {appStore.openWindow === ActionType.OPEN_ACCOUNT_SETTINGS_CONFIRM && userStore.user && <AccountSettingsConfirmView/>}
    </section>
  );
}
