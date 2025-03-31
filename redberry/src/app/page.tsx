"use client";
import { useState, useEffect } from "react";
import Choices3 from "./Components/Choices3/Choices3";
import Cards from "./Components/Cards/Cards";
import Filter from "./Components/Filter/Filter";
import styles from "./page.module.css";
import cardStyles from "./Components/Cards/Cards.module.scss";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({
    departments: [],
    priorities: [],
    employees: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await fetch(
          "https://momentum.redberryinternship.ge/api/tasks",
          {
            headers: {
              Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
            },
          }
        );
        if (!taskResponse.ok)
          throw new Error(`Fetch tasks failed: ${taskResponse.status}`);
        const taskResult = await taskResponse.json();
        console.log("Fetched Tasks:", taskResult);
        setTasks(taskResult || []);
        setFilteredTasks(taskResult || []);

        const deptResponse = await fetch(
          "https://momentum.redberryinternship.ge/api/departments",
          {
            headers: {
              Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
            },
          }
        );
        if (!deptResponse.ok) throw new Error("Fetch departments failed");
        const deptResult = await deptResponse.json();
        console.log("Fetched Departments:", deptResult);
        setDepartments(deptResult || []);

        const priorityResponse = await fetch(
          "https://momentum.redberryinternship.ge/api/priorities",
          {
            headers: {
              Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
            },
          }
        );
        if (!priorityResponse.ok) throw new Error("Fetch priorities failed");
        const priorityResult = await priorityResponse.json();
        console.log("Fetched Priorities:", priorityResult);
        setPriorities(priorityResult || []);

        const statusResponse = await fetch(
          "https://momentum.redberryinternship.ge/api/statuses",
          {
            headers: {
              Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
            },
          }
        );
        if (!statusResponse.ok) throw new Error("Fetch statuses failed");
        const statusResult = await statusResponse.json();
        console.log("Fetched Statuses:", statusResult);
        setStatuses(statusResult || []);

        const employeeResponse = await fetch(
          "https://momentum.redberryinternship.ge/api/employees",
          {
            headers: {
              Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
            },
          }
        );
        if (!employeeResponse.ok) throw new Error("Fetch employees failed");
        const employeeResult = await employeeResponse.json();
        console.log("Fetched Employees:", employeeResult);
        setEmployees(employeeResult || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTasks([]);
        setFilteredTasks([]);
        setDepartments([]);
        setPriorities([]);
        setStatuses([]);
        setEmployees([]);
      }
    };

    fetchData();
  }, []);

  const filterTasks = (currentFilters) => {
    const { departments, priorities, employees } = currentFilters;

    console.log("Selected Filters - Employees:", employees);

    const filtered = tasks.filter((task) => {
      const departmentMatch =
        departments.length === 0 ||
        (task.department && departments.includes(task.department.name?.trim()));

      const priorityMatch =
        priorities.length === 0 ||
        (task.priority && priorities.includes(task.priority.name?.trim()));

      const taskEmployeeName = task.employee
        ? `${task.employee.name?.trim() || ""} ${
            task.employee.surname?.trim() || ""
          }`.trim()
        : null;
      console.log("Task Employee Name:", taskEmployeeName);

      const employeeMatch =
        employees.length === 0 ||
        (taskEmployeeName &&
          employees
            .map((emp) => emp.toLowerCase())
            .includes(taskEmployeeName.toLowerCase()));

      return departmentMatch && priorityMatch && employeeMatch;
    });

    console.log("Filtered Tasks:", filtered);
    setFilteredTasks(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    filterTasks(newFilters);
  };

  const removeFilter = (category, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      newFilters[category] = newFilters[category].filter(
        (item) => item !== value
      );
      filterTasks(newFilters);
      return newFilters;
    });
  };

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
        <Choices3
          departments={departments}
          priorities={priorities}
          employees={employees}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div>
        <Filter filters={filters} onRemoveFilter={removeFilter} />
      </div>
      <div className={styles.cardsContainer}>
        {statuses.length > 0 ? (
          statuses.map((status) => {
            const statusTasks = filteredTasks.filter(
              (task) => task.status.name === status.name
            );
            return (
              <div key={status.id} className={styles.column}>
                <button
                  className={`${cardStyles.button} ${getColorClass(
                    status.name
                  )}`}
                >
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
                      imgSrc={task.employee.avatar || "/default-avatar.jpg"}
                      comments={0}
                      priority={task.priority.name}
                      department={
                        task.department?.name || "უცნობი დეპარტამენტი"
                      }
                    />
                  ))
                ) : (
                  <p>ამ სტატუსში დავალებები არ არის</p>
                )}
              </div>
            );
          })
        ) : (
          <p>სტატუსები ვერ ჩაიტვირთა</p>
        )}
      </div>
    </div>
  );
}
