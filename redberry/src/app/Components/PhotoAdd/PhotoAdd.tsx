"use client";
import { ChangeEvent, RefObject } from "react";
import Image from "next/image";
import styles from "./PhotoAdd.module.scss";

interface PhotoAddProps {
  preview: string | null;
  onFileSelect: (file: File) => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

const PhotoAdd = ({ preview, onFileSelect, fileInputRef }: PhotoAddProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <>
      <h2 className={styles.h2}>ავატარი*</h2>
      <div className={styles.container}>
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <div
          className={styles.galerea}
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className={styles.preview} />
          ) : (
            <>
              <Image
                className={styles.photo}
                src="/photo.svg"
                width={34}
                height={28}
                alt="upload"
              />
              <p className={styles.p}>ატვირთე ფოტო</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PhotoAdd;

