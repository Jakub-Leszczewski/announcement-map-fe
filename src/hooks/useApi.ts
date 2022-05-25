import { useState, useEffect } from 'react';
import { api } from '../utils/api/api'
import { HttpMethod } from '../utils/api/http-method'

export const useApi = (url: string, method?: HttpMethod, payload?: any) => {
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
