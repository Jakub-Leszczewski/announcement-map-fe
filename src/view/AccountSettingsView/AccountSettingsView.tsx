import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './AccountSettingsView.css'
import { Button } from '../../components/common/Button/Button'
import { ShortTextInput } from '../../components/common/ShortTextInput/ShortTextInput'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch, useSelector } from 'react-redux'
import { openAccountSettings, openAccountSettingsConfirm, openUser } from '../../store/slices/app-slice'
import { UserAvatarBig } from '../../components/UserAvatarBig/UserAvatarBig'
import { NewPasswordInputFields } from '../../components/form/NewPasswordInputFields/NewPasswordInputFields'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { passwordValidation } from '../../utils/validation'
import { StoreType } from '../../store'
import { setJwt } from '../../store/slices/user-slice'
import { InfoType } from '../../types/info-types'
import { UserFormUpdate } from '../../types/user-form'
import { useUserDataAuth } from '../../hooks/useUserDataAuth'
import { useJwt } from '../../hooks/useJwt'
import { ErrorRes, UserEntityRes } from 'types'
import { UserNameInputFields } from '../../components/form/UserNameFields/UserNameInputFields'

export const  AccountSettingsView = () => {
  const userData = useUserDataAuth();
  const jwt = useJwt();
  if(!userData) return null;

  const initialUserFormState: UserFormUpdate = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    newPassword: '',
    repeatNewPassword: '',
  };

  const appStore = useSelector((store: StoreType) => store.app);
  const dispatch = useDispatch();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [userForm, setUserForm] = useState<UserFormUpdate>(initialUserFormState);

  useEffect(() => {
    (async () => {
      if(isSubmit) {
        const data = await api<UserEntityRes | ErrorRes>(`http://localhost:3001/api/users/${userData.id}`, {
          method: HttpMethods.PATCH,
          payload: userForm,
          jwt,
        });

        if(data.status !== 200) setError((data.data as ErrorRes).error);
        else setError(undefined);

        setSubmitStatus(data.status);
        setIsSubmit(false);
      }
    })();

    if(submitStatus === 200) {
      dispatch(openAccountSettings({message: 'Pomyślnie zapisano'}));
      dispatch(setJwt(null));
    }
  }, [isSubmit, submitStatus]);

  const goBackHandler = () => {
    dispatch(openUser(undefined));
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(userForm.email !== userData.email || userForm.newPassword) {
      dispatch(openAccountSettingsConfirm(userForm));
    } else {
      setIsSubmit(true);
    }
  }

  return (
    <section className="AccountSettingsView">
      <UserMenuHeader title="Zarządzaj kontem" onClick={goBackHandler}/>

      <div className="AccountSettingsView__avatar">
        <UserAvatarBig/>
      </div>

      <form onSubmit={onSubmitHandler} className="AccountSettingsView__form">
        {error && <p className="AccountSettingsView__validation-error">{error}</p>}
        {
          (appStore.payload as InfoType)?.error
          && <p className="AccountSettingsView__validation-error">{(appStore.payload as InfoType).error}</p>
        }

        {
          (appStore.payload as InfoType)?.message
          && <p className="AccountSettingsView__message">{(appStore.payload as InfoType).message}</p>
        }

        <UserNameInputFields
          userForm={userForm}
          changeFormHandle={changeFormHandler}
        />

        <ShortTextInput
          label="Email:"
          placeholder="email"
          name="email"
          type="email"
          maxLength={255}
          minLength={3}
          value={userForm.email}
          onChange={changeFormHandler}
        />

        <br />
        <NewPasswordInputFields
          form={userForm}
          changeFormHandle={changeFormHandler}
        />

        <Button
          disabled={!(passwordValidation(userForm.newPassword) || !userForm.newPassword) || userForm.newPassword !== userForm.repeatNewPassword}
        >Zapisz</Button>
      </form>
    </section>
  );
}
