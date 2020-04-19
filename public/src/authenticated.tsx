import { h } from 'preact';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Suspense } from 'preact/compat';

import Home from './pages/home';
import Header from './components/header';
import DomainRoutes from './pages/domains';
import GitRoutes from './pages/git';
import LoadingSpinner from './components/loading-spinner';

function Authenticated() {
  return (
    <Router>
      <Header />

      <div className="container">
        <Switch>
          {DomainRoutes.map((route) => (
            <Route exact path={route.path}>
              <Suspense fallback={<LoadingSpinner />}>
                <route.component />
              </Suspense>
            </Route>
          ))}

          {GitRoutes.map((route) => (
            <Route exact path={route.path}>
              <Suspense fallback={<LoadingSpinner />}>
                <route.component />
              </Suspense>
            </Route>
          ))}

          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Authenticated;
