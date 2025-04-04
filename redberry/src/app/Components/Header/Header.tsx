// Header.tsx
"use client";
import styles from "./Header.module.scss";
import Image from "next/image";
import CreateTanamsh from "../CreateTanamsh/CreateTanamsh";
import CreateAccount from "../CreateAccount/CreateAccount";

interface HeaderProps {
  onAddEmployee: () => void;
  onAddTask: () => void; // Add this for the second button
}

const Header = ({ onAddEmployee, onAddTask }: HeaderProps) => {
  return (
    <div className={styles.container}>
      <div>
        <Image
          src="/header.svg"
          width={210}
          height={38}
          alt="header image"
          priority // Add priority if it's above the fold
        />
      </div>
      <div className={styles.buttons}>
        <CreateTanamsh text="თანამშრომლის შექმნა" onClick={onAddEmployee} />
        <CreateAccount
          text="შექმენი ახალი დავალება"
          onClick={onAddTask} // Use the new prop here
        />
      </div>
    </div>
  );
};

export default Header;
