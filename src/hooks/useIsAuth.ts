import React, { useContext } from 'react'
import { AuthContext } from '../components/Auth/Auth'

export const useIsAuth = (): boolean => {
  const authContext = useContext(AuthContext);

  return !!(authContext && 'id' in authContext && authContext.exp * 1000 > Date.now());
}
