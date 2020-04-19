import client from './api';

export const localStorageKey = 'statisch_token';

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiAuthResponse {
  token: string;
  user: object;
}

export function handleUserResponse({ token, user }: ApiAuthResponse) {
  localStorage.setItem(localStorageKey, token);

  return user;
}

export function getToken() {
  return localStorage.getItem(localStorageKey);
}


export function logout() {
  localStorage.removeItem(localStorageKey);
  return Promise.resolve();
}


export async function getUser() {
  const token = getToken();

  if (!token) {
    return Promise.resolve(null);
  }

  const user = await client('/api/me');

  console.log(user);

  if (user) {
    return user;
  }
  logout();
  return null;
}

export function login(loginData: LoginData) {
  try {
    return client('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(handleUserResponse)
      .catch((error) => {
        throw new Error(error);
      });
  } catch (e) {
    throw new Error(e);
  }
}
