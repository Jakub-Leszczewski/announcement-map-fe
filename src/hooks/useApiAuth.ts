import { useState, useEffect } from 'react';
import { api } from '../utils/api/api'
import { HttpMethods } from '../types/http-methods'
import { useDispatch, useSelector } from 'react-redux'
import { setJwt } from '../store/slices/user-slice'
import { StoreType } from '../store'

export const useApiAuth = (url: string, method?: HttpMethods, payload?: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number | null>(null);
  const [data, setData] = useState<any>(undefined);
  const [newJwt, setNewJwt] = useState<string | null | undefined>(undefined);

  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => store.user);

  useEffect(() => {
    (async () => {
      const data = await api(url, {
        method,
        payload,
        jwt: userStore.jwt,
      });

      setLoading(false);
      setStatus(data.status);
      setData(data.data);
      data.newJwt !== undefined && setNewJwt(data.newJwt);
    })()
  }, [userStore.jwt]);

  useEffect(()=> {
    if(newJwt !== undefined) dispatch(setJwt(newJwt));
  }, [newJwt]);

  return [loading, status, data];
}
