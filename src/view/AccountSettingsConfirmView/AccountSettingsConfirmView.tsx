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
import { ConfirmPassword } from '../../components/ConfirmPassword/ConfirmPassword'
import { UserForm } from '../../types/user-form'
import { setJwt } from '../../store/slices/user-slice'


export const AccountSettingsConfirmView = () => {
  const userStore = useSelector((store: StoreType) => store.user);
  const appStore = useSelector((store: StoreType) => store.app);
  const dispatch = useDispatch();

  const [password, setPassword] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if(isSubmit && password) {
        const data = await api(`http://localhost:3001/api/users/${userStore.user?.id}`, {
          method: HttpMethods.PATCH,
          payload: { ...(appStore.payload as UserForm), password },
          jwt: userStore.jwt
        });

        if(data.status === 401) setError(data.data.error);
        else if(data.status !== 200) dispatch(openAccountSettings({ error: data.data.error }));
        else {
          dispatch(openAccountSettings({ message: 'Pomyślnie zaktualizowano.' }));
          dispatch(setJwt(null));
        }

        setIsSubmit(false);
      }
    })();
  }, [isSubmit])

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

       <ConfirmPassword
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)}
       />

        <Button
          width="100%"
          height={30}
          borderRadius="15px"
          disabled={!password}
        >Zapisz</Button>
      </form>
    </section>
  );
}
