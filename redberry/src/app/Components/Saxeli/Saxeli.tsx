import styles from "./Saxeli.module.scss";
import Image from "next/image";
import { useState, MouseEvent } from "react";

export default function InputWithImage() {
  const [isLabelVisible, setIsLabelVisible] = useState(false);

  const options = [
    "დიზაინის დეპარტამენტი",
    "ლოჯისტიკის დეპარტამენტი",
    "მარკეტინგის დეპარტამენტი",
    "აღრიცხვა-ფინანსები",
    "IT განყოფილება",
    "გაყიდვების დეპარტამენტი",
  ];

  const handleImageClick = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsLabelVisible((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <h2 className={styles.title}>სახელი*</h2>
        <div className={styles.dropdownWrapper}>
          <div className={styles.inputWrapper}>
            <input
              className={styles.card}
              type="text"
              minLength={2}
              maxLength={255}
              placeholder="Type here..."
            />
            <Image
              className={`${styles.inputImage} ${
                isLabelVisible ? styles.active : ""
              }`}
              src="/down.svg"
              width={14}
              height={14}
              alt="down"
              onClick={handleImageClick}
            />
          </div>
          {isLabelVisible && (
            <label className={styles.label}>
              {options.map((option, index) => (
                <div key={index} className={styles.optionItem}>
                  {option}
                </div>
              ))}
            </label>
          )}
        </div>
      </div>
      <p className={styles.p}>
        მინიმუმ 2 სიმბოლო <br />
        მაქსიმუმ 255 სიმბოლო
      </p>
    </div>
  );
}
