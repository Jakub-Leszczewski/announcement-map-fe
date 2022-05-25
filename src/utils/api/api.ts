import { HttpMethod } from './http-method'
import { Store } from '../../store'

interface ApiHandlerReturn {
  status: number | null;
  data: any;
}

interface Options {
  method?: HttpMethod;
  payload?: any;
  store?: Store;
  jwt?: string | null;
}

export const api = async (url: string, options?: Options): Promise<ApiHandlerReturn> => {
  try {
      const res = await fetch(url, {
        method: options?.method || HttpMethod.GET,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${options?.jwt || ''}`
        },
        body: options?.payload && JSON.stringify(options?.payload),
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
