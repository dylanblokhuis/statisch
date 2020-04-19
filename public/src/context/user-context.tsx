import { h, createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { IAuthContext, useAuth } from './auth-context';

const UserContext = createContext<IAuthContext | null>(null);

export function UserProvider({ children }: { children: any }) {
  const auth = useAuth();

  return (
    <UserContext.Provider value={auth}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    return { user: null };
  }

  if (context === null) {
    return { user: null };
  }

  return context;
}
