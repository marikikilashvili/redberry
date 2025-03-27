"use client";
import { useState } from "react";
import styles from "./WomanCheckbox.module.scss";
import Image from "next/image";

const WomanCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={styles.container}>
      <label className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className={styles.checkboxInput}
        />
        <span className={styles.checkboxCustom}></span>
      </label>
      <Image
        className={styles.img}
        src="/qali.jpg"
        width={28}
        height={28}
        alt="qali"
      ></Image>
      <p className={styles.p}>მარკეტინგის დეპარტამენტი</p>
    </div>
  );
};

export default WomanCheckbox;
