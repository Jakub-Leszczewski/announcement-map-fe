import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
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
import { openAccountSettings, openNone, openUser } from '../../store/slices/app-slice'
import { useSetJwt } from '../../hooks/useSetJwt'
import { PasswordConfirm } from '../../components/PasswordConfirm/PasswordConfirm'
import { initialUserForm } from '../../components/form/AccountSettingsForm/account-settings-form-initial'
import { apiUrl } from '../../config'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'

export const  AccountSettingsView = () => {
  const [form, setForm] = useState<UserFormUpdate>(initialUserForm);
  const [error, setError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [newJwt, setNewJwt] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const accountSettingsInfo = useSelector((store: StoreType) => store.app.accountSettingsPayload);
  const dispatch = useDispatch();
  const refreshUser = useRefreshUser();
  const setJwt = useSetJwt();
  const jwt = useJwt();
  const userData = useUserDataAuth();

  if(!refreshUser || !setJwt || !userData) dispatch(openNone());

  useEffect(() => {
    if(newJwt) (setJwt as any)(newJwt);
  }, [newJwt]);

  useEffect(() => {
    if(userData) {
      const {id, avatar, username, role, ...userFormData} = userData;
      setForm(prev => ({
        ...prev,
        ...userFormData,
      }));
    }
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [confirm])

  const goBackHandler = () => {
    dispatch(openUser());
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(accountSettingsInfo.message || accountSettingsInfo.error) {
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
    const data = await api<UpdateUserResponse | ErrorResponse>(`${apiUrl}/user/${userData?.id}`, {
      method: HttpMethods.PATCH,
      payload: form,
      jwt,
    });

    if(data.newJwt) setNewJwt(data.newJwt);

    if(data.status !== 200) setError((data.data as ErrorResponse)?.error || null);
    else {
      await (refreshUser as any)();
      setError(null);
    }

    setSubmitStatus(data.status);
    return data.status;
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(form.email !== userData?.email || form.newPassword) {
      setConfirm(true);
    } else {
      await callUserUpdateApi();
    }
    setLoading(false);
  }

  const onConfirmHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitStatus = await callUserUpdateApi()

    if(submitStatus !== 401) setConfirm(false);

    setLoading(false);
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
          accountSettingsInfo.message &&
          <p className="AccountSettingsView__message">{accountSettingsInfo.message}</p>
        }

        {error && <p className="AccountSettingsView__error">{error}</p>}

        {
          accountSettingsInfo.error &&
          <p className="AccountSettingsView__error">{accountSettingsInfo.error}</p>
        }

        <AccountSettingsForm
          form={form}
          changeFormHandler={changeFormHandler}
          onSubmitHandler={(e) => {
            onSubmitHandler(e);
            setLoading(true);
          }}
        />

        {
          confirm &&
          <PasswordConfirm
            error={error}
            changeFormHandler={changeFormHandler}
            onConfirmHandler={(e) => {
              onConfirmHandler(e);
              setLoading(true);
            }}
            form={form}
            message={'Aby zapisać zmiany podaj swoje hasło.'}
         />
        }
      </div>
      {loading && <LoadingSpinner/>}
    </section>
  );
}
