import React, { createContext, useEffect, useState } from 'react'
import { ErrorRes, UserEntityRes, UserRole } from 'types';
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '../../store';
import { auth } from '../../utils/api/auth'
import { setJwt } from '../../store/slices/user-slice'
import { decodeJwt } from '../../utils/decode-jwt'
import { api } from '../../utils/api/api'

interface Props {
  children: React.ReactNode;
}

interface UserJwt {
  id: string,
  role: UserRole,
  exp: number;
  iat: number;
}

interface UserAuthData extends UserEntityRes, UserJwt{
  jwt: string | null;
}

export const AuthContext = createContext<UserAuthData | null>(null);

export const Auth = ({children}: Props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => store.user);

  const [newJwt, setNewJwt] = useState<string | null | undefined>(undefined);
  const [userData, setUserData] = useState<UserEntityRes | undefined>(undefined);

  const decodedJwt = decodeJwt(userStore.jwt);
  useEffect(() => {
    (async () => {
      if(userStore.jwt) {
        if (decodedJwt !== null) {
          const data = await api<UserEntityRes | ErrorRes>(`http://localhost:3001/api/users/${decodedJwt.id}`, {
            jwt: userStore.jwt,
          });

          setUserData(!(data.data as ErrorRes)?.error ? (data.data as UserEntityRes) : undefined);
          setNewJwt(data.newJwt);
        }
      } else {
        const authData = await auth('http://localhost:3001/api/auth/token');

        if(authData.status === 200) setNewJwt(authData.jwt);
        else setNewJwt(null);
      }
    })();
  }, [userStore]);

  useEffect(() => {
    if(newJwt !== undefined) dispatch(setJwt(newJwt));
  }, [newJwt]);

  return(
    <AuthContext.Provider value={
      !(userData && decodedJwt && userStore.jwt)
        ? null
        : {...userData, ...decodedJwt, jwt: userStore.jwt} as UserAuthData}
    >
      {children}
    </AuthContext.Provider>
  );
}
