import React, { useContext } from 'react'
import { AuthContext } from '../components/Auth/Auth'

export const useSetJwt = (): ((jwt: string) => void) | null => {
  const authContext = useContext(AuthContext);

  if(authContext && authContext.setJwtFromCode) {
    return authContext.setJwtFromCode
  }

  return null;
}
