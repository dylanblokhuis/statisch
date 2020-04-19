import { h } from 'preact';
import { Form, Formik } from 'formik';

import Wrapper from '../../components/wrapper';
import Input from '../../components/form/input';
import Button from '../../components/form/button';

interface FormValues {
  provider: string
  client_id: string
  client_secret: string
}

interface ErrorFormValues {
  provider?: string
  client_id?: string
  client_secret?: string
}

const initialValues: FormValues = { provider: '', client_id: '', client_secret: '' };

function Create() {
  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: ErrorFormValues = {};

          if (!values.provider) {
            errors.provider = 'Required';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          console.log(values);
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          /* and other goodies */
        }) => (
          <div className="col-lg-8 mx-auto">
            <Form className="d-flex pb-3 flex-column w-100">
              <h2>Create git integration</h2>
              {/*<div className="mb-2">*/}
              {/*  <Input formik type="email" name="email" placeholder="Email" />*/}
              {/*  {errors.email && touched.email && errors.email}*/}
              {/*</div>*/}

              {/*<div className="mb-2">*/}
              {/*  <Input formik type="password" name="password" placeholder="Password" />*/}
              {/*  {errors.password && touched.password && errors.password}*/}
              {/*</div>*/}

              <Button type="submit" disabled={isSubmitting}>
                Create
              </Button>
            </Form>
          </div>
        )}
      </Formik>
    </Wrapper>
  );
}

export default Create;
