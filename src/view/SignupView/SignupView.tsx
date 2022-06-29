import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './SignupView.css'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch } from 'react-redux'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { UserFormSignup } from '../../types/user-form'
import { CreateUserResponse, ErrorResponse } from 'types'
import { SignupForm } from '../../components/form/SignupForm/SignupForm'
import { openSignIn, openSignInChoice } from '../../store/slices/app-slice'

const initialUserFormState: UserFormSignup = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
}

export function SignupView() {
  const [form, setForm] = useState<UserFormSignup>(initialUserFormState);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if(submitStatus === 201) dispatch(openSignIn({
      message: 'Konto zostało pomyślnie utworzone.',
      error: null
    }));
  }, [submitStatus])

  const goBackHandler = () => {
    dispatch(openSignInChoice());
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await api<CreateUserResponse | ErrorResponse>('http://localhost:3001/api/user/', {
      method: HttpMethods.POST,
      payload: form,
    });


    if(data.status !== 201) setError((data.data as ErrorResponse)?.error || null);

    setSubmitStatus(data.status);
  }

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
