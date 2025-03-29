"use client";
import { useState } from "react";
import styles from "./Choices3.module.scss";
import Image from "next/image";
import Chamoshla from "../Chamoshla/Chamoshla";
import Tanamshromeli from "../Tanamshromeli/Tanamshromeli";

type Department = { name: string };
type Priority = { name: string };
type Status = { name: string };

type Props = {
  departments: Department[];
  priorities: Priority[];
  statuses: Status[];
};

const Choices3 = ({ departments, priorities, statuses }: Props) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const getCheckboxTexts = (dropdown: string) => {
    switch (dropdown) {
      case "დეპარტამენტი":
        return departments.map((dept) => dept.name);
      case "პრიორიტეტი":
        return priorities.map((priority) => {
          switch (priority.name.toLowerCase()) {
            case "high":
              return "მაღალი";
            case "medium":
              return "საშუალო";
            case "low":
              return "დაბალი";
            default:
              return priority.name;
          }
        });
      case "სტატუსი": 
        return statuses.map((status) => status.name);
      default:
        return [];
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.component}>
        <div className={styles.dropdown}>
          <p className={styles.p}>დეპარტამენტი</p>
          <div
            onClick={() => toggleDropdown("დეპარტამენტი")}
            className={styles.iconWrapper}
          >
            <Image
              className={styles.image}
              src="/down.svg"
              width={24}
              height={24}
              alt="image"
            />
          </div>
        </div>
        {openDropdown === "დეპარტამენტი" && (
          <div className={styles.chamoshlaWrapper}>
            <Chamoshla checkboxTexts={getCheckboxTexts("დეპარტამენტი")} />
          </div>
        )}
      </div>
      <div className={styles.component}>
        <div className={styles.dropdown}>
          <p className={styles.p}>პრიორიტეტი</p>
          <div
            onClick={() => toggleDropdown("პრიორიტეტი")}
            className={styles.iconWrapper}
          >
            <Image
              className={styles.image}
              src="/down.svg"
              width={24}
              height={24}
              alt="image"
            />
          </div>
        </div>
        {openDropdown === "პრიორიტეტი" && (
          <div className={styles.chamoshlaWrapper}>
            <Chamoshla checkboxTexts={getCheckboxTexts("პრიორიტეტი")} />
          </div>
        )}
      </div>
      <div className={styles.component}>
        <div className={styles.dropdown}>
          <p className={styles.p}>სტატუსი</p> 
          <div
            onClick={() => toggleDropdown("სტატუსი")}
            className={styles.iconWrapper}
          >
            <Image
              className={styles.image}
              src="/down.svg"
              width={24}
              height={24}
              alt="image"
            />
          </div>
        </div>
        {openDropdown === "სტატუსი" && (
          <div className={styles.chamoshlaWrapper}>
            <Chamoshla checkboxTexts={getCheckboxTexts("სტატუსი")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Choices3;