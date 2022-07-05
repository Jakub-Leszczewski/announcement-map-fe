import { useContext } from 'react'
import { AuthContext } from '../components/Auth/Auth'

export const useJwt = (): string | null => {
  const authContext = useContext(AuthContext);

  if(authContext && 'id' in authContext && authContext.exp * 1000 > Date.now()) {
    return authContext.jwt;
  }

  return null;
}
