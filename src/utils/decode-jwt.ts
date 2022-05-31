import jwtDecode from 'jwt-decode'
import { UserRole } from 'types';

export interface JwtData {
  id: string;
  role: UserRole;
  exp: number;
  iat: number;
}

export const decodeJwt = (jwt: any): JwtData | null => {
  try {
    return jwt ? jwtDecode(jwt) : null;
  } catch(err) {
    return null;
  }
}
