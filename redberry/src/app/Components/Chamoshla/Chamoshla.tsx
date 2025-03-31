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
  onSelect: (selected: string[]) => void;
};

const Chamoshla = ({
  checkboxTexts,
  employees = [],
  useWomanCheckbox = false,
  onSelect,
}: Props) => {
  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    new Array(checkboxTexts.length).fill(false)
  );

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = checked;
    setCheckedStates(newCheckedStates);
  };

  const handleSelect = () => {
    const selected = checkboxTexts.filter((_, index) => checkedStates[index]);
    onSelect(selected);
  };

  const renderCheckbox = (label: string, index: number) => {
    if (useWomanCheckbox && employees[index]) {
      return (
        <WomanCheckbox
          key={index}
          name={label}
          avatar={employees[index].avatar || "/qali.jpg"}
          checked={checkedStates[index]}
          onChange={(checked) => handleCheckboxChange(index, checked)}
        />
      );
    }
    return (
      <Checkbox
        key={index}
        label={label}
        checked={checkedStates[index]}
        onChange={(checked) => handleCheckboxChange(index, checked)}
      />
    );
  };

  return (
    <div className={styles.container}>
      {checkboxTexts.map((label, index) => renderCheckbox(label, index))}
      <div className={styles.button}>
        <CustomButton text="არჩევა" onClick={handleSelect} />
      </div>
    </div>
  );
};

export default Chamoshla;
