import styles from "./CustomButton.module.scss";

type Props = {
  text: string;
};

function CustomButton({ text }: Props) {
  return <button className={styles.container}>{text}</button>;
}

export default CustomButton;
