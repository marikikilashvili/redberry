"use client";
import styles from "./Checkbox.module.scss";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

const Checkbox = ({ checked, onChange, label }: Props) => {
  return (
    <div className={styles.container}>
      <label className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={styles.checkboxInput}
        />
        <span className={styles.checkboxCustom}></span>
      </label>
      <p className={styles.p}>{label}</p>
    </div>
  );
};

export default Checkbox;
