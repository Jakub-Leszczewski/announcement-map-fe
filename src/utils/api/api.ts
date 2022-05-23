import { HttpMethod } from './http-method'
import { Store } from '../../store'

interface ApiHandlerReturn {
  status: number | null;
  data: any;
}

interface ApiHandlerParams {
  url: string;
  method?: HttpMethod;
  payload?: any;
  store?: Store;
  jwt?: string;
}

export const api = async ({
  url,
  method = HttpMethod.GET,
  payload,
  jwt
}: ApiHandlerParams): Promise<ApiHandlerReturn> => {
  try {
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
      status: res.status || null,
      data: data || undefined,
    }
  } catch (err) {
    console.log(err);

    return {
      status: null,
      data: undefined,
    }
  }
}
