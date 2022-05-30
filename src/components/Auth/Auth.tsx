import React, { createContext, useEffect, useMemo, useState } from 'react'
import { UserEntityRes, UserRole } from 'types';
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '../../store';
import jwtDecode from 'jwt-decode';
import { auth } from '../../utils/api/auth'
import { setJwt } from '../../store/slices/user-slice'
import { api } from '../../utils/api/api'
import { apiAuth } from '../../utils/api/apiAuth'

interface Props {
  children: React.ReactNode;
}

interface JwtData {
  id: string;
  role: UserRole;
  exp: number;
  iat: number;
  jwt: null | string;
}

type UserContextData = UserEntityRes & JwtData;

const initialUserData: UserContextData = {
  id: '',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  avatar: '',
  role: UserRole.User,
  jwt: null,
  exp: 0,
  iat: 0,
}

export const AuthContext = createContext<UserContextData>(initialUserData)

export const Auth = ({children}: Props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => store.user);
  const [userData, setUserData] = useState<UserContextData>(initialUserData)

  const decodeJwt = (): JwtData => {
    if(userStore.jwt) return {
      ...jwtDecode (userStore.jwt),
      jwt: userStore.jwt,
    }

    return {
      id: '',
      role: UserRole.User,
      jwt: null,
      exp: 0,
      iat: 0,
    };
  }


  useEffect(() => {
      (async () => {
        if(!userStore.jwt) {
          const userAuth = await auth('http://localhost:3001/api/auth/token');

          if (userAuth.status === 200 && userAuth.jwt) {
            dispatch(setJwt(userAuth.jwt));
          } else {
            dispatch(setJwt(null));
            setUserData(initialUserData);
          }
        } else {
          const dataFromJwt = decodeJwt();
          const {status, data} = await apiAuth(`http://localhost:3001/api/users/${dataFromJwt.id}`, {
            jwt: dataFromJwt.jwt,
          });

          if(status === 200) {
            setUserData({
              ...dataFromJwt,
              id: data.id || '',
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              username: data.username || '',
              email: data.email || '',
              avatar: data.avatar || '',
              role: data.role || UserRole.User, })
          }
        }
      })();
  }, [userStore]);

  return(
    <AuthContext.Provider value={userData}>
      {children}
    </AuthContext.Provider>
  );
}
