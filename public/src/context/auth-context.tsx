import { h, createContext } from 'preact';
import { useState, useLayoutEffect, useContext } from 'preact/hooks';
import { useAsync } from 'react-async';

import * as authService from '../services/auth';
import LoadingSpinner from '../components/loading-spinner';
import { IUser } from '../types';

export interface IAuthContext {
  user: IUser | string;
  login: { (form: authService.LoginData): any };
  logout: { (): any };
}

const AuthContext = createContext<IAuthContext>({
  user: '',
  login: (form: authService.LoginData) => authService.login(form),
  logout: () => authService.logout(),
});

export function AuthProvider({ children } : { children: any }) {
  const [firstAttemptFinished, setFirstAttemptFinished] = useState(false);

  const {
    data = { user: null },
    error,
    isRejected,
    isPending,
    isSettled,
  } = useAsync({
    promiseFn: authService.getUser,
  });

  useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    if (isPending) {
      return <LoadingSpinner />;
    }

    if (isRejected && error) {
      return (
        <div>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      );
    }

    if (isRejected) {
      return (
        <div>
          <p>Rejected</p>
        </div>
      );
    }
  }

  return (
    <AuthContext.Provider value={{
      user: data, login: authService.login, logout: authService.logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
