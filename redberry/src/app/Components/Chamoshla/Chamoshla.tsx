"use client";
import { useState } from "react";
import styles from "./Chamoshla.module.scss";
import Checkbox from "../Checkbox/Checkbox";
import CustomButton from "../CustomButton/CustomButton";

type Props = {
  checkboxTexts: string[];
};

const Chamoshla = ({ checkboxTexts }: Props) => {
  const [checks, setChecks] = useState<boolean[]>(new Array(checkboxTexts.length).fill(false));

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newChecks = [...checks];
    newChecks[index] = checked;
    setChecks(newChecks);
  };

  return (
    <div className={styles.container}>
      {checkboxTexts.map((label, index) => (
        <Checkbox
          key={index}
          checked={checks[index]}
          onChange={(checked) => handleCheckboxChange(index, checked)}
          label={label}
        />
      ))}
      <div className={styles.button}>
        <CustomButton text="არჩევა" />
      </div>
    </div>
  );
};

export default Chamoshla;