"use client";
import styles from "./Header.module.scss";
import Image from "next/image";
import CreateTanamsh from "../CreateTanamsh/CreateTanamsh";
import CreateAccount from "../CreateAccount/CreateAccount";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onAddEmployee: () => void;
  onAddTask?: () => void; // Optional since handled internally
}

const Header = ({ onAddEmployee }: HeaderProps) => {
  const router = useRouter();

  const handleAddTask = () => {
    router.push("/addTasks/id");
  };

  return (
    <div className={styles.container}>
      <div>
        <Image
          src="/header.svg"
          width={210}
          height={38}
          alt="header image"
          priority
        />
      </div>
      <div className={styles.buttons}>
        <CreateTanamsh text="თანამშრომლის შექმნა" onClick={onAddEmployee} />
        <CreateAccount text="შექმენი ახალი დავალება" onClick={handleAddTask} />
      </div>
    </div>
  );
};

export default Header;
