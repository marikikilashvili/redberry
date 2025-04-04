"use client";
import styles from "./CreateTanamsh.module.scss";

interface Props {
  text: string;
  onClick?: () => void;
}

const CreateTanamsh = ({ text, onClick }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default CreateTanamsh;