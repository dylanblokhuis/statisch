import { h } from 'preact';
import { lazy } from 'preact/compat';
import useSWR from 'swr';
import { Link } from 'react-router-dom';

import Wrapper from '../../components/wrapper';
import client from '../../services/api';
import { IDomain } from '../../types';
import Button from '../../components/form/button';

function Index() {
  const { data: domains, error } = useSWR<IDomain[]>('/api/domains', client);

  if (!domains) {
    return <div className="container">loading...</div>;
  }

  if (error) {
    return <div>Error occured</div>;
  }

  return (
    <Wrapper className="mb-2">
      <div className="ml-auto mb-3">
        <Link to="/domains/create">
          <Button>New domain</Button>
        </Link>
      </div>

      {domains.map((domain) => (
        <Wrapper className="d-flex justify-content-between align-items-center" key={domain.id}>
          <div>
            <span className="font-weight-bold">{domain.name}</span>
          </div>
          <Button type="button">Build</Button>
        </Wrapper>
      ))}
    </Wrapper>
  );
}

export default [
  {
    component: Index,
    path: '/domains',
  },
  {
    component: lazy(() => import('./create')),
    path: '/domains/create',
  },
];
