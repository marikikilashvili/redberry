// src/app/Components/Left/Left.tsx
import styles from "./Left.module.scss";
import SvgComponent from "@/icons/SvgComponent";

type Props = {
  text: string;
  onClick?: () => void; // Add this prop
};

function Left({ text, onClick }: Props) {
  return (
    <div className={styles.container} onClick={onClick}>
      <SvgComponent />
      <p>{text}</p>
    </div>
  );
}

export default Left;
