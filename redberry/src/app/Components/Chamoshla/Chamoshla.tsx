"use client";
import { useState } from "react";
import styles from "./Chamoshla.module.scss";
import Checkbox from "../Checkbox/Checkbox";
import WomanCheckbox from "../WomanCheckbox/WomanCheckbox";
import CustomButton from "../CustomButton/CustomButton";

type Props = {
  checkboxTexts: string[];
  employees?: { name?: string; surname?: string; avatar?: string }[];
  useWomanCheckbox?: boolean;
  selectedItems?: string[]; // New prop to pre-check boxes
  onSelect: (selected: string[]) => void;
};

const Chamoshla = ({
  checkboxTexts,
  employees = [],
  useWomanCheckbox = false,
  selectedItems = [], // Default to empty array
  onSelect,
}: Props) => {
  const [checks, setChecks] = useState<boolean[]>(
    checkboxTexts.map((text) => selectedItems.includes(text))
  );

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newChecks = [...checks];
    newChecks[index] = checked;
    setChecks(newChecks);
  };

  const handleSelect = () => {
    const selected = checkboxTexts.filter((_, index) => checks[index]);
    onSelect(selected);
  };

  return (
    <div className={styles.container}>
      {checkboxTexts.map((label, index) =>
        useWomanCheckbox && employees[index] ? (
          <WomanCheckbox
            key={index}
            name={label}
            avatar={employees[index].avatar || "/qali.jpg"}
            checked={checks[index]}
            onChange={(checked) => handleCheckboxChange(index, checked)}
          />
        ) : (
          <Checkbox
            key={index}
            label={label}
            checked={checks[index]}
            onChange={(checked) => handleCheckboxChange(index, checked)}
          />
        )
      )}
      <div className={styles.button}>
        <CustomButton text="არჩევა" onClick={handleSelect} />
      </div>
    </div>
  );
};

export default Chamoshla;
