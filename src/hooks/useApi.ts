import { useState, useEffect } from 'react';
import { api } from '../utils/api/api'
import { HttpMethods } from '../types/http-methods'

export const useApi = (url: string, method?: HttpMethods, payload?: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number | null>(null);
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const data = await api(url,{method, payload})
      setLoading(false);
      setStatus(data.status);
      setData(data.data);
    })();
  }, []);

  return [loading, status, data];
}
