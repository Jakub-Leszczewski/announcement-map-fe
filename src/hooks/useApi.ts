import { useState, useEffect } from 'react';
import { api } from '../utils/api/api'
import { HttpMethods } from '../types/http-methods'

export const useApi = <T>(url: string, method?: HttpMethods, payload?: any): [boolean, number | null, T | undefined] => {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number | null>(null);
  const [data, setData] = useState<T | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const data = await api<T>(url,{method, payload})
      setLoading(false);
      setStatus(data.status);
      setData(data.data);
    })();
  }, []);

  return [loading, status, data as T];
}
