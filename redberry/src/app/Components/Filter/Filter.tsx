"use client";
import styles from "./Filter.module.scss";
import Image from "next/image";

type Props = {
  filters: {
    departments: string[];
    priorities: string[];
    employees: string[];
  };
  onRemoveFilter: (category: string, value: string) => void;
};

const Filter = ({ filters, onRemoveFilter }: Props) => {
  const allFilters = [
    ...filters.departments.map((value) => ({ category: "departments", value })),
    ...filters.priorities.map((value) => ({ category: "priorities", value })),
    ...filters.employees.map((value) => ({ category: "employees", value })),
  ];

  return (
    <div className={styles.filterContainer}>
      {allFilters.map(({ category, value }, index) => (
        <div key={index} className={styles.container}>
          <p className={styles.p}>{value}</p>
          <Image
            src="/x.svg"
            width={14}
            height={14}
            alt="Remove filter"
            onClick={() => onRemoveFilter(category, value)}
          />
        </div>
      ))}
      {allFilters.length === 0 && (
        <p className={styles.noFilters}>No filters selected</p>
      )}
    </div>
  );
};

export default Filter;
