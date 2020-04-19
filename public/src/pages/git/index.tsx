import { lazy } from 'preact/compat/src/suspense';

export default [
  {
    path: '/git/create',
    component: lazy(() => import('./create')),
  },
];
