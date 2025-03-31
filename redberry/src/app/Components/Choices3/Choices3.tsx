"use client";
import { useState } from "react";
import Chamoshla from "../Chamoshla/Chamoshla";
import Image from "next/image";
import styles from "./Choices3.module.scss";

type Props = {
  departments: { name: string }[];
  priorities: { name: string }[];
  employees: { name?: string; surname?: string; avatar?: string }[];
  onFilterChange: (filters: {
    departments: string[];
    priorities: string[];
    employees: string[];
  }) => void;
};

const Choices3 = ({
  departments,
  priorities,
  employees,
  onFilterChange,
}: Props) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    departments: [],
    priorities: [],
    employees: [],
  });

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleSelect = (type: string, selected: string[]) => {
    const updatedFilters = { ...selectedFilters, [type]: selected };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
    setOpenDropdown(null); // Add this to close the dropdown
  };

  const getCheckboxTexts = (type: string) => {
    switch (type) {
      case "departments":
        return departments.map((d) => d.name.trim());
      case "priorities":
        return priorities.map((p) => p.name.trim());
      case "employees":
        return employees.map((e) =>
          `${e.name?.trim() || ""} ${e.surname?.trim() || ""}`.trim()
        );
      default:
        return [];
    }
  };

  return (
    <div className={styles.container}>
      {["departments", "priorities", "employees"].map((type) => (
        <div key={type} className={styles.component}>
          <div className={styles.dropdown} onClick={() => toggleDropdown(type)}>
            <p>
              {type === "departments"
                ? "დეპარტამენტი"
                : type === "priorities"
                ? "პრიორიტეტი"
                : "თანამშრომელი"}
            </p>
            <Image src="/down.svg" width={24} height={24} alt="dropdown" />
          </div>
          {openDropdown === type && (
            <div className={styles.chamoshlaWrapper}>
              <Chamoshla
                checkboxTexts={getCheckboxTexts(type)}
                employees={type === "employees" ? employees : undefined}
                useWomanCheckbox={type === "employees"}
                onSelect={(selected) => handleSelect(type, selected)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Choices3;
