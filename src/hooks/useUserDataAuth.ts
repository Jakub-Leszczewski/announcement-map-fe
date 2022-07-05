import React, { useContext } from 'react'
import { GetUserResponse } from 'types';
import { AuthContext } from '../components/Auth/Auth'

export const useUserDataAuth = (): GetUserResponse | null => {
  const authContext = useContext(AuthContext);

  if (authContext && 'id' in authContext) {
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
