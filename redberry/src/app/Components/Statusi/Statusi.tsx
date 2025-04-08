// app/Components/Statusi/Statusi.tsx
"use client";
import styles from "./Statusi.module.scss";
import Image from "next/image";
import { useState, MouseEvent } from "react";

type Props = {
  initialStatus: string; // The current status from the fetched task
  onStatusChange?: (newStatus: string) => void; // Optional callback to handle status updates
};

export default function Statusi({ initialStatus, onStatusChange }: Props) {
  const options = [
    "დასაწყები",
    "პროგრესში",
    "მზად ტესტირებისთვის",
    "დასრულებული",
  ];

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.includes(initialStatus) ? initialStatus : options[0] // Set initial status from prop
  );

  const handleIconClick = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsDropdownVisible((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
    if (onStatusChange) {
      onStatusChange(option); // Notify parent of the status change
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <h2 className={styles.title}>სტატუსი*</h2>
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
