import React, { ChangeEvent, FormEvent, useEffect, useReducer, useState } from 'react'
import './SignupView.css'
import { Button } from '../../components/common/Button/Button'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { PasswordInputFields } from '../../components/form/PasswordInputFields/PasswordInputFields'
import { useDispatch } from 'react-redux'
import { openSignIn, openSignInChoice } from '../../store/slices/app-slice'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { Validation } from '../../utils/validation'
import { UserFormSignup } from '../../types/user-form'
import { UserEntityResponse, ErrorRes } from 'types'
import { UserNameInputFields } from '../../components/form/UserNameFields/UserNameInputFields'
import { ShortTextInput } from '../../components/common/ShortTextInput/ShortTextInput'

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
  const [userForm, setUserForm] = useState<UserFormSignup>(initialUserFormState);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if(isSubmit) {
        const data = await api<UserEntityResponse | ErrorRes>('http://localhost:3001/api/user/', {
          method: HttpMethods.POST,
          payload: userForm,
        });

        if(data.status !== 201) setError((data?.data as ErrorRes).error);

        setSubmitStatus(data.status);

        setIsSubmit(false);
      }
    })();

    if(submitStatus === 201) dispatch(openSignIn({message: 'Konto zostało pomyślnie utworzone.'}));
  }, [isSubmit]);

  const goBackHandler = () => {
    dispatch(openSignInChoice(undefined));
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
  }

  return (
    <section className="SignupView">
      <UserMenuHeader title="Rejestracja" onClick={goBackHandler}/>

      <form onSubmit={onSubmitHandler} className="SignupView__form">
        {error && <p className="SignupView__validation-error">{error}</p>}

        <UserNameInputFields
          userForm={userForm}
          changeFormHandle={changeFormHandler}
          required
        />

        <ShortTextInput
          label="Nazwa użytkownika:"
          placeholder="nazwa użytkownika"
          name="username"
          maxLength={60}
          minLength={3}
          required
          value={userForm.username}
          onChange={changeFormHandler}
        />

        <ShortTextInput
          label="Email:"
          placeholder="email"
          name="email"
          type="email"
          maxLength={255}
          minLength={3}
          required
          value={userForm.email}
          onChange={changeFormHandler}
        />

        <br />
        <PasswordInputFields
          form={userForm}
          changeFormHandle={changeFormHandler}
        />

        <Button
          disabled={userForm.password !== userForm.repeatPassword || !Validation.passwordValidation(userForm.password)}
        >Zarejestruj</Button>
      </form>
    </section>
  );
}
