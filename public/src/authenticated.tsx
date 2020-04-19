import { h } from 'preact';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Domains from './pages/domains';
import Home from './pages/home';
import Header from './components/header';

function Authenticated() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/domains">
          <Domains />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default Authenticated;
