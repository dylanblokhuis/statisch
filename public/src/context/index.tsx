import { h } from 'preact';
import { AuthProvider } from './auth-context';
import { UserProvider } from './user-context';

function AppProviders({ children }: { children: any }) {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
}

export default AppProviders;
