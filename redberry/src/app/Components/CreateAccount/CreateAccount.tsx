"use client";
import React from "react";
import styles from "./CreateAccount.module.scss";
import Image from "next/image";

type Props = {
  text: string;
};

const CreateAccount = ({ text }: Props) => {
  return (
    <div className={styles.button}>
      <Image src="/add.svg" width={20} height={20} alt="Add icon" />
      <p>{text}</p>
    </div>
  );
};

export default CreateAccount;
