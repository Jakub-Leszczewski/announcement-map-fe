import { HttpMethod } from './http-method'
import { Store } from '../../store'
import { setJwt } from '../../store/slices/user-slice'

interface AuthHandlerOverload {
  /*
  * hello
  * */
  (url: string): Promise<AuthHandlerReturn>;
  (url: string, username: string, password: string): Promise<AuthHandlerReturn>;
  (url: string, username: string, password: string, store: Store): Promise<AuthHandlerReturn>;
}

interface AuthHandlerReturn {
  status: number | null;
  jwt: string | null;
}

export const authHandler:AuthHandlerOverload = async (url, username?, password?, store?) => {
  const isSignIn = username && password;
  const fetchAuth = async (): Promise<AuthHandlerReturn> => {
    const res = await fetch(url, {
      method: isSignIn ? HttpMethod.POST : HttpMethod.GET,
      headers: {
        'Content-Type': 'application/json',
      },
      body: isSignIn ? JSON.stringify({
        username,
        password,
      }) : undefined,
      credentials: 'include',
    });

    const data = await res.json();

    return {
      status: res.status,
      jwt: data.token || null,
    }
  }

  return await fetchAuth();
}
