import React from 'react';

import styles from './index.scss';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  input?: React.InputHTMLAttributes<HTMLInputElement>;
}

const CustomCheckbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  input,
}) => {
  return (
    <div className={styles.root}>
      <label>
        <p>{label}</p>
        <input type="checkbox" checked={checked} {...input} />
        <span className={styles.checkMark} />
      </label>
    </div>
  );
};

export default CustomCheckbox;
