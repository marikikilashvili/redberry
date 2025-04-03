// src/app/Components/Comment/Comment.tsx
import styles from "./Comment.module.scss";
import Image from "next/image";
import Left from "../Left/Left";

type Props = {
  text: string;
  imageSrc?: string;
  name: string;
  showLeft?: boolean;
  onReplyClick?: () => void; // Add this prop
};

function Comment({ text, imageSrc, name, showLeft, onReplyClick }: Props) {
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
        {showLeft && <Left text="უპასუხე" onClick={onReplyClick} />}
      </div>
    </div>
  );
}

export default Comment;
