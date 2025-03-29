"use client";
import { useState, useEffect } from "react";
import CustomButton from "./Components/CustomButton/CustomButton";
import ColouredButton from "./Components/ColouredButton/ColouredButton";
import CreateAccount from "./Components/CreateAccount/CreateAccount";
import CreateTanamsh from "./Components/CreateTanamsh/CreateTanamsh";
import SixButtons from "./Components/SixButtons/SixButtons";
import Left from "./Components/Left/Left";
import Daamate from "./Components/Daamate/Daamate";
import Tanamshromeli from "./Components/Tanamshromeli/Tanamshromeli";
import Comment from "./Components/Comment/Comment";
import Cards from "./Components/Cards/Cards";
import Header from "./Components/Header/Header";
import Chamoshla from "./Components/Chamoshla/Chamoshla";
import Checkbox from "./Components/Checkbox/Checkbox";
import WomanCheckbox from "./Components/WomanCheckbox/WomanCheckbox";
import Choices3 from "./Components/Choices3/Choices3";
import styles from "./page.module.css";
import cardStyles from "./Components/Cards/Cards.module.scss";
import Pasuxismgebeli from "./Components/Pasuxismgebeli/Pasuxismgebeli";
import Department from "./Components/Department/Department";
import Saxeli from "./Components/Saxeli/Saxeli";
import Statusi from "./Components/Statusi/Statusi";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await fetch("https://momentum.redberryinternship.ge/api/tasks", {
          headers: { Authorization: `Bearer 9e8cef4c-74bc-47ef-97e3-2730de04c388` },
        });
        if (!taskResponse.ok) throw new Error("Fetch tasks failed");
        const taskResult = await taskResponse.json();
        console.log("Fetched Tasks:", taskResult);
        setTasks(taskResult || []);

        const deptResponse = await fetch("https://momentum.redberryinternship.ge/api/departments", {
          headers: { Authorization: `Bearer 9e8cef4c-74bc-47ef-97e3-2730de04c388` },
        });
        if (!deptResponse.ok) throw new Error("Fetch departments failed");
        const deptResult = await deptResponse.json();
        console.log("Fetched Departments:", deptResult);
        setDepartments(deptResult || []);

        const priorityResponse = await fetch("https://momentum.redberryinternship.ge/api/priorities", {
          headers: { Authorization: `Bearer 9e8cef4c-74bc-47ef-97e3-2730de04c388` },
        });
        if (!priorityResponse.ok) throw new Error("Fetch priorities failed");
        const priorityResult = await priorityResponse.json();
        console.log("Fetched Priorities:", priorityResult);
        setPriorities(priorityResult || []);

        const statusResponse = await fetch("https://momentum.redberryinternship.ge/api/statuses", {
          headers: { Authorization: `Bearer 9e8cef4c-74bc-47ef-97e3-2730de04c388` },
        });
        if (!statusResponse.ok) throw new Error("Fetch statuses failed");
        const statusResult = await statusResponse.json();
        console.log("Fetched Statuses:", statusResult);
        setStatuses(statusResult || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTasks([]);
        setDepartments([]);
        setPriorities([]);
        setStatuses([]);
      }
    };

    fetchData();
  }, []);

  const getColorClass = (statusName) => {
    switch (statusName) {
      case "დასაწყები":
        return cardStyles.yellow;
      case "პროგრესში":
        return cardStyles.orange;
      case "მზად ტესტირებისთვის":
        return cardStyles.pink;
      case "დასრულებული":
        return cardStyles.blue;
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>დავალებების გვერდი</h1>

      <div className={styles.Choices3}>
        <Choices3 departments={departments} priorities={priorities} statuses={statuses} />
      </div>

      <div className={styles.cardsContainer}>
        {statuses.map((status) => {
          const statusTasks = tasks.filter((task) => task.status.name === status.name);
          return (
            <div key={status.id} className={styles.column}>
              
              <button className={`${cardStyles.button} ${getColorClass(status.name)}`}>
                {status.name}
              </button>
              {statusTasks.length > 0 ? (
                statusTasks.map((task) => (
                  <Cards
                    key={task.id}
                    text={task.status.name}
                    date={task.due_date.split("T")[0]}
                    title={task.name}
                    description={task.description}
                    imgSrc={task.employee.avatar}
                    comments={0}
                  />
                ))
              ) : (
                <p>არაფერია</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}