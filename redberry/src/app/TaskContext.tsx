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
  createTask: (taskData: Partial<Task>) => Promise<void>;
  refreshTasks: () => Promise<void>;
  refreshEmployees: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const BEARER_TOKEN = "Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchAllData = async () => {
    try {
      const headers = {
        Authorization: BEARER_TOKEN,
        "Content-Type": "application/json",
      };

      // Helper function to fetch and check response
      const fetchAndCheck = async (url: string, name: string) => {
        const res = await fetch(url, { headers });
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `Failed to fetch ${name}: ${res.status} - ${errorText}`
          );
        }
        return res.json();
      };

      // Fetch data sequentially to identify the failing request
      const tasksData = await fetchAndCheck("/api/tasks", "tasks");
      setTasks(tasksData);

      const deptsData = await fetchAndCheck("/api/departments", "departments");
      setDepartments(deptsData);

      const prioritiesData = await fetchAndCheck(
        "/api/priorities",
        "priorities"
      );
      setPriorities(prioritiesData);

      const statusesData = await fetchAndCheck("/api/statuses", "statuses");
      setStatuses(statusesData);

      const employeesData = await fetchAndCheck("/api/employees", "employees");
      setEmployees(employeesData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const createTask = async (taskData: Partial<Task>) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          Authorization: BEARER_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create task: ${response.status} - ${errorText}`
        );
      }

      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const refreshTasks = async () => {
    try {
      const response = await fetch("/api/tasks", {
        headers: {
          Authorization: BEARER_TOKEN,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch tasks");
      setTasks(await response.json());
    } catch (error) {
      console.error("Failed to refresh tasks:", error);
    }
  };

  const refreshEmployees = async () => {
    try {
      const response = await fetch("/api/employees", {
        headers: {
          Authorization: BEARER_TOKEN,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch employees");
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
        createTask,
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
