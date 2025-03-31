"use client";
import { useState } from "react";
import styles from "./WomanCheckbox.module.scss";
import Image from "next/image";

type Props = {
  name: string;
  avatar?: string;
};

const WomanCheckbox = ({ name, avatar = "/qali.jpg" }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={`${styles.container} womanCheckboxContainer`}>
      {" "}
      {/* Add global class */}
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
        src={avatar}
        width={28}
        height={28}
        alt={name}
      />
      <p className={styles.p}>{name}</p>
    </div>
  );
};

export default WomanCheckbox;
