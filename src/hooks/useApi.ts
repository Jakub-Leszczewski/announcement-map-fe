import { useState, useEffect } from 'react';
import { api } from '../utils/api/api'
import { HttpMethods } from '../types/http-methods'
import { ErrorResponse } from 'types';

type Data<T> = T | ErrorResponse | null;

export const useApi = <T>(url: string, method?: HttpMethods, payload?: any): [boolean, number | null, Data<T>] => {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number | null>(null);
  const [data, setData] = useState<T | ErrorResponse | null>(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await api<T>(url,{method, payload})
      setLoading(false);
      setStatus(data.status);
      setData(data.data);
    })();
  }, [url, method, payload]);

  return [loading, status, data];
}
