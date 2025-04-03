"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.scss";
import Image from "next/image";
import SixButtons from "@/app/Components/SixButtons/SixButtons";
import Statusi from "@/app/Components/Statusi/Statusi";
import ColouredButton from "@/app/Components/ColouredButton/ColouredButton";
import Tanamshromeli from "@/app/Components/Tanamshromeli/Tanamshromeli";
import CustomButton from "@/app/Components/CustomButton/CustomButton";
import Comment from "@/app/Components/Comment/Comment";

interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: { id: number; name: string };
  priority: { name: string };
  department: { name: string };
  employee: { name: string; surname: string; avatar?: string };
}

interface Comment {
  id: number;
  text: string;
  author_nickname: string;
  author_avatar?: string;
}

export default function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchTaskAndComments = async () => {
      try {
        const taskResponse = await fetch(
          `https://momentum.redberryinternship.ge/api/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
            },
          }
        );
        if (!taskResponse.ok) throw new Error("Failed to fetch task");
        const taskData = await taskResponse.json();
        setTask(taskData);

        const commentResponse = await fetch(
          `https://momentum.redberryinternship.ge/api/tasks/${id}/comments`,
          {
            headers: {
              Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
            },
          }
        );
        if (!commentResponse.ok) throw new Error("Failed to fetch comments");
        const commentData = await commentResponse.json();
        const mappedComments = commentData.map((c: any) => ({
          id: c.id,
          text: c.text,
          author_nickname: c.author_nickname || "Unknown Author", // Fallback if missing
          author_avatar: c.author_avatar, // No fallback here; handled in JSX
        }));
        setComments(mappedComments);
        console.log("Fetched Comments:", mappedComments); // Debug to verify data
      } catch (error) {
        console.error("Error fetching task or comments:", error);
        setTask(null);
        setComments([]);
      }
    };

    if (id) fetchTaskAndComments();
  }, [id]);

  const mapPriorityToIcon = (priority: string) => {
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

  const handleStatusChange = async (newStatus: string) => {
    if (!task) return;

    try {
      const statusResponse = await fetch(
        "https://momentum.redberryinternship.ge/api/statuses",
        {
          headers: {
            Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
          },
        }
      );
      const statuses = await statusResponse.json();
      const newStatusObj = statuses.find(
        (status: { id: number; name: string }) => status.name === newStatus
      );

      if (!newStatusObj) {
        console.error("Status not found:", newStatus);
        return;
      }

      const updatedTask = { ...task, status: newStatusObj };
      setTask(updatedTask);

      await fetch(`https://momentum.redberryinternship.ge/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
        },
        body: JSON.stringify({ status_id: newStatusObj.id }),
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  if (!task) {
    return (
      <div className={styles.container}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.buttons}>
          <SixButtons
            priority={
              task.priority.name ? mapPriorityToIcon(task.priority.name) : "low"
            }
            size="small"
          />
          <ColouredButton department={task.department.name} />
        </div>
        <h1 className={styles.h1}>Task Details: {task.name}</h1>

        <h2 className={styles.h2}>{task.description}</h2>
        <h4 className={styles.h4}>დავალების დეტალები</h4>
        <div className={styles.cards}>
          <div className={styles.cardzss}>
            <div className={styles.cardz}>
              <Image src="/pie-chart.svg" width={24} height={24} alt="chart" />
              <p className={styles.p}>სტატუსი</p>
            </div>
            <div>
              <Statusi
                initialStatus={task.status.name}
                onStatusChange={handleStatusChange}
              />
            </div>
          </div>
          <div className={styles.cardzs}>
            <div className={styles.cardz}>
              <Image src="/user.svg" width={24} height={24} alt="user" />
              <p className={styles.p}>თანამშრომელი</p>
            </div>
            <div>
              <Tanamshromeli
                text={`${task.employee.name} ${task.employee.surname}`}
                imageSrc={task.employee.avatar || "/default-avatar.jpg"}
              />
            </div>
          </div>
          <div className={styles.cardzs}>
            <div className={styles.cardz}>
              <Image
                src="/calendar.svg"
                width={24}
                height={24}
                alt="calendar"
              />
              <p className={styles.p}>დავალების ვადა</p>
            </div>
            <div>
              <p className={styles.date}>{task.due_date.split("T")[0]}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.messages}>
        <div className={styles.relative}>
          <input className={styles.input} type="text" placeholder="type text" />
          <div className={styles.button}>
            <CustomButton text="დააკომენტარე" />
          </div>
        </div>
        <p className={styles.title}>კომენტარები</p>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className={styles.message}>
              <Comment
                name={comment.author_nickname} // Explicitly mapped
                imageSrc={comment.author_avatar || "/default-avatar.jpg"} // Explicitly mapped with fallback
                text={comment.text}
                showLeft={true}
              />
            </div>
          ))
        ) : (
          <p>კომენტარები არ არის</p>
        )}
      </div>
    </div>
  );
}
