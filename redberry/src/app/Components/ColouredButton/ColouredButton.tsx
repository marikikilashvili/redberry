import { TagColor } from "@/types";
import clsx from "clsx";
import styles from "./ColouredButton.module.scss";

type Props = {
  department: string;
};

const getColorFromDepartment = (department: string): TagColor => {
  const normalizedDepartment = department?.trim();
  console.log(
    "Normalized department in getColorFromDepartment:",
    normalizedDepartment
  );
  switch (normalizedDepartment) {
    case "დიზაინი":
      return "pink";
    case "მარკეტინგი":
      return "orange";
    case "ლოჯისტიკა":
      return "blue";
    case "ინფ. ტექ.":
      return "yellow";
    case "ადმინისტრაციის დეპარტამენტი":
      return "blue";
    case "ადამიანური რესურსების დეპარტამენტი":
      return "orange";
    case "უცნობი დეპარტამენტი":
      return "pink";
    case "ტექნოლოგიების დეპარტამენტი":
      return "yellow";
    default:
      console.log(
        "Falling back to default color for department:",
        normalizedDepartment
      );
      return "pink";
  }
};

const getShortenedDepartment = (department: string): string => {
  const normalizedDepartment = department?.trim();
  switch (normalizedDepartment) {
    case "დიზაინერების დეპარტამენტი":
      return "დიზაინი";
    case "მარკეტინგი":
      return "მარკეტინგი";
    case "ლოჯოსტიკის დეპარტამენტი":
      return "ლოჯისტიკა";
    case "ინფ. ტექ.":
      return "ინფ. ტექ.";
    case "ადმინისტრაციის დეპარტამენტი":
      return "ადმინისტრაცია";
    case "ადამიანური რესურსების დეპარტამენტი":
      return "HR";
    case "უცნობი დეპარტამენტი":
      return "უცნობი";
    case "ტექნოლოგიების დეპარტამენტი":
      return "ტექნოლოგიები";
    default:
      return normalizedDepartment || "უცნობი";
  }
};

const ColouredButton = ({ department }: Props) => {
  console.log("Department in ColouredButton:", department);
  const displayDepartment = getShortenedDepartment(
    department || "უცნობი დეპარტამენტი"
  );
  const color = getColorFromDepartment(department || "უცნობი დეპარტამენტი");
  console.log("Color in ColouredButton:", color);
  return (
    <div className={clsx(styles.button, styles[color])}>
      {displayDepartment}
    </div>
  );
};

export default ColouredButton;
