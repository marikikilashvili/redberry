"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Department {
  id: number;
  name: string;
}

interface Priority {
  id: number;
  name: string;
}

interface Status {
  id: number;
  name: string;
}

interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar?: string;
  department: Department;
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
  departments: Department[];
  priorities: Priority[];
  statuses: Status[];
  employees: Employee[];
  updateTask: (updatedTask: Task) => void;
  refreshTasks: () => Promise<void>;
  refreshEmployees: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchAllData = async () => {
    try {
      const [tasksRes, deptsRes, prioritiesRes, statusesRes, employeesRes] =
        await Promise.all([
          fetch("https://momentum.redberryinternship.ge/api/tasks", {
            headers: {
              Authorization: "Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d",
            },
          }),
          fetch("https://momentum.redberryinternship.ge/api/departments", {
            headers: {
              Authorization: "Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d",
            },
          }),
          fetch("https://momentum.redberryinternship.ge/api/priorities", {
            headers: {
              Authorization: "Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d",
            },
          }),
          fetch("https://momentum.redberryinternship.ge/api/statuses", {
            headers: {
              Authorization: "Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d",
            },
          }),
          fetch("https://momentum.redberryinternship.ge/api/employees", {
            headers: {
              Authorization: "Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d",
            },
          }),
        ]);

      setTasks(await tasksRes.json());
      setDepartments(await deptsRes.json());
      setPriorities(await prioritiesRes.json());
      setStatuses(await statusesRes.json());
      setEmployees(await employeesRes.json());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const refreshTasks = async () => {
    try {
      const response = await fetch(
        "https://momentum.redberryinternship.ge/api/tasks",
        {
          headers: {
            Authorization: "Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d",
          },
        }
      );
      setTasks(await response.json());
    } catch (error) {
      console.error("Failed to refresh tasks:", error);
    }
  };

  const refreshEmployees = async () => {
    try {
      const response = await fetch(
        "https://momentum.redberryinternship.ge/api/employees",
        {
          headers: {
            Authorization: "Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d",
          },
        }
      );
      setEmployees(await response.json());
    } catch (error) {
      console.error("Failed to refresh employees:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        departments,
        priorities,
        statuses,
        employees,
        updateTask,
        refreshTasks,
        refreshEmployees,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
