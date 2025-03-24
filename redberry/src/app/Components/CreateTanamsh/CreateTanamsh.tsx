"use client";
import React from "react";
import styles from "./CreateTanamsh.module.scss";
type Props = {
  text: string;
};

const CreateTanamsh = ({ text }: Props) => {
  return <button className={styles.button}>{text}</button>;
};

export default CreateTanamsh;
