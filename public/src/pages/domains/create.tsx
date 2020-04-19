import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import useSWR from 'swr';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

import Wrapper from '../../components/wrapper';
import client from '../../services/api';
import { IGitProviders } from '../../types';
import { login } from '../../services/auth';
import Input from '../../components/form/input';
import Button from '../../components/form/button';
import Icon from '../../components/icon';

interface FormValues {
  provider: string
}

interface ErrorFormValues {
  provider?: string
}

const initialValues: FormValues = { provider: '' };

function Create() {
  const [hasGit, setHasGit] = useState(false);
  const [step, setStep] = useState('providers');

  async function checkGit() {
    const response = await client('/api/git');

    if (response) {
      setHasGit(true);
    }
  }

  useEffect(() => {
    checkGit();
  }, []);

  if (!hasGit) {
    return (
      <Wrapper className="d-flex flex-column align-items-center">
        <h2 className="mb-3 text-center">No git integration found.</h2>
        <Link to="/git/create">
          <Button className="px-4 d-flex align-items-center">
            <Icon className="mr-2" size="18px" icon="github" />
            Add git integration
          </Button>
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      sdsd
    </Wrapper>
  );
}

function Providers({ onChange }: { onChange: any }) {
  const { data: providers, error } = useSWR<IGitProviders[]>('/api/git/providers', client);

  if (!providers) {
    return <div>Loading git providers...</div>;
  }

  if (error) {
    return <div>An error occured.</div>;
  }

  return (
    <select onChange={onChange}>
      <option>Select an option</option>
      {providers.map((provider) => (
        <option>{provider.name}</option>
      ))}
    </select>
  );
}

export default Create;
