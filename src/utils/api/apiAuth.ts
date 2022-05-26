import { HttpMethod } from './http-method'
import { Store } from '../../store'
import { auth } from './auth'

interface ApiHandlerReturn {
  status: number | null;
  data: any;
  newJwt: string | null;
}

interface Options {
  method?: HttpMethod;
  payload?: any;
  store?: Store;
  jwt?: string | null;
}

export const apiAuth = async (url: string, options?: Options): Promise<ApiHandlerReturn> => {
  const apiCall = async (jwt?: string) => {
    const res = await fetch(url, {
      method: options?.method || HttpMethod.GET,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt || options?.jwt || ''}`
      },
      body: options?.payload && JSON.stringify(options?.payload),
      credentials: 'include',
    });

    const data = await res.json();

    return {
      status: res.status || null,
      data: data || undefined,
    }
  }

  const data = await apiCall(options?.jwt || '');
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
    newJwt: null,
  }
}
