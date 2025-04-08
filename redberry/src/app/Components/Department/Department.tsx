"use client";
import styles from "./Department.module.scss";
import Image from "next/image";
import { useState } from "react";

interface Department {
  id: number;
  name: string;
}

const Department = ({
  onSelectDepartment,
  departments,
}: {
  onSelectDepartment: (id: string) => void;
  departments: Department[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

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
                  onSelectDepartment(dept.id.toString()); // Changed from onSelect to onSelectDepartment
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
