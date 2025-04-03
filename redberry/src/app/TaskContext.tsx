"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Department {
  name: string;
}

interface Priority {
  name: string;
}

interface Status {
  id: number;
  name: string;
}

interface Employee {
  name: string;
  surname: string;
  avatar?: string;
}

interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: Status;
  priority: Priority;
  department: Department;
  employee: Employee;
  total_comments: number;
}

interface TaskContextType {
  tasks: Task[];
  updateTask: (task: Task) => void; // Added for status updates
  departments: Department[];
  priorities: Priority[];
  statuses: Status[];
  employees: Employee[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (tasks.length > 0) return; // Skip if data is already fetched
      try {
        const taskResponse = await fetch(
          "https://momentum.redberryinternship.ge/api/tasks",
          {
            headers: {
              Authorization: `Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d`,
            },
          }
        );
        if (!taskResponse.ok) throw new Error("Fetch tasks failed");
        const taskResult = await taskResponse.json();
        setTasks(taskResult || []);

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
        setEmployees(employeeResult || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        updateTask,
        departments,
        priorities,
        statuses,
        employees,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};
