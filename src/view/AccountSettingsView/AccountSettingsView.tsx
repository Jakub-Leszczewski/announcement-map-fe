import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './AccountSettingsView.css'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch, useSelector } from 'react-redux'
import { openWindow, Window } from '../../store/slices/app-slice'
import { UserAvatarBig } from '../../components/UserAvatarBig/UserAvatarBig'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { StoreType } from '../../store'
import { UserFormUpdate } from '../../types/user-form'
import { useUserDataAuth } from '../../hooks/useUserDataAuth'
import { useJwt } from '../../hooks/useJwt'
import { ErrorResponse, UserEntityResponse } from 'types'
import { AccountSettingsForm } from '../../components/form/AccountSettingsForm/AccountSettingsForm'
import { useRefreshUser } from '../../hooks/useRefreshUser'

export const  AccountSettingsView = () => {
  const userData = useUserDataAuth();
  const refreshUser = useRefreshUser();
  const jwt = useJwt();
  if(!userData || !refreshUser) return null;

  const initialUserFormState: UserFormUpdate = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    newPassword: '',
    repeatNewPassword: '',
  };

  const appStore = useSelector((store: StoreType) => store.app);
  const dispatch = useDispatch();

  const [error, setError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [form, setForm] = useState<UserFormUpdate>(initialUserFormState);

  const goBackHandler = () => {
    dispatch(openWindow({
      openWindow: Window.OPEN_USER,
      data: undefined,
    }));
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmitStatus(null);
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(form.email !== userData.email || form.newPassword) {
      dispatch(openWindow({
        openWindow: Window.OPEN_ACCOUNT_SETTINGS_CONFIRM,
        data: form,
      }));
    } else {
      const data = await api<UserEntityResponse | ErrorResponse>(`http://localhost:3001/api/user/${userData.id}`, {
        method: HttpMethods.PATCH,
        payload: form,
        jwt,
      });

      if(data.status !== 200) setError((data.data as ErrorResponse)?.error || null);
      else {
        await refreshUser();
        setError(null);
      }
      setSubmitStatus(data.status);
    }
  }

  return (
    <section className="AccountSettingsView">
      <UserMenuHeader title="Zarządzaj kontem" onClick={goBackHandler}/>

      <div className="AccountSettingsView__avatar">
        <UserAvatarBig/>
      </div>

      {submitStatus === 200 && <p className="AccountSettingsView__message">Pomyślnie zapisano</p>}
      {
        (appStore.data && 'message' in appStore.data)
        && <p className="AccountSettingsView__message">{appStore.data.message}</p>
      }

      {error && <p className="AccountSettingsView__error">{error}</p>}
      {
        (appStore.data && 'error' in appStore.data)
        && <p className="AccountSettingsView__error">{appStore.data.error}</p>
      }

      <AccountSettingsForm
        form={form}
        changeFormHandler={changeFormHandler}
        onSubmitHandler={onSubmitHandler}
      />
    </section>
  );
}
