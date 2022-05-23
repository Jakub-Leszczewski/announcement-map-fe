import React, { createContext, useEffect, useMemo, useState } from 'react'
import { UserForResData, UserRole } from 'types';
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '../../store';
import jwtDecode from 'jwt-decode';
import { auth } from '../../utils/api/auth'
import { setJwt } from '../../store/slices/user-slice'

interface Props {
  children: React.ReactNode;
}

const initialUser: UserForResData = {
  id: '',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  avatar: '',
  role: UserRole.User,
}

interface JWT extends UserForResData {
  exp: number;
  iat: number;
}

export const AuthContext = createContext<UserForResData>(initialUser)

export const Auth = ({children}: Props) => {
  const userStore = useSelector((store: StoreType) => store.user);

  const dataFromJwt = useMemo(() => {
    if(userStore.jwt) return jwtDecode(userStore.jwt) as JWT;

    return {
      ...initialUser,
      exp: 0,
      iat: 0,
    } as JWT;
  }, [userStore]);

  return(
    <AuthContext.Provider value={dataFromJwt}>
      {children}
    </AuthContext.Provider>
  );
}
