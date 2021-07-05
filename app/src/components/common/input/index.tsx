/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import React from 'react';

import styles from './index.scss';

type NativeInputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
interface InputProps {
  label: string;
  name: string;
  disabled?: boolean;
  error?: string;
  passProps?: NativeInputProps;
}

const Input: React.FC<InputProps> = ({
  passProps,
  label,
  name,
  error,
  disabled,
}) => {
  return (
    <div className={styles.root}>
      <label>
        <p>{label}</p>
        <div className={styles.cover}>
          {disabled ? (
            <input
              {...passProps}
              id={name}
              disabled
            />
          ) : (
            <input {...passProps} id={name} />
          )}
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </label>
    </div>
  );
};

export default Input;
