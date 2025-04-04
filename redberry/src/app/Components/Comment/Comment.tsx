import styles from "./Comment.module.scss";
// import Image from "next/image";
import Left from "../Left/Left";

type Props = {
  text: string;
  imageSrc?: string;
  name: string;
  showLeft?: boolean;
  onReplyClick?: () => void;
};

function Comment({ text, imageSrc, name, showLeft, onReplyClick }: Props) {
  console.log(imageSrc);
  return (
    <div className={styles.container}>
      {imageSrc && (
        <img
          className={styles.img}
          src={imageSrc}
          alt="comment image"
          placeholder="blur"
          blurDataURL="/default-avatar.jpg"
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
