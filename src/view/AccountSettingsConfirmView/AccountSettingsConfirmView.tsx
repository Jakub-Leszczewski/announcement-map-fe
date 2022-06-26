import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './AccountSettingsConfirmView.css'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch, useSelector } from 'react-redux'
import { openWindow, Window } from '../../store/slices/app-slice'
import { UserAvatarBig } from '../../components/UserAvatarBig/UserAvatarBig'
import { StoreType } from '../../store'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { setJwt } from '../../store/slices/user-slice'
import { useUserDataAuth } from '../../hooks/useUserDataAuth'
import { useJwt } from '../../hooks/useJwt'
import { ErrorResponse, UserEntityResponse } from 'types'
import { UserFormUpdate } from '../../types/user-form'
import { useRefreshUser } from '../../hooks/useRefreshUser'
import { AccountSettingsConfirmForm } from '../../components/form/AccountSettingsConfirmForm/AccountSettingsConfirmForm'


export const AccountSettingsConfirmView = () => {
  const jwt = useJwt();
  const userData = useUserDataAuth();
  const refreshUser = useRefreshUser();

  if(!userData || !refreshUser) return null;

  const dispatch = useDispatch();
  const appStore = useSelector((store: StoreType) => store.app);
  const [password, setPassword] = useState<string>('');
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(submitStatus === 200) {
      dispatch(openWindow({
        openWindow: Window.OPEN_ACCOUNT_SETTINGS,
        data: { message: 'Pomyślnie zaktualizowano.', error: null },
      }));
    } else if (submitStatus && submitStatus !== 401) {
      dispatch(openWindow({
        openWindow: Window.OPEN_ACCOUNT_SETTINGS,
        data: {message: null, error: error },
      }));
    }
  }, [submitStatus]);

  const goBackHandler = () => {
    dispatch(openWindow({
      openWindow: Window.OPEN_USER,
      data: undefined,
    }));
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setPassword(e.target.value);
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(password) {
      const data = await api<UserEntityResponse | ErrorResponse>(`http://localhost:3001/api/user/${userData.id}`, {
        method: HttpMethods.PATCH,
        payload: { ...(appStore.data as UserFormUpdate), password },
        jwt,
      });

      if(data.status === 200) {
        await refreshUser()
        setError(null)
      }
      else setError((data.data as ErrorResponse)?.error || null);

      setSubmitStatus(data.status);
    }
  }

  return (
    <section className="AccountSettingsConfirmView">
      <UserMenuHeader title="Weryfikacja" onClick={goBackHandler}/>

      <div className="AccountSettingsConfirmView__avatar">
        <UserAvatarBig/>
      </div>

      {error && <p className="AccountSettingsConfirmView__error">{error}</p>}

      <AccountSettingsConfirmForm
        form={password}
        changeFormHandler={changeFormHandler}
        onSubmitHandler={onSubmitHandler}
      />
    </section>
  );
}
