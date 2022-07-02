import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './AccountSettingsView.css'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch, useSelector } from 'react-redux'
import { UserAvatarBig } from '../../components/UserAvatarBig/UserAvatarBig'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { StoreType } from '../../store'
import { UserFormUpdate } from '../../types/user-form'
import { useUserDataAuth } from '../../hooks/useUserDataAuth'
import { useJwt } from '../../hooks/useJwt'
import { ErrorResponse, UpdateUserResponse } from 'types'
import { AccountSettingsForm } from '../../components/form/AccountSettingsForm/AccountSettingsForm'
import { useRefreshUser } from '../../hooks/useRefreshUser'
import { openAccountSettings, openUser } from '../../store/slices/app-slice'
import { useSetJwt } from '../../hooks/useSetJwt'
import { PasswordConfirm } from '../../components/PasswordConfirm/PasswordConfirm'

export const  AccountSettingsView = () => {
  const userData = useUserDataAuth();
  if(!userData) return null;

  const initialUserFormState: UserFormUpdate = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    newPassword: '',
    repeatNewPassword: '',
    password: '',
  };

  const [form, setForm] = useState<UserFormUpdate>(initialUserFormState);
  const [error, setError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [newJwt, setNewJwt] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<boolean>(false);

  const appStore = useSelector((store: StoreType) => store.app);
  const dispatch = useDispatch();
  const refreshUser = useRefreshUser();
  const setJwt = useSetJwt();
  const jwt = useJwt();

  if(!refreshUser || !setJwt) return null;

  useEffect(() => {
    if(newJwt) setJwt(newJwt);
  }, [newJwt])

  const goBackHandler = () => {
    dispatch(openUser());
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(appStore.accountSettingsPayload.message || appStore.accountSettingsPayload.error) {
      dispatch(openAccountSettings(null));
    }

    setError(null);
    setSubmitStatus(null);
    setNewJwt(null);
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const callUserUpdateApi = async (): Promise<number | null> => {
    const data = await api<UpdateUserResponse | ErrorResponse>(`http://localhost:3001/api/user/${userData.id}`, {
      method: HttpMethods.PATCH,
      payload: form,
      jwt,
    });

    if(data.newJwt) setNewJwt(data.newJwt);

    if(data.status !== 200) setError((data.data as ErrorResponse)?.error || null);
    else {
      setForm(prev => ({
        ...prev,
        password: '',
      }))
      await refreshUser();
      setError(null);
    }

    setSubmitStatus(data.status);
    return data.status;
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(form.email !== userData.email || form.newPassword) {
      setConfirm(true);
    } else {
      await callUserUpdateApi()
    }
  }

  const onConfirmHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitStatus = await callUserUpdateApi()

    if(submitStatus !== 401) setConfirm(false);
  }

  return (
    <section className="AccountSettingsView">
      <UserMenuHeader title="Zarządzaj kontem" onClick={goBackHandler}/>

      <div className="AccountSettingsView__container">
        <div className="AccountSettingsView__avatar">
          <UserAvatarBig/>
        </div>

        {submitStatus === 200 && <p className="AccountSettingsView__message">Pomyślnie zapisano</p>}
        {
          appStore.accountSettingsPayload.message &&
          <p className="AccountSettingsView__message">{appStore.accountSettingsPayload.message}</p>
        }

        {error && <p className="AccountSettingsView__error">{error}</p>}

        {
          appStore.accountSettingsPayload.error &&
          <p className="AccountSettingsView__error">{appStore.accountSettingsPayload.error}</p>
        }

        <AccountSettingsForm
          form={form}
          changeFormHandler={changeFormHandler}
          onSubmitHandler={onSubmitHandler}
        />

        {
          confirm &&
          <PasswordConfirm
            error={error}
            changeFormHandler={changeFormHandler}
            onConfirmHandler={onConfirmHandler}
            form={form}
            message={'Aby zapisać zmiany podaj swoje hasło.'}
         />
        }
      </div>
    </section>
  );
}
