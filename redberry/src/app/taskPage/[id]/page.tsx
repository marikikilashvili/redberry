"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTaskContext } from "../../TaskContext";
import styles from "./page.module.scss";
import Image from "next/image";
import globalStyles from "../../page.module.css"; // Add this import
import SixButtons from "@/app/Components/SixButtons/SixButtons";
import Statusi from "@/app/Components/Statusi/Statusi";
import ColouredButton from "@/app/Components/ColouredButton/ColouredButton";
import Tanamshromeli from "@/app/Components/Tanamshromeli/Tanamshromeli";
import CustomButton from "@/app/Components/CustomButton/CustomButton";
import Comment from "@/app/Components/Comment/Comment";
import Header from "@/app/Components/Header/Header"; // Add this import
import AddForm from "@/app/Components/AddForm/AddForm"; // Add this import
interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: { id: number; name: string };
  priority: { name: string };
  department: { name: string };
  employee: { name: string; surname: string; avatar?: string | null };
  total_comments: number;
}

interface CommentData {
  id: number;
  text: string;
  author_nickname: string;
  author_avatar?: string | null;
  parent_id?: number | null;
}

export default function TaskPage() {
  const { id } = useParams();
  const { updateTask, statuses } = useTaskContext();
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  const fetchTask = async () => {
    try {
      const taskResponse = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
          },
          cache: "no-store",
        }
      );
      if (!taskResponse.ok) throw new Error("Failed to fetch task");
      const taskData = await taskResponse.json();
      console.log("Fetched task data:", taskData);
      setTask(taskData);
    } catch (error) {
      console.error("Error fetching task:", error);
      setTask(null);
    }
  };

  const fetchComments = async () => {
    try {
      const commentResponse = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${id}/comments`,
        {
          headers: {
            Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
          },
          cache: "no-store",
        }
      );
      if (!commentResponse.ok) throw new Error("Failed to fetch comments");
      const commentData = await commentResponse.json();

      const flattenComments = (comments: any[]): CommentData[] => {
        let flat: CommentData[] = [];
        comments.forEach((c) => {
          const avatarUrl = c.author_avatar
            ? c.author_avatar.startsWith("http")
              ? c.author_avatar
              : `https://momentum.redberryinternship.ge/storage/employee-avatars/74FUyZqjtcKSZ130DTcl81jaSaOdsXeN1Ryew8aq.jpg`
            : null;

          flat.push({
            id: c.id,
            text: c.text,
            author_nickname: c.author_nickname || "Unknown Author",
            author_avatar: avatarUrl,
            parent_id: c.parent_id || null,
          });
          if (c.sub_comments && c.sub_comments.length > 0) {
            flat = flat.concat(flattenComments(c.sub_comments));
          }
        });
        return flat;
      };

      const mappedComments = flattenComments(commentData);
      setComments(mappedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTask();
      fetchComments();
    }
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
      const newStatusObj = statuses.find((status) => status.name === newStatus);
      if (!newStatusObj) return;
      const updatedTask: Task = { ...task, status: newStatusObj };
      setTask(updatedTask);
      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
          },
          body: JSON.stringify({ status_id: newStatusObj.id }),
        }
      );
      if (!response.ok) throw new Error("Failed to update task status");
      updateTask(updatedTask);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim() || !task) return;
    try {
      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
          },
          body: JSON.stringify({ text: commentText }),
        }
      );
      if (!response.ok) throw new Error("Failed to add comment");
      setCommentText("");
      await fetchComments();
      const updatedTask = { ...task, total_comments: task.total_comments + 1 };
      setTask(updatedTask);
      updateTask(updatedTask);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleReplySubmit = async (parentId: number) => {
    if (!replyText.trim() || !task) return;
    try {
      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
          },
          body: JSON.stringify({ text: replyText, parent_id: parentId }),
        }
      );
      if (!response.ok) throw new Error("Failed to add reply");
      setReplyText("");
      setReplyingTo(null);
      await fetchComments();
      const updatedTask = { ...task, total_comments: task.total_comments + 1 };
      setTask(updatedTask);
      updateTask(updatedTask);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  if (!task) {
    return (
      <div className={styles.container}>
        <h1>Loading...</h1>
      </div>
    );
  }

  // Corrected avatar source logic
  const avatarSrc =
    task.employee.avatar && typeof task.employee.avatar === "string"
      ? task.employee.avatar.startsWith("http")
        ? task.employee.avatar
        : `https://momentum.redberryinternship.ge/storage/employee-avatars/74FUyZqjtcKSZ130DTcl81jaSaOdsXeN1Ryew8aq.jpg`
      : "/default-avatar.jpg";

  console.log("Computed avatarSrc:", avatarSrc);

  return (
    <>
      {showEmployeeForm && (
        <AddForm onClose={() => setShowEmployeeForm(false)} />
      )}
      <div
        className={`${globalStyles.contentWrapper} ${
          showEmployeeForm ? globalStyles.blurred : ""
        }`}
      >
        <Header
          onAddEmployee={() => setShowEmployeeForm(true)}
          onAddTask={() => {}}
        />
        <div className={styles.container}>
          <div>
            <div className={styles.buttons}>
              <SixButtons
                priority={
                  task.priority.name
                    ? mapPriorityToIcon(task.priority.name)
                    : "low"
                }
                size="small"
              />
              <ColouredButton department={task.department.name} />
            </div>
            <h1 className={styles.h1}>Task Details: {task.name}</h1>
            <h2 className={styles.h2}>{task.description}</h2>
            <h4 className={styles.h4}>დავალების დეტალები</h4>
            <div className={styles.cards}>
              <div className={styles.cardzs}>
                <div className={styles.cardz}>
                  <Image
                    src="/pie-chart.svg"
                    width={24}
                    height={24}
                    alt="chart"
                  />
                  <p className={styles.p}>სტატუსი</p>
                </div>
                <Statusi
                  initialStatus={task.status.name}
                  onStatusChange={handleStatusChange}
                />
              </div>
              <div className={styles.cardzs}>
                <div className={styles.cardz}>
                  <Image src="/user.svg" width={24} height={24} alt="user" />
                  <p className={styles.p}>თანამშრომელი</p>
                </div>
                <Tanamshromeli
                  text={`${task.employee.name} ${task.employee.surname}`}
                  imageSrc={avatarSrc}
                />
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
                <p className={styles.date}>{task.due_date.split("T")[0]}</p>
              </div>
            </div>
          </div>

          <div className={styles.messages}>
            <div className={styles.relative}>
              <textarea
                className={styles.input}
                placeholder="type text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className={styles.button}>
                <CustomButton text="დააკომენტარე" onClick={handleAddComment} />
              </div>
            </div>
            <p className={styles.title}>კომენტარები</p>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className={styles.message}
                  style={{ marginLeft: comment.parent_id ? "20px" : "0" }}
                >
                  <Comment
                    name={comment.author_nickname}
                    imageSrc={comment.author_avatar || "/default-avatar.jpg"}
                    text={comment.text}
                    showLeft={comment.parent_id == null}
                    onReplyClick={() => setReplyingTo(comment.id)}
                  />
                  {replyingTo === comment.id && (
                    <div className={styles.relative}>
                      <textarea
                        className={styles.input}
                        placeholder="Type your reply"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className={styles.button}>
                        <CustomButton
                          text="დააკომენტარე"
                          onClick={() => handleReplySubmit(comment.id)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>კომენტარები არ არის</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
