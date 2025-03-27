import styles from "./Pasuxismgebeli.module.scss";
import Image from "next/image";
import { useState, MouseEvent } from "react";

export default function InputWithImage() {
  const [isLabelVisible, setIsLabelVisible] = useState(false);

  const handleImageClick = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsLabelVisible((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <h2 className={styles.title}>პასუხისმგებელი თანამშრომელი</h2>
        <div className={styles.inputWrapper}>
          <input
            className={styles.card}
            type="text"
            minLength={2}
            maxLength={255}
            placeholder="Type here..."
          />
          <Image
            className={styles.inputImage}
            src="/down.svg"
            width={14}
            height={14}
            alt="down"
            onClick={handleImageClick}
          />
        </div>
        {isLabelVisible && (
          <label className={styles.label}>
            This is the first line
            <br />
            This is the second line
            <br />
            This is the third line
          </label>
        )}
      </div>
      <p className={styles.p}>
        მინიმუმ 2 სიმბოლო <br />
        მაქსიმუმ 255 სიმბოლო
      </p>
    </div>
  );
}
