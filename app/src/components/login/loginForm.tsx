import React from 'react';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
// import { connect, useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import Input from '../common/input';

import styles from './loginForm.scss';

// interface LoginFormProps {
//   email: string;
//   password: string;
//   error?: string;
// }

const LoginForm: React.FC = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  const [error, setError] = React.useState(null || '');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  if (password) {
    setError('1');
    setEmail('2');
    setPassword('3');
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <div className={styles.formControl}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <Field
          component={Input}
          name="email"
          type="email"
          value={email}
          fullWidth
          label="Enter your Email"
        />
        <Field
          component={Input}
          name="password"
          type="password"
          value={password}
          fullWidth
          label="Enter password"
        />
        {error ? <p className={styles.error}>{error}</p> : null}
        <div className={styles.formBtn}>
          <Button type="submit" variant="contained" color="secondary">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

// LoginForm = reduxForm({
//   form: 'login',
// })(LoginForm);

export default reduxForm({
  form: 'login',
})(LoginForm);
