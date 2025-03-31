"use client";
import styles from "./WomanCheckbox.module.scss";
import Image from "next/image";

type Props = {
  name: string;
  avatar?: string;
  checked: boolean; // New prop to control the checkbox state
  onChange: (checked: boolean) => void; // New prop to handle changes
};

const WomanCheckbox = ({
  name,
  avatar = "/qali.jpg",
  checked,
  onChange,
}: Props) => {
  return (
    <div className={`${styles.container} womanCheckboxContainer`}>
      <label className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={checked} // Controlled by the parent
          onChange={(e) => onChange(e.target.checked)} // Notify parent of changes
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
