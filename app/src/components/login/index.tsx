import * as React from 'react';

import LoginForm from './loginForm';
import styles from './index.scss';

const Login: React.FC = () => {
  return (
    <div className={styles.authRoot}>
      <div className={styles.formCover}>
        <h1 className={styles.title}>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
