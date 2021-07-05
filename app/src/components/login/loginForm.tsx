import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';

import { request, Methods, setStorage } from '../../utils';

import styles from './loginForm.scss';
interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email: boolean | string;
  required: boolean | string;
}

const ERRORS = {
  REQUIRED: 'Enter required fields',
  EMAIL_NOT_VALID: 'Invalid email address',
};

const LoginForm: React.FC = () => {
  const history = useHistory();
  const [formError, setFormError] = React.useState<FormErrors | null>(null);
  const [responseError, setResponseError] = React.useState<string | null>(null);
  const [formValues, setValue] = React.useState<FormValues>({
    email: '',
    password: '',
  });

  const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validateRequired = (value: string): boolean => (value ? false : true);

  const validateEmail = (value: string): boolean => {
    const EMAIL_PATTERN = /^([-a-zA-Z0-9_./'])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    return EMAIL_PATTERN.test(value) ? false : true;
  };

  const validate = (formValues: FormValues): void => {
    const errors = {
      email: validateRequired(formValues.password) && ERRORS.REQUIRED,
      required: validateEmail(formValues.email) && ERRORS.EMAIL_NOT_VALID,
    };

    setFormError(errors);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    validate(formValues);

    if (!formError?.required && !formError?.email) {
      request('/api/login', Methods.POST, formValues)
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            setResponseError(null);
            setStorage('token', data.token);
            history.push('/challenge');
          } else {
            console.log(data.status);
            setResponseError(data.status);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className={styles.formControl}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <TextField
          name="email"
          type="email"
          label="Enter your Email"
          variant="outlined"
          fullWidth
          value={formValues.email}
          onChange={handleInput}
        />
        <TextField
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          label="Enter your password"
          value={formValues.password}
          onChange={handleInput}
        />
        {formError?.required ? (
          <p className={styles.error}>{formError?.required}</p>
        ) : null}
        {formError?.email ? (
          <p className={styles.error}>{formError?.email}</p>
        ) : null}
        {responseError ? <p className={styles.error}>{responseError}</p> : null}
        <div className={styles.formBtn}>
          <Button type="submit" variant="contained" color="secondary">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
