"use client";
import styles from "./Saxeli.module.scss";

interface SaxeliProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const Saxeli = ({ label, value, onChange }: SaxeliProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{label}</h2>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type here..."
        minLength={2}
        maxLength={255}
      />
      <p className={styles.p}>
        მინიმუმ 2 სიმბოლო <br />
        მაქსიმუმ 255 სიმბოლო
      </p>
    </div>
  );
};

export default Saxeli;