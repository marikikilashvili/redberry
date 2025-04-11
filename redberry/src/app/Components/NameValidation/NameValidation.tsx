"use client";
import React, { useState } from "react";
import { useField } from "formik";
import styles from "./Namevalidation.module.css";
import { clsx } from "clsx";

type Props = {
  text: string;
  name: string;
};

const Namevalidation = ({ text, name }: Props) => {
  const [field] = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  const isValid = field.value.length >= 2 && field.value.length <= 255;
  const isTooLong = field.value.length > 255;

  return (
    <>
      <p className={styles.title}>*{text}</p>
      <div className={styles.box}>
        <input
          {...field}
          className={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            field.onBlur(e);
            setIsFocused(false);
          }}
        />
      </div>
      <div className={styles.validate}>
        <img src="/images/check.png" alt="" />
        <p
          className={clsx(
            !isFocused && styles.default,
            isValid ? styles.valid : styles.invalid
          )}
        >
          მინიმუმ 2 სიმბოლო
        </p>
      </div>
      <div className={styles.validate}>
        <img src="/images/check.png" alt="" />
        <p
          className={clsx(
            !isFocused && styles.default,
            isTooLong ? styles.invalid : styles.valid
          )}
        >
          მაქსიმუმ 255 სიმბოლო
        </p>
      </div>
    </>
  );
};

export default Namevalidation;
