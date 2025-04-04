
// Department.tsx
"use client";
import styles from "./Department.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Department {
  id: number;
  name: string;
}

const Department = ({ onSelect }: { onSelect: (id: number) => void }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/departments", {
      headers: {
        Authorization: "Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d",
      },
    })
      .then((res) => res.json())
      .then((data) => setDepartments(data));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>დეპარტამენტი*</h2>
      <div className={styles.dropdownWrapper}>
        <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
          <span>{selected || "აირჩიეთ დეპარტამენტი"}</span>
          <Image
            src="/down.svg"
            width={14}
            height={14}
            alt="down"
            className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
          />
        </div>
        {isOpen && (
          <div className={styles.options}>
            {departments.map((dept) => (
              <div
                key={dept.id}
                className={styles.option}
                onClick={() => {
                  setSelected(dept.name);
                  onSelect(dept.id);
                  setIsOpen(false);
                }}
              >
                {dept.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Department;