import { h } from 'preact';
import { Suspense } from 'preact/compat';

import LoadingSpinner from './components/loading-spinner';
import Authenticated from './authenticated';
import Unauthenticated from './unauthenticated';
import Theme from './theme';
import { useUser } from './context/user-context';

function App() {
  const { user } = useUser();

  return (
    <Theme>
      <Suspense fallback={<LoadingSpinner />}>
        {user ? <Authenticated /> : <Unauthenticated />}
      </Suspense>
    </Theme>
  );
}

export default App;
