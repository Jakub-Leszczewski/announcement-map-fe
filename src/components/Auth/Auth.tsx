import React, { useEffect, useState } from 'react'
import { UserEntityRes } from 'types';
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '../../store';
import { auth } from '../../utils/api/auth'
import { setJwt, setUser } from '../../store/slices/user-slice'
import { api } from '../../utils/api/api'
import { decodeJwt } from '../../utils/decode-jwt'

interface Props {
  children: React.ReactNode;
}

export const Auth = ({children}: Props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => store.user);
  const [newJwt, setNewJwt] = useState<string | null | undefined>(undefined);
  const [userData, setUserData] = useState<UserEntityRes | null>(null);

  const apiCall = async (id: string) => {
    const data = await api(`http://localhost:3001/api/users/${id}`);
    if(data.newJwt) setNewJwt(data.newJwt);
    if(data.status === 200) {
      setUserData(data.data);
      setNewJwt(data.newJwt);
    }
  }

 useEffect(()=> {
   (async () => {
     const decodedJwt = decodeJwt(userStore.jwt);

     if (decodedJwt && decodedJwt.exp * 1000 > Date.now() + 5000) {
       await apiCall(decodedJwt.id);
     } else {
       const authData = await auth('http://localhost:3001/api/auth/token');

       if(authData.status === 200) setNewJwt(authData.jwt);
       else {
         setNewJwt(null);
         setUserData(null);
       };
     }
   })();
 }, [userStore.jwt]);

 useEffect(() => {
   if(newJwt !== undefined) dispatch(setJwt(newJwt));
   dispatch(setUser(userData));
 }, [newJwt, userData]);

  return(
    <>
      {children}
    </>
  );
}
