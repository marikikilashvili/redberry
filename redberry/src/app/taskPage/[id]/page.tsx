"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTaskContext } from "../../TaskContext";
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
  total_comments: number;
}

interface CommentData {
  id: number;
  text: string;
  author_nickname: string;
  author_avatar?: string;
}

export default function TaskPage() {
  const { id } = useParams();
  const { updateTask } = useTaskContext();
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);

  useEffect(() => {
    const fetchTaskAndComments = async () => {
      try {
        console.log("Fetching task for ID:", id);
        const taskResponse = await fetch(
          `https://momentum.redberryinternship.ge/api/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
            },
          }
        );
        if (!taskResponse.ok) {
          const errorText = await taskResponse.text();
          console.error("Task fetch failed:", taskResponse.status, errorText);
          throw new Error("Failed to fetch task");
        }
        const taskData = await taskResponse.json();
        setTask(taskData);

        console.log("Fetching comments for task ID:", id);
        const commentResponse = await fetch(
          `https://momentum.redberryinternship.ge/api/tasks/${id}/comments`,
          {
            headers: {
              Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
            },
          }
        );
        if (!commentResponse.ok) {
          const errorText = await commentResponse.text();
          console.error(
            "Comments fetch failed:",
            commentResponse.status,
            errorText
          );
          throw new Error("Failed to fetch comments");
        }
        const commentData = await commentResponse.json();
        const mappedComments = commentData.map((c: any) => ({
          id: c.id,
          text: c.text,
          author_nickname: c.author_nickname || "Unknown Author",
          author_avatar: c.author_avatar,
        }));
        setComments(mappedComments);
        console.log("Fetched Comments:", mappedComments);
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
      console.log("Fetching statuses...");
      const statusResponse = await fetch(
        "https://momentum.redberryinternship.ge/api/statuses",
        {
          headers: {
            Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
          },
        }
      );
      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error(
          "Statuses fetch failed:",
          statusResponse.status,
          errorText
        );
        throw new Error("Failed to fetch statuses");
      }
      const statuses = await statusResponse.json();
      const newStatusObj = statuses.find(
        (status: { id: number; name: string }) => status.name === newStatus
      );

      if (!newStatusObj) {
        console.error("Status not found:", newStatus);
        return;
      }

      console.log("Updating task ID:", task.id, "to status:", newStatusObj);
      const updatedTask: Task = { ...task, status: newStatusObj };
      setTask(updatedTask);

      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${task.id}`,
        {
          method: "PUT", // Changed from PATCH to PUT
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
          },
          body: JSON.stringify({ status_id: newStatusObj.id }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Update failed:", response.status, errorText);
        throw new Error("Failed to update task status");
      }

      updateTask(updatedTask);
      console.log("Task status updated successfully");
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

  const avatarSrc = task.employee.avatar?.startsWith("http")
    ? task.employee.avatar
    : task.employee.avatar
    ? `https://momentum.redberryinternship.ge/storage${task.employee.avatar}`
    : "/default-avatar.jpg";

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
                imageSrc={avatarSrc}
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
                name={comment.author_nickname}
                imageSrc={comment.author_avatar || "/default-avatar.jpg"}
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
