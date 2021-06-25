import React from "react";
import styles from "./CurrencyInfoField.module.css";

type CurrencyInfoFieldProps = {
  label: string;
  value: number | string | JSX.Element;
};

const CurrencyInfoField = ({
  label,
  value,
}: CurrencyInfoFieldProps): JSX.Element => {
  return (
    <div className={styles.field}>
      <p>
        <strong>{label}</strong>
      </p>
      {value}
    </div>
  );
};

export default CurrencyInfoField;
