import { useState, useEffect } from 'react';
import { api } from '../utils/api/api'
import { HttpMethod } from '../utils/api/http-method'
import { useDispatch, useSelector } from 'react-redux'
import { setJwt } from '../store/slices/user-slice'
import { StoreType } from '../store'
import jwtDecode from 'jwt-decode'
import { auth } from '../utils/api/auth'

export const useApi = (url: string, method?: HttpMethod, payload?: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number | null>(null);
  const [data, setData] = useState<any>(undefined);
  const [newJwt, setNewJwt] = useState<string | null>(null);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => store.user);

  const userJwt = userStore.jwt ? jwtDecode(userStore.jwt) : '';

  const apiCall = async (jwt: string) => {
    const data = await api({url, method, payload, jwt})
    setLoading(false);
    setStatus(data.status);
    setData(data.data);

    return data.status;
  }

  useEffect(() => {
    (async () => {
      if(userJwt && (userJwt as any).exp > Date.now() + 10000 && !isRefresh) {
        const status = await apiCall(userStore.jwt);

        if(status === 401) {
          setIsRefresh(true);
        }
      }
      else {
        const authData = await auth('http://localhost:3001/api/auth/token');
        setNewJwt(authData.jwt);

        if(authData.jwt)
        await apiCall(authData.jwt);
      }
    })();
  }, [isRefresh]);

  useEffect(()=> {
    if(newJwt) dispatch(setJwt(newJwt));
  }, [newJwt]);

  return [loading, status, data];
}
