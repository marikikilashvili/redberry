// src/app/components/forms/Saxeli.tsx
"use client";
import { useField } from "formik";
import styles from "./Saxeli.module.scss";

interface SaxeliProps {
  label: string;
  name: string;
  type?: string;
}

const Saxeli = ({ label, name, type = "text" }: SaxeliProps) => {
  const [field, meta] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{label}</h2>
      <input
        className={`${styles.input} ${showError ? styles.error : ""} ${
          meta.value?.length >= 2 && !meta.error ? styles.valid : ""
        }`}
        type={type}
        {...field}
        placeholder="დაწერეთ აქ..."
      />
      {showError ? (
        <p className={styles.errorMessage}>{meta.error}</p>
      ) : (
        <p className={styles.p}>
          მინიმუმ 2 სიმბოლო <br />
          მაქსიმუმ 255 სიმბოლო
        </p>
      )}
    </div>
  );
};

export default Saxeli;
