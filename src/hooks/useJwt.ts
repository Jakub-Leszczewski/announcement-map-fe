import React, { useContext } from 'react'
import { AuthContext } from '../components/Auth/Auth'

export const useJwt = (): string | null => {
  const authContext = useContext(AuthContext);

  if(authContext && authContext.id && authContext.exp * 1000 > Date.now()) {
    return authContext.jwt;
  }

  return null;
}
