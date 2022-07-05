import { useState, useEffect } from 'react';
import { api } from '../utils/api/api'
import { HttpMethods } from '../types/http-methods'
import { useDispatch, useSelector } from 'react-redux'
import { setJwt } from '../store/slices/user-slice'
import { StoreType } from '../store'
import { ErrorResponse } from 'types';
type data<T> = T | ErrorResponse | null;

export const useApiAuth = <T>(
  url: string,
  method?: HttpMethods,
  payload?: any
): [boolean, number | null, data<T>] => {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number | null>(null);
  const [data, setData] = useState<data<T>>(null);
  const [newJwt, setNewJwt] = useState<string | null | undefined>(undefined);

  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => store.user);

  useEffect(() => {
    (async () => {
      const data = await api<T>(url, {
        method,
        payload,
        jwt: userStore.jwt,
      });

      setLoading(false);
      setStatus(data.status);
      setData(data.data);
      if(data.newJwt !== undefined) setNewJwt(data.newJwt);
    })()
  }, [userStore.jwt]);

  useEffect(()=> {
    if(newJwt !== undefined ) {
      dispatch(setJwt(newJwt));
    }
  }, [newJwt]);

  return [loading, status, data];
}
