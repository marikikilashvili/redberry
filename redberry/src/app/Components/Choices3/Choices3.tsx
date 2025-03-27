"use client";
import { useState } from "react";
import styles from "./Choices3.module.scss";
import Image from "next/image";
import Chamoshla from "../Chamoshla/Chamoshla";
import Tanamshromeli from "../Tanamshromeli/Tanamshromeli";

const Choices3 = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const getCheckboxTexts = (dropdown: string) => {
    switch (dropdown) {
      case "დეპარტამენტი":
        return [
          "დიზაინის დეპარტამენტი",
          "ფრონტენდ დეპარტამენტი",
          "ბექენდ დეპარტამენტი",
          "IT დეპარტამენტი",
        ];
      case "პრიორიტეტი":
        return ["მაღალი", "საშუალო", "დაბალი"];
      case "თანამშრომელი":
        return [
          <Tanamshromeli text="თამარ კვანტალია" imageSrc="/qali.jpg" />,
          <Tanamshromeli text="თამარ კვანტალია" imageSrc="/qali.jpg" />,
          <Tanamshromeli text="თამარ კვანტალია" imageSrc="/qali.jpg" />,
          <Tanamshromeli text="თამარ კვანტალია" imageSrc="/qali.jpg" />,
        ];
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
          <p className={styles.p}>თანამშრომელი</p>
          <div
            onClick={() => toggleDropdown("თანამშრომელი")}
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
        {openDropdown === "თანამშრომელი" && (
          <div className={styles.chamoshlaWrapper}>
            <Chamoshla checkboxTexts={getCheckboxTexts("თანამშრომელი")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Choices3;
