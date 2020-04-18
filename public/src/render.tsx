import { h, render } from 'preact';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

import Theme from './theme';
import Home from './pages/home';
import Domains from './pages/domains';
import Header from './components/header';

function Render() {
  return (
    <Theme>
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
    </Theme>
  );
}

const rootElement = document.getElementById('___statisch');
if (rootElement) render(<Render />, rootElement);
