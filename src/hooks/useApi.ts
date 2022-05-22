import { useState, useEffect } from 'react';
import { apiHandler } from '../utils/api/api-handler'
import { HttpMethod } from '../utils/api/http-method'
import { useDispatch, useSelector } from 'react-redux'
import { setJwt } from '../store/slices/user-slice'
import { StoreType } from '../store'

export const useApi = (url: string, method?: HttpMethod, payload?: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number | null>(null);
  const [data, setData] = useState<any>(undefined);
  const [newJwt, setNewJwt] = useState<string | null>(null);

  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => store.user);

  useEffect(() => {
    (async () => {
      const data = await apiHandler({url, method, payload, jwt: userStore.jwt})
      setLoading(false);
      setStatus(data.status);
      setData(data.data);
      setNewJwt(data.newJwt);
    })();
  }, []);

  useEffect(()=> {
    if(newJwt) dispatch(setJwt(newJwt));
  }, [newJwt]);

  return [loading, status, data];
}
