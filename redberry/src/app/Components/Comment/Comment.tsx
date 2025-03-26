import styles from "./Comment.module.scss";
import Image from "next/image";
import Left from "../Left/Left";

type Props = {
  text: string;
  imageSrc?: string;
  name: string;
  showLeft?: boolean; // Add an optional prop for Left component
};

function Comment({ text, imageSrc, name, showLeft }: Props) {
  return (
    <div className={styles.container}>
      {imageSrc && (
        <Image
          className={styles.img}
          src={imageSrc}
          width={38}
          height={38}
          alt="comment image"
        />
      )}
      <div className={styles.container2}>
        <h2 className={styles.h2}>{name}</h2>
        <p className={styles.p}>{text}</p>
        {showLeft && <Left text="უპასუხე" />} {/* Conditionally render Left */}
      </div>
    </div>
  );
}

export default Comment;
