import React, { useContext } from 'react'
import { UserEntityResponse } from 'types';
import { AuthContext } from '../components/Auth/Auth'

export const useRefreshUser = () => {
  const authContext = useContext(AuthContext);

  if (authContext && authContext.id && authContext.exp * 1000 > Date.now()) return authContext.refreshUserHandler;
  else return null;
}
