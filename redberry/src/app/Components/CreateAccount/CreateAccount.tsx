"use client";
import styles from "./CreateAccount.module.scss";
import Image from "next/image";

interface Props {
  text: string;
  onClick?: () => void;
}

const CreateAccount = ({ text, onClick }: Props) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <Image src="/add.svg" width={20} height={20} alt="Add icon" />
      <p>{text}</p>
    </div>
  );
};

export default CreateAccount;
