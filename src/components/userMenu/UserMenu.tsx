import React, { useContext } from 'react'
import './style.css'
import { SignupView } from '../../view/signupView/SignupView'
import { useSelector } from 'react-redux'
import { StoreType } from '../../store'
import { ActionType } from '../../store/slices/app-slice'
import { AuthContext } from '../auth/Auth'
import { SignInChoiceView } from '../../view/signInChoiceView/SignInChoiceView'
import { SignInView } from '../../view/signInView/SignInView'

export const UserMenu = () => {
  const context = useContext(AuthContext);
  const appStore = useSelector((store: StoreType) => store.app);

  if(appStore.openWindow === ActionType.OPEN_NONE) return null;

  return(
    <section className="UserMenu">
      {appStore.openWindow === ActionType.OPEN_SIGN_IN_CHOICE && !context.id && <SignInChoiceView/>}
      {appStore.openWindow === ActionType.OPEN_SIGN_IN && !context.id && <SignInView/>}
      {appStore.openWindow === ActionType.OPEN_SIGNUP && !context.id && <SignupView/>}
    </section>
  );
}
