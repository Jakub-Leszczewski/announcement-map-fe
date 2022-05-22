import { HttpMethod } from './http-method'
import { Store } from '../../store'
import { authHandler } from './auth-handler'

interface ApiHandlerReturn {
  status: number;
  data: any;
  newJwt: string | null;
}

interface ApiHandlerParams {
  url: string;
  method?: HttpMethod;
  payload?: any;
  store?: Store;
  jwt?: string;
}

export const apiHandler = async ({
  url,
  method = HttpMethod.GET,
  payload,
  store,
  jwt
}: ApiHandlerParams): Promise<ApiHandlerReturn> => {
  const fetchData = async (jwt: string) => {
    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });
    const data = await res.json();

    return {
      status: res.status,
      data: data ?? null,
    }
  }

  const data = await fetchData(jwt || '');

  if(data.status === 401) {
    const authData = await authHandler('http://localhost:3001/api/auth/token');

    if(authData.status === 401) {
      return {
        status: authData.status,
        data: undefined,
        newJwt: null,
      }
    } else {
      const data = await fetchData(authData.jwt || '');
      return {
        ...data,
        newJwt: authData.jwt,
      }
    }
  } else {
    return {
      status: data.status,
      data: data.data,
      newJwt: null,
    }
  }
}
