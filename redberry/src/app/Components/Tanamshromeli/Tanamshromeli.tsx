import styles from "./Tanamshromeli.module.scss";
import Image from "next/image";

type Props = {
  text: string;
  imageSrc?: string;
};

function Tanamshromeli({ text, imageSrc }: Props) {
  return (
    <button className={styles.container}>
      {imageSrc && (
        <Image
          className={styles.img}
          src={imageSrc}
          width={28}
          height={28}
          alt="pliusi"
        />
      )}
      {text}
    </button>
  );
}

export default Tanamshromeli;
