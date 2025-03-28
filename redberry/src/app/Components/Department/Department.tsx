"use client";
import styles from "./Department.module.scss";
import Image from "next/image";
import { useState, MouseEvent } from "react";

export default function DropdownOptions() {
  const options = [
    "დიზაინის დეპარტამენტი",
    "ლოჯისტიკის დეპარტამენტი",
    "მარკეტინგის დეპარტამენტი",
    "აღრიცხვა-ფინანსები",
    "IT განყოფილება",
    "გაყიდვების დეპარტამენტი",
  ];

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleIconClick = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsDropdownVisible((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <h2 className={styles.title}>დეპარტამენტი*</h2>
        <div className={styles.dropdownWrapper}>
          <div className={styles.selectedOption}>
            <span className={styles.selectedText}>{selectedOption}</span>
            <div className={styles.iconWrapper}>
              <Image
                className={`${styles.downIcon} ${
                  isDropdownVisible ? styles.active : ""
                }`}
                src="/down.svg"
                width={14}
                height={14}
                alt="down"
                onClick={handleIconClick}
              />
            </div>
          </div>
          {isDropdownVisible && (
            <label className={styles.dropdown}>
              {options.map((option, index) => (
                <div
                  key={index}
                  className={styles.optionItem}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
