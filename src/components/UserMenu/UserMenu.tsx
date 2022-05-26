import React, { useContext } from 'react'
import './UserMenu.css'
import { SignupView } from '../../view/SignupView/SignupView'
import { useSelector } from 'react-redux'
import { StoreType } from '../../store'
import { ActionType } from '../../store/slices/app-slice'
import { AuthContext } from '../Auth/Auth'
import { SignInChoiceView } from '../../view/SignInChoiceView/SignInChoiceView'
import { SignInView } from '../../view/SignInView/SignInView'
import { UserView } from '../../view/UserView/UserView'

export const UserMenu = () => {
  const context = useContext(AuthContext);
  const appStore = useSelector((store: StoreType) => store.app);

  if(appStore.openWindow === ActionType.OPEN_NONE) return null;

  return(
    <section className="UserMenu">
      {appStore.openWindow === ActionType.OPEN_SIGN_IN_CHOICE && !context.id && <SignInChoiceView/>}
      {appStore.openWindow === ActionType.OPEN_SIGN_IN && !context.id && <SignInView/>}
      {appStore.openWindow === ActionType.OPEN_SIGNUP && !context.id && <SignupView/>}
      {appStore.openWindow === ActionType.OPEN_USER && context.id && <UserView/>}
    </section>
  );
}
