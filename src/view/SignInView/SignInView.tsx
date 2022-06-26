import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './SignInView.css'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../utils/api/auth'
import { StoreType } from '../../store'
import { UserFormSignIn } from '../../types/user-form'
import { SignInForm } from '../../components/form/SignInForm/SignInForm'
import { openNone, openSignInChoice } from '../../store/slices/app-slice'
import { useSetJwt } from '../../hooks/useSetJwt'

const initialSignInFormState: UserFormSignIn= {
  username: '',
  password: '',
}

export const SignInView = () => {
  const setJwt = useSetJwt();

  if(!setJwt) return null;

  const appStore = useSelector((store: StoreType) => store.app);
  const dispatch = useDispatch();

  const [form, setForm] = useState<UserFormSignIn>(initialSignInFormState);
  const [error, setError] = useState<string | null>(null);
  const [newJwt, setNewJwt] = useState<string | null>(null);

  useEffect(() => {
    if(newJwt) {
      setJwt(newJwt);
      dispatch(openNone());
    }
  }, [newJwt])

  const goBackHandler = () => {
    dispatch(openSignInChoice());
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setNewJwt(null);
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authData = await auth('http://localhost:3001/api/auth/signin', {
      username: form.username,
      password: form.password,
    });

    if(authData.status === 200 && authData.jwt) {
      setError(null);
      setNewJwt(authData.jwt);
    } else setError(authData.error);
  }

  return(
    <section className="SignInView">
      <UserMenuHeader title="Logowanie" onClick={goBackHandler}/>

      {
        appStore.signInPayload.message &&
        <p className="SignInView__message">{appStore.signInPayload.message}</p>
      }

      {
        error &&
        <p className="SignInView__error">
          {error === "Incorrect username or password." ? "Błędny login lub hasło." : error}
        </p>
      }

      <SignInForm
        form={form}
        changeFormHandler={changeFormHandler}
        onSubmitHandler={onSubmitHandler}
      />
    </section>
  );
}
