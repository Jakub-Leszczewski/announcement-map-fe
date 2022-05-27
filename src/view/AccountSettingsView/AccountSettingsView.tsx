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
import { AuthContext } from '../../components/Auth/Auth'
import { NewPasswordFields } from '../../components/NewPasswordFields/NewPasswordFields'
import { apiAuth } from '../../utils/api/apiAuth'
import { HttpMethod } from '../../utils/api/http-method'
import { passwordValidation } from '../../utils/validation'
import { StoreType } from '../../store'

export function AccountSettingsView() {
  const context = useContext(AuthContext);
  const initialUserFormState: UserFormState = {
    firstName: context.firstName || '',
    lastName: context.lastName || '',
    username: context.username || '',
    email: context.email || '',
    newPassword: '',
    repeatNewPassword: '',
  }

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [userForm, dispatch] = useReducer<React.Reducer<UserFormState, Action>>(accountSettingsFormReducer, initialUserFormState);
  const appStore = useSelector((store: StoreType) => store.app);
  const dispatchStore = useDispatch();

  useEffect(() => {
    (async () => {
      if(isSubmit) {
        const data = await apiAuth(`http://localhost:3001/api/users/${context.id}`, {
          method: HttpMethod.PATCH,
          payload: userForm,
          jwt: context.jwt
        });

        if(data.status !== 200) setError(data.data.error);
        else setError(undefined);

        setIsSubmit(false);
      }
    })();
  }, [isSubmit]);

  const goBackHandler = () => {
    dispatchStore(openUser(undefined));
  }

  const changeFormHandle = (action: Action) => {
    dispatch(action);
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(userForm.email !== context.email || userForm.newPassword) {
      dispatchStore(openAccountSettingsConfirm(userForm));
    } else {
      setIsSubmit(true);
    }
  }

  return (
    <section className="SignupView">
      <UserMenuHeader title="Zarządzaj kontem" onClick={goBackHandler}/>

      <div className="UserView__avatar">
        <UserAvatarBig/>
      </div>

      <form onSubmit={onSubmitHandler} className="SignupView__form">
        {error && <p className="SignupView__validation-error">{error}</p>}
        {appStore.payload?.error && <p className="SignupView__validation-error">{appStore.payload.error}</p>}
        {appStore.payload?.message && <p className="SignupView__validation-error">{appStore.payload.message}</p>}

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
          disabled={!passwordValidation(userForm.newPassword) || userForm.newPassword !== userForm.repeatNewPassword}
        >Zapisz</Button>
      </form>
    </section>
  );
}
