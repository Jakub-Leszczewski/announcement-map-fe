import { HttpMethods } from '../../types/http-methods'

interface AuthHandlerReturn {
  status: number | null;
  jwt: string | null;
  error: string | null;
}

interface AuthHandlerOverload {
  (url: string): Promise<AuthHandlerReturn>;
  (url: string, username: string, password: string): Promise<AuthHandlerReturn>;
}

export const auth:AuthHandlerOverload = async (url, username?, password?): Promise<AuthHandlerReturn> => {
  const isSignIn = username && password;

  try {
    const res = await fetch(url, {
      method: isSignIn ? HttpMethods.POST : HttpMethods.GET,
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
      error: data.error || null,
    }
  } catch (err) {
    console.log(err);

    return {
      status: null,
      jwt: null,
      error: null,
    }
  }
}
