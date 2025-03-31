import { useState, useEffect } from "react";
import Image from "next/image"; // Assuming Next.js is used
import Chamoshla from "../Chamoshla/Chamoshla"; // Adjust the import path as needed
import styles from "./Choices3.module.scss"; // Adjust the CSS module path as needed

type Props = {
  departments: { name: string }[];
  priorities: { name: string }[];
  employees: { name?: string; surname?: string; avatar?: string }[];
  filters: {
    departments: string[];
    priorities: string[];
    employees: string[];
  };
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
  filters,
  onFilterChange,
}: Props) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState(filters);

  // Sync selectedFilters with the filters prop whenever it changes
  useEffect(() => {
    setSelectedFilters(filters);
  }, [filters]);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleSelect = (type: string, selected: string[]) => {
    const updatedFilters = { ...selectedFilters, [type]: selected };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
    setOpenDropdown(null); // Close the dropdown after selection
  };

  const getCheckboxTexts = (type: string) => {
    switch (type) {
      case "departments":
        return departments.map((d) => d.name);
      case "priorities":
        return priorities.map((p) => p.name);
      case "employees":
        return employees.map((e) =>
          `${e.name || ""} ${e.surname || ""}`.trim()
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
