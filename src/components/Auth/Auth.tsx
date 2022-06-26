import React, { createContext, useEffect, useState } from 'react'
import { UserEntityResponse, UserRole } from 'types';
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

interface AuthContext extends UserEntityResponse, UserJwt{
  jwt: string | null;
  refreshUserHandler: () => Promise<void>;
  setJwtFromCode: (jwt: string) => void;
}

interface NotAuthContext{
  setJwtFromCode: (jwt: string) => void;
}

export const AuthContext = createContext<AuthContext | NotAuthContext | null>(null);

export const Auth = ({children}: Props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => store.user);

  const [newJwt, setNewJwt] = useState<string | null | undefined>(undefined);
  const [userData, setUserData] = useState<UserEntityResponse | null>(null);

  useEffect(() => {
    if(newJwt !== undefined) dispatch(setJwt(newJwt));
  }, [newJwt]);

  const decodedJwt = decodeJwt(userStore.jwt);

  const refreshUserHandler = async () => {
    if(userStore.jwt) {
      if (decodedJwt !== null) {
        const data = await api<UserEntityResponse>(`http://localhost:3001/api/user/${decodedJwt.id}`, {
          jwt: userStore.jwt,
        });

        if(data.status === 200 && data.newJwt) setNewJwt(data.newJwt);
        if(data.status === 200) setUserData(data.data as UserEntityResponse)
        else setUserData(null)
      }
    } else {
      const authData = await auth('http://localhost:3001/api/auth/token');

      if(authData.status === 200) setNewJwt(authData.jwt);
      else setNewJwt(null);
    }
  }

  const setJwtFromCode = (jwt: string) => {
    if(!decodedJwt || (decodedJwt && decodedJwt.exp * 1000 <= Date.now()))
    setNewJwt(jwt);
  }

  useEffect(() => {
    (async () => {
      await refreshUserHandler();
    })();
  }, [userStore]);

  return(
    <AuthContext.Provider
      value={
        (userData && decodedJwt && userStore.jwt)
          ? {
          ...userData,
            ...decodedJwt,
            jwt: userStore.jwt,
            refreshUserHandler,
            setJwtFromCode
        } as AuthContext
          : {
            setJwtFromCode
          }
      }
    >
      {children}
    </AuthContext.Provider>
  );
}
