import styles from "./Left.module.scss";
import SvgComponent from "@/icons/SvgComponent";

type Props = {
  text: string;
};

function Left({ text }: Props) {
  return (
    <div className={styles.container}>
      <SvgComponent />
      <p>{text}</p>{" "}
    </div>
  );
}

export default Left;
