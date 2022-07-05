import React, { useContext } from 'react'
import { AuthContext } from '../components/Auth/Auth'

export const useRefreshUser = () => {
  const authContext = useContext(AuthContext);

  if (authContext && 'id' in authContext) return authContext.refreshUserHandler;
  else return null;
}
