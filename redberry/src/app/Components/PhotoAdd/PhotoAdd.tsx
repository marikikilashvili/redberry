"use client";
import React from "react";
import Image from "next/image";
import styles from "./PhotoAdd.module.scss";

const AddForm = () => {
  return (
    <>
      <h2 className={styles.h2}>ავატარი*</h2>
      <div className={styles.container}>
        <div className={styles.galerea}>
          <Image src="/photo.svg" width={34} height={28} alt="galerea"></Image>
          <p className={styles.p}>ატვირთე ფოტო</p>
        </div>
      </div>
    </>
  );
};

export default AddForm;
