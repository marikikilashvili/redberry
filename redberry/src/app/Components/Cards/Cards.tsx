"use client";
import { memo } from "react";
import Link from "next/link";
import styles from "./Cards.module.scss";
import Image from "next/image";
import SixButtons from "../SixButtons/SixButtons";
import ColouredButton from "../ColouredButton/ColouredButton";

type Props = {
  id: number;
  text: "დასაწყები" | "პროგრესში" | "მზად ტესტირებისთვის" | "დასრულებული";
  date: string;
  title: string;
  description: string;
  imgSrc: string;
  comments: number;
  priority?: string;
  department: string;
};

const Cards = memo(
  ({
    id,
    text,
    date,
    title,
    description,
    imgSrc,
    comments,
    priority,
    department,
  }: Props) => {
    const getColorClass = () => {
      switch (text) {
        case "დასაწყები":
          return styles.yellow;
        case "პროგრესში":
          return styles.orange;
        case "მზად ტესტირებისთვის":
          return styles.pink;
        case "დასრულებული":
          return styles.blue;
        default:
          return "";
      }
    };

    const mapPriorityToIcon = (priority: string): "low" | "medium" | "high" => {
      switch (priority) {
        case "დაბალი":
          return "low";
        case "საშუალო":
          return "medium";
        case "მაღალი":
          return "high";
        default:
          return "low";
      }
    };

    const validImgSrc = imgSrc || "/default-avatar.jpg";

    return (
      <Link
        href={`/taskPage/${id}`}
        passHref
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className={styles.gap}>
          <div className={`${styles.container} ${getColorClass()}`}>
            <div className={styles.space2}>
              <div className={styles.space}>
                <div className={styles.buttons}>
                  <SixButtons
                    priority={priority ? mapPriorityToIcon(priority) : "low"}
                    size="small"
                  />
                  <ColouredButton department={department} />
                </div>
                <h3 className={styles.h3}>{date}</h3>
              </div>
              <div className={styles.text}>
                <h2 className={styles.h2}>{title}</h2>
                <p className={styles.p}>{description}</p>
              </div>
            </div>
            <div className={styles.icons}>
              <Image
                className={styles.qali}
                src={validImgSrc}
                width={40}
                height={40}
                alt="Profile image"
                priority
                placeholder="blur"
                blurDataURL="/default-avatar.jpg"
              />
              <div className={styles.comment}>
                <Image
                  src="/Vector.svg"
                  width={24}
                  height={22}
                  alt="Comment icon"
                />
                {comments ?? 0}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

Cards.displayName = "Cards";
export default Cards;
