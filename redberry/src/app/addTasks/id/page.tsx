"use client";
import { useState } from "react";
import Department from "../../Components/Department/Department";
import EmployeesDropdown from "../../Components/Employees/Employees";
import Priority from "../../Components/Priority/Priority";
import Statusi from "../../Components/Statusi/Statusi";
import styles from "./page.module.scss";
import { useTaskContext } from "../../TaskContext";

export default function AddTaskPage() {
  const { departments, statuses, createTask } = useTaskContext();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("დასაწყები");
  const [selectedPriorityId, setSelectedPriorityId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    department: "",
    employee: "",
    priority: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      department: "",
      employee: "",
      priority: "",
    };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Task name is required.";
      isValid = false;
    }

    if (!selectedDepartment) {
      newErrors.department = "Please select a department.";
      isValid = false;
    }

    if (!selectedEmployee) {
      newErrors.employee = "Please select an employee.";
      isValid = false;
    }

    if (!selectedPriorityId) {
      newErrors.priority = "Please select a priority.";
      isValid = false;
    }

    if (dueDate) {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        setDateError("Due date must be today or in the future.");
        isValid = false;
      } else {
        setDateError("");
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const statusObj = statuses.find((status) => status.name === selectedStatus);
    const statusId = statusObj ? statusObj.id : 1;

    const taskData = {
      name,
      description,
      due_date: dueDate ? `${dueDate} 00:00:00` : undefined,
      status_id: statusId,
      priority_id: parseInt(selectedPriorityId, 10),
      employee_id: parseInt(selectedEmployee, 10),
      department_id: parseInt(selectedDepartment, 10),
    };

    console.log("Task data being sent:", taskData);

    try {
      await createTask(taskData);
      alert("Task created successfully!");
      setName("");
      setDescription("");
      setDueDate("");
      setSelectedPriorityId("");
      setSelectedStatus("დასაწყები");
      setSelectedDepartment("");
      setSelectedEmployee("");
      setDateError("");
      setErrors({ name: "", department: "", employee: "", priority: "" });
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task.");
    }
  };

  return (
    <>
      <div className={styles.main}>Create New Task</div>
      <form onSubmit={handleCreateTask}>
        <div className={styles.box}>
          <div className={styles.left}>
            <div>
              <input
                type="text"
                placeholder="Task Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>
            <div className={styles.Description}>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={styles.drops}>
              <Priority
                onPriorityChange={setSelectedPriorityId}
                initialPriorityId={selectedPriorityId}
              />
              <Statusi
                initialStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
              />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.department}>
              <Department
                onSelectDepartment={setSelectedDepartment}
                departments={departments}
              />
              {errors.department && (
                <p style={{ color: "red" }}>{errors.department}</p>
              )}
            </div>
            <div className={styles.employee}>
              <EmployeesDropdown
                selectedEmployee={selectedEmployee}
                onSelectEmployee={setSelectedEmployee}
                selectedDepartment={selectedDepartment}
              />
              {errors.employee && (
                <p style={{ color: "red" }}>{errors.employee}</p>
              )}
            </div>
            <div className={styles.date}>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              {dateError && <p style={{ color: "red" }}>{dateError}</p>}
            </div>
            <button type="submit" className={styles.create}>
              Create Task
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
