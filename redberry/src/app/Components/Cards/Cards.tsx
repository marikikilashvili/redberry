import styles from "./Cards.module.scss";
// import Image from "next/image";
import SixButtons from "../SixButtons/SixButtons";
import ColouredButton from "../ColouredButton/ColouredButton";

type Props = {
  text: string;
};

function Cards({ text }: Props) {
  return (
    <div className={styles.container}>
      <div>
        <button className={styles.button}>{text}</button>
      </div>
      <div className={styles.buttons}>
        <SixButtons priority="high" size="small" />;
        <ColouredButton color="pink" />
      </div>
    </div>
  );
}

export default Cards;
