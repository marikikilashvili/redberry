import React from "react";
import styles from "./SixButtons.module.scss";
import clsx from "clsx";
import Image from "next/image";

type Priority = "high" | "medium" | "low";
type Size = "big" | "small";

type Props = {
  priority: Priority;
  size: Size;
  icon?: string;
  label?: string;
};

const getPriorityIcon = (priority: Priority) => {
  switch (priority) {
    case "high":
      return { icon: "/High.svg", label: "მაღალი", color: "red" };
    case "medium":
      return { icon: "/Medium.svg", label: "საშუალო", color: "yellow" };
    case "low":
      return { icon: "/Low.svg", label: "დაბალი", color: "green" };
    default:
      return { icon: "/Medium.svg", label: "Medium", color: "yellow" };
  }
};

const SixButtons = ({ priority, size, icon, label }: Props) => {
  const {
    icon: priorityIcon,
    label: priorityLabel,
    color,
  } = getPriorityIcon(priority);

  return (
    <div className={clsx(styles.button, styles[color], styles[size])}>
      <Image
        src={icon || priorityIcon}
        width={size === "big" ? 16 : 18}
        height={size === "big" ? 18 : 20}
        alt={label || priorityLabel}
      />
      <span>{label || priorityLabel}</span>
    </div>
  );
};

export default SixButtons;
