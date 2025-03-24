import { TagColor } from "@/types";
import clsx from "clsx";
import styles from "./ColouredButton.module.scss";

type Props = {
  color: TagColor;
};

const getColor = (color: TagColor) => {
  switch (color) {
    case "pink":
      return { text: "დიზაინი" };
    case "orange":
      return { text: "მარკეტინგი" };
    case "blue":
      return { text: "ლოჯისტიკა" };
    case "yellow":
      return { text: "ინფ. ტექ." };
    default:
      return { text: "დიზაინი" };
  }
};

const ColouredButton = ({ color }: Props) => {
  const { text } = getColor(color);
  return <div className={clsx(styles.button, styles[color])}>{text}</div>;
};

export default ColouredButton;
