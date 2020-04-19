import { h, render } from 'preact';
import 'bootstrap/dist/css/bootstrap.css';

import AppProviders from './context';
import App from './app';

function Render() {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
}

const rootElement = document.getElementById('___statisch');
if (rootElement) render(<Render />, rootElement);
