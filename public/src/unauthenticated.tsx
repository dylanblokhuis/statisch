import { h } from 'preact';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import { login } from './services/auth';
import Input from './components/form/input';
import Wrapper from './components/wrapper';
import Button from './components/form/button';
import Error from './components/form/error';

interface FormValues {
  email: string
  password: string
}

interface ErrorFormValues {
  email?: string
  password?: string
  general?: string;
}

const initialValues: FormValues = { email: '', password: '' };

const FormWrapper = styled(Wrapper)`
  width: 350px;
`;

function Unauthenticated() {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <FormWrapper>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: ErrorFormValues = {};

            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            login(values)
              .then(() => {
                window.location.reload();
              })
              .catch((e) => {
                console.error(e);
                setFieldError('general', 'Invalid email or password.');
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form className="d-flex pb-3 flex-column w-100">
              <h1 className="text-center font-weight-bold">statisch</h1>
              <div className="mb-2">
                <Input formik type="email" name="email" placeholder="Email" />
                {errors.email && touched.email && <Error message={errors.email} />}
              </div>

              <div className="mb-2">
                <Input formik type="password" name="password" placeholder="Password" />
                {errors.password && touched.password && <Error message={errors.password} />}
              </div>

              <Button type="submit" disabled={isSubmitting}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </div>
  );
}

export default Unauthenticated;
