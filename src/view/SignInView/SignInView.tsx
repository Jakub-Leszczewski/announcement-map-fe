import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './SignInView.css';
import { Button } from '../../components/common/Button/Button';
import { ShortTextInput } from '../../components/common/ShortTextInput/ShortTextInput'
import { PasswordInput } from '../../components/common/PasswordInput/PasswordInput'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch, useSelector } from 'react-redux'
import { openSignInChoice } from '../../store/slices/app-slice'
import { auth } from '../../utils/api/auth'
import { setJwt } from '../../store/slices/user-slice'
import { StoreType } from '../../store'
import { InfoType } from '../../types/info-types'
import { UserFormSignIn } from '../../types/user-form'


const initialSignInFormState: UserFormSignIn= {
  username: '',
  password: '',
}

export const SignInView = () => {
  const appStore = useSelector((store: StoreType) => store.app);
  const dispatch = useDispatch();

  const [userForm, setUserForm] = useState<UserFormSignIn>(initialSignInFormState);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newJwt, setNewJwt] = useState<string | null>(null);

  useEffect(() => {
    if(isSubmit) {
      (async () => {
        const authData = await auth('http://localhost:3001/api/auth/signin', userForm.username, userForm.password);
        setError(authData.error === "Incorrect username or password." ? "Błędny login lub hasło." : authData.error);
        setIsSubmit(false);

        if(authData.status === 200 && authData.jwt) setNewJwt(authData.jwt)
      })();
    }

    if(newJwt !== null) dispatch(setJwt(newJwt));
  }, [isSubmit, newJwt])

  const goBackHandler = () => {
    dispatch(openSignInChoice(undefined));
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmit(true);
  }

  return(
    <section className="SignInView">
      <UserMenuHeader title="Logowanie" onClick={goBackHandler}/>

      <form className="SignInView__form" onSubmit={submitHandler}>
        {error && <p className="SignInView__error">{error}</p>}
        {(appStore.payload as InfoType)?.message
          && <p className="SignInView__message">{(appStore.payload as InfoType).message}</p>
        }

        <ShortTextInput
          label="Nazwa użytkownika:"
          placeholder="nazwa użytkownika"
          name="username"
          maxLength={60}
          minLength={3}
          value={userForm.username}
          onChange={changeFormHandler}
        />

        <PasswordInput
          label="Hasło:"
          placeholder="hasło"
          name="password"
          value={userForm.password}
          onChange={changeFormHandler}
        />

        <Button width="100%" height={30} borderRadius="15px">Zaloguj się</Button>
      </form>
    </section>
  );
}
