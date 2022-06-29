import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './AccountSettingsConfirmView.css'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch, useSelector } from 'react-redux'
import { UserAvatarBig } from '../../components/UserAvatarBig/UserAvatarBig'
import { StoreType } from '../../store'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { useUserDataAuth } from '../../hooks/useUserDataAuth'
import { useJwt } from '../../hooks/useJwt'
import { ErrorResponse, UpdateUserResponse } from 'types'
import { useRefreshUser } from '../../hooks/useRefreshUser'
import { AccountSettingsConfirmForm } from '../../components/form/AccountSettingsConfirmForm/AccountSettingsConfirmForm'
import { openAccountSettings, openUser } from '../../store/slices/app-slice'
import { useSetJwt } from '../../hooks/useSetJwt'


export const AccountSettingsConfirmView = () => {
  const [password, setPassword] = useState<string>('');
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [newJwt, setNewJwt] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const appStore = useSelector((store: StoreType) => store.app);
  const jwt = useJwt();
  const setJwt = useSetJwt();
  const userData = useUserDataAuth();
  const refreshUser = useRefreshUser();

  if(!userData || !refreshUser || !setJwt) return null;

  useEffect(() => {
    if(submitStatus === 200) {
      if(newJwt) setJwt(newJwt);
      dispatch(openAccountSettings({
        message: 'Pomyślnie zaktualizowano.',
        error: null
      }));
    } else if (submitStatus && submitStatus !== 401) {
      dispatch(openAccountSettings({
        message: null,
        error
      }));
    }
  }, [submitStatus]);

  const goBackHandler = () => {
    dispatch(openUser());
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSubmitStatus(null);
    setPassword(e.target.value);
    setNewJwt(null);
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(password) {
      const data = await api<UpdateUserResponse | ErrorResponse>(`http://localhost:3001/api/user/${userData.id}`, {
        method: HttpMethods.PATCH,
        payload: { ...appStore.accountSettingsConfirmPayload, password },
        jwt,
      });

      if(data.newJwt) setNewJwt(data.newJwt)

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
