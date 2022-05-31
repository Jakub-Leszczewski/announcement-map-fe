import React, { FormEvent, useContext, useEffect, useReducer, useState } from 'react'
import './AccountSettingsView.css'
import { Button } from '../../components/common/Button/Button'
import { ShortTextInput } from '../../components/common/ShortTextInput/ShortTextInput'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { accountSettingsFormReducer, Action, UserFormState } from './account-settings-form-reducer'
import { ActionType } from './action-type'
import { useDispatch, useSelector } from 'react-redux'
import { openAccountSettings, openAccountSettingsConfirm, openUser } from '../../store/slices/app-slice'
import { UserAvatarBig } from '../../components/UserAvatarBig/UserAvatarBig'
import { NewPasswordFields } from '../../components/NewPasswordFields/NewPasswordFields'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { passwordValidation } from '../../utils/validation'
import { StoreType } from '../../store'
import { setJwt } from '../../store/slices/user-slice'
import { InfoType } from '../../types/info-types'

export const  AccountSettingsView = () => {
  const appStore = useSelector((store: StoreType) => store.app);
  const userStore = useSelector((store: StoreType) => store.user);
  const dispatch = useDispatch();
  const initialUserFormState: UserFormState = {
    firstName: userStore.user?.firstName || '',
    lastName: userStore.user?.lastName || '',
    username: userStore.user?.username || '',
    email: userStore.user?.email || '',
    newPassword: '',
    repeatNewPassword: '',
  };

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [userForm, dispatchForm] = useReducer<React.Reducer<UserFormState, Action>>(accountSettingsFormReducer, initialUserFormState);

  useEffect(() => {
    (async () => {
      if(isSubmit) {
        const data = await api(`http://localhost:3001/api/users/${userStore.user?.id}`, {
          method: HttpMethods.PATCH,
          payload: userForm,
          jwt: userStore.jwt
        });

        if(data.status !== 200) setError(data.data.error);
        else {
          setError(undefined);
          dispatch(openAccountSettings({message: 'Pomyślnie zapisano'}));
          dispatch(setJwt(null));
        }

        setIsSubmit(false);
      }
    })();
  }, [isSubmit]);

  const goBackHandler = () => {
    dispatch(openUser(undefined));
  }

  const changeFormHandle = (action: Action) => {
    dispatchForm(action);
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(userForm.email !== userStore.user?.email || userForm.newPassword) {
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

        <ShortTextInput
          placeholder="imie"
          maxLength={60}
          minLength={3}
          required
          value={userForm.firstName}
          onChange={(e) => {
            changeFormHandle({type: ActionType.CHANGE_FIRST_NAME, payload: e.target.value})
          }}
        />
        <ShortTextInput
          placeholder="nazwisko"
          maxLength={60}
          minLength={3}
          required
          value={userForm.lastName}
          onChange={(e) => {
            changeFormHandle({type: ActionType.CHANGE_LAST_NAME, payload: e.target.value})
          }}
        />
        <ShortTextInput
          placeholder="email"
          email
          maxLength={255}
          minLength={3}
          required
          value={userForm.email}
          onChange={(e) => {
            changeFormHandle({type: ActionType.CHANGE_EMAIL, payload: e.target.value})
          }}
        />

        <br />
        <NewPasswordFields
          userForm={userForm}
          changeFormHandle={changeFormHandle}
        />

        <Button
          width="100%"
          height={30}
          borderRadius="15px"
          disabled={!(passwordValidation(userForm.newPassword) || !userForm.newPassword) || userForm.newPassword !== userForm.repeatNewPassword}
        >Zapisz</Button>
      </form>
    </section>
  );
}
