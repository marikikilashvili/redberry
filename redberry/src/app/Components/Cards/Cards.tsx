import styles from "./Cards.module.scss";
import Image from "next/image";
import SixButtons from "../SixButtons/SixButtons";
import ColouredButton from "../ColouredButton/ColouredButton";

type Props = {
  text: "დასაწყები" | "პროგრესში" | "მზად ტესტირებისთვის" | "დასრულებული";
  date: string;
  title: string;
  description: string;
  imgSrc: string;
  comments: number;
};

function Cards({ text, date, title, description, imgSrc, comments }: Props) {
  const getColorClass = () => {
    switch (text) {
      case "დასაწყები":
        return styles.yellow;
      case "პროგრესში":
        return styles.orange;
      case "მზად ტესტირებისთვის":
        return styles.pink;
      case "დასრულებული":
        return styles.blue;
      default:
        return "";
    }
  };

  return (
    <div className={styles.gap}>
      {/* Removed the button from here */}
      <div className={`${styles.container} ${getColorClass()}`}>
        <div className={styles.space2}>
          <div className={styles.space}>
            <div className={styles.buttons}>
              <SixButtons priority="low" size="small" />
              <ColouredButton color="yellow" />
            </div>
            <div>
              <h3 className={styles.h3}>{date}</h3>
            </div>
          </div>
          <div className={styles.text}>
            <h2 className={styles.h2}>{title}</h2>
            <p className={styles.p}>{description}</p>
          </div>
        </div>
        <div>
          <div className={styles.icons}>
            <div>
              <Image
                className={styles.qali}
                src={imgSrc}
                width={31}
                height={31}
                alt="Profile image"
              />
            </div>
            <div className={styles.comment}>
              <Image
                src="/Vector.svg"
                width={20}
                height={18.5}
                alt="Comment icon"
              />
              <p>{comments}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;