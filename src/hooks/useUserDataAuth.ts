import React, { useContext } from 'react'
import { UserEntityRes } from 'types';
import { AuthContext } from '../components/Auth/Auth'

export const useUserDataAuth = (): UserEntityRes | null => {
  const authContext = useContext(AuthContext);

  if (authContext && authContext.id && authContext.exp * 1000 > Date.now()) {
    return {
      id: authContext.id,
      firstName: authContext.firstName,
      lastName: authContext.lastName,
      username: authContext.username,
      email: authContext.email,
      role: authContext.role,
      avatar: authContext.avatar
    }
  } else return null;
}
