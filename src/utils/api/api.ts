import { HttpMethods } from '../../types/http-methods'
import { auth } from './auth'
import { decodeJwt } from '../decode-jwt'
import { ErrorResponse } from 'types';

interface ApiHandlerReturn<T> {
  status: number | null;
  data: T | ErrorResponse | null;
  newJwt: string | null | undefined;
}

interface Options {
  method?: HttpMethods;
  payload?: any;
  jwt?: string | null;
}

export const api = async <T>(url: string, options?: Options): Promise<ApiHandlerReturn<T>> => {
  const apiCall = async (jwt?: string): Promise<ApiHandlerReturn<T>> => {
    const res = await fetch(url, {
      method: options?.method || HttpMethods.GET,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt || options?.jwt || ''}`
      },
      body: options?.payload && JSON.stringify(options.payload),
      credentials: 'include',
    });

    const data = await res.json();

    return {
      status: res.status,
      data: data as T,
      newJwt: undefined,
    }
  }

  const apiCallWithAuthRefresh = async (jwt: string): Promise<ApiHandlerReturn<T>> => {
    const data = await apiCall(jwt || '');
    if(data.status === 401) {
      const authData = await auth('http://localhost:3001/api/auth/token');

      if(authData.status === 200) {
        const data = await apiCall(authData.jwt || '');

        return {
          status: data.status,
          data: data.data,
          newJwt: authData.jwt,
        }
      }
    }

    return {
      status: data.status,
      data: data.data,
      newJwt: undefined
    }
  }

  try {
    if(options?.jwt === undefined) return apiCall();

    const decodedJwt = decodeJwt(options?.jwt);
    if(decodedJwt && decodedJwt.exp * 1000 > Date.now() + 5000) return apiCallWithAuthRefresh(options?.jwt as string);
    else {
      const authData = await auth('http://localhost:3001/api/auth/token');
      if(authData.status === 200) {
        const data = await apiCall(authData.jwt as string);
        return {
          status: data.status,
          data: data.data,
          newJwt: authData.jwt,
        }
      }

      return {
        status: authData.status,
        data: authData.error ? { error: authData.error } : null,
        newJwt: null,
      }
    }
  } catch(err) {
    console.log(err);

    return {
      status: null,
      data: null,
      newJwt: undefined,
    }
  }
}
