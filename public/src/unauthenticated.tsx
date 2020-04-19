import { h } from 'preact';
import { Formik, Form, Field } from 'formik';
import { login } from './services/auth';

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

function Unauthenticated() {
  return (
    <div>
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
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            {errors.email && touched.email && errors.email}
            <Field type="password" name="password" placeholder="Password" />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Unauthenticated;
