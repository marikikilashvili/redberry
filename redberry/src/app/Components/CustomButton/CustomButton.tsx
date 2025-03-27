import styles from "./CustomButton.module.scss";
// import classNames from "classnames";

type Props = {
  text: string;
  className?: string;
  onClick?: () => void; // Add onClick
};

function CustomButton({ text, className, onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}

export default CustomButton;
