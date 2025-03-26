import styles from "./Daamate.module.scss";
import Image from "next/image";
type Props = {
  text: string;
};

function Daamate({ text }: Props) {
  return (
    <button className={styles.container}>
      <Image src="/pliusi.svg" width={18} height={18} alt="pliusi"></Image>
      {text}
    </button>
  );
}

export default Daamate;
