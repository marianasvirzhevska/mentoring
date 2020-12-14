import React from 'react';

import styles from './index.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  disabled?: boolean;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  error,
  disabled,
  ...rest
}) => {
  return (
    <div className={styles.root}>
      <label>
        <p>{label}</p>
        <div className={styles.cover}>
          {disabled ? (
            <input {...rest} id={name} disabled />
          ) : (
            <input {...rest} id={name} />
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </label>
    </div>
  );
};

export default Input;
