"use client";
import React from "react";
import Saxeli from "../Saxeli/Saxeli";
import styles from "./AddForm.module.scss";
import PhotoAdd from "../PhotoAdd/PhotoAdd";
import Department from "../Department/Department";
import CreateAccount from "../CreateAccount/CreateAccount";
import CreateTanamsh from "../CreateTanamsh/CreateTanamsh";

import Image from "next/image";

const AddForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cancel}>
        <Image src="/Cancel.svg" width={40} height={40} alt="cancel"></Image>
      </div>
      <h2 className={styles.h2}>თანამშრომლის დამატება</h2>
      <div className={styles.saxeligvari}>
        <Saxeli />
        <Saxeli />
      </div>
      <div className={styles.photo}>
        <PhotoAdd />
      </div>
      <div className={styles.Department}>
        <Department />
      </div>
      <div className={styles.buttons}>
        <CreateTanamsh text="გაუქმება" />
        <CreateAccount text="დაამატე თანამშრომელი" />
      </div>
    </div>
  );
};

export default AddForm;
