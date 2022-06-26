import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './SignupView.css'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch } from 'react-redux'
import { openWindow, Window } from '../../store/slices/app-slice'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { UserFormSignup } from '../../types/user-form'
import { UserEntityResponse, ErrorResponse } from 'types'
import { SignupForm } from '../../components/form/SignupForm/SignupForm'

const initialUserFormState: UserFormSignup = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
}

export function SignupView() {
  const dispatch = useDispatch();
  const [form, setForm] = useState<UserFormSignup>(initialUserFormState);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const goBackHandler = () => {
    dispatch(openWindow({
      openWindow: Window.OPEN_SIGN_IN_CHOICE,
      data: undefined,
    }));
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await api<UserEntityResponse | ErrorResponse>('http://localhost:3001/api/user/', {
      method: HttpMethods.POST,
      payload: form,
    });

    if(data.status !== 201 && data.data && 'error' in data.data) setError(data.data.error);
    else setError(null);

    setSubmitStatus(data.status);
  }

  useEffect(() => {
    if(submitStatus === 201) dispatch(openWindow({
      openWindow: Window.OPEN_SIGN_IN,
      data: {message: 'Konto zostało pomyślnie utworzone.', error: null},
    }));
  }, [submitStatus])

  return (
    <section className="SignupView">
      {error && <p className="SignupForm__error">{error}</p>}
      <UserMenuHeader title="Rejestracja" onClick={goBackHandler}/>
      <SignupForm
        form={form}
        changeFormHandler={changeFormHandler}
        onSubmitHandler={onSubmitHandler}
      />
    </section>
  );
}
