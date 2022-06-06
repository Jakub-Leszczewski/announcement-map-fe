import React, { ChangeEvent, FormEvent, useContext, useEffect, useReducer, useState } from 'react'
import './AccountSettingsConfirmView.css'
import { Button } from '../../components/common/Button/Button'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch, useSelector } from 'react-redux'
import { openAccountSettings, openUser } from '../../store/slices/app-slice'
import { UserAvatarBig } from '../../components/UserAvatarBig/UserAvatarBig'
import { StoreType } from '../../store'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { ConfirmPasswordInput } from '../../components/form/ConfirmPasswordInput/ConfirmPasswordInput'
import { UserForm } from '../../types/user-form'
import { setJwt } from '../../store/slices/user-slice'
import { useUserDataAuth } from '../../hooks/useUserDataAuth'
import { useJwt } from '../../hooks/useJwt'
import { ErrorRes, UserEntityRes } from 'types'


export const AccountSettingsConfirmView = () => {
  const jwt = useJwt();
  const userData = useUserDataAuth();

  const dispatch = useDispatch();
  const appStore = useSelector((store: StoreType) => store.app);

  const [password, setPassword] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  if(!userData) return null;

  useEffect(() => {
    (async () => {
      if(isSubmit && password) {
        const data = await api<UserEntityRes | ErrorRes>(`http://localhost:3001/api/users/${userData.id}`, {
          method: HttpMethods.PATCH,
          payload: { ...(appStore.payload as UserForm), password },
          jwt,
        });

        if(data.status === 401) setError((data.data as ErrorRes).error);
        if(data.status === 200) setError(undefined);
        else setError((data.data as ErrorRes).error);

        setSubmitStatus(data.status);
        setIsSubmit(false);
      }
    })();

    if(submitStatus === 200) {
      dispatch(setJwt(null));
      dispatch(openAccountSettings({ message: 'Pomyślnie zaktualizowano.' }));
    } else if (submitStatus && submitStatus !== 401) {
      dispatch(openAccountSettings({ error }))
    }
  }, [isSubmit, submitStatus]);

  const goBackHandler = () => {
    dispatch(openUser(undefined));
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
  }

  return (
    <section className="AccountSettingsConfirmView">
      <UserMenuHeader title="Weryfikacja" onClick={goBackHandler}/>

      <div className="AccountSettingsConfirmView__avatar">
        <UserAvatarBig/>
      </div>

      <form onSubmit={onSubmitHandler} className="AccountSettingsConfirmView__form">
        {error && <p className="AccountSettingsConfirmView__error">{error}</p>}

       <ConfirmPasswordInput
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)}
       />

        <Button disabled={!password}>Zapisz</Button>
      </form>
    </section>
  );
}
