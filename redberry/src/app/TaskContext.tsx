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
          fetch("/api/tasks"),
          fetch("/api/departments"),
          fetch("/api/priorities"),
          fetch("/api/statuses"),
          fetch("/api/employees"),
        ]);

      if (!tasksRes.ok) throw new Error("Failed to fetch tasks");
      if (!deptsRes.ok) throw new Error("Failed to fetch departments");
      if (!prioritiesRes.ok) throw new Error("Failed to fetch priorities");
      if (!statusesRes.ok) throw new Error("Failed to fetch statuses");
      if (!employeesRes.ok) throw new Error("Failed to fetch employees");

      setTasks(await tasksRes.json());
      setDepartments(await deptsRes.json());
      setPriorities(await prioritiesRes.json());
      setStatuses(await statusesRes.json());
      setEmployees(await employeesRes.json());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const createTask = async (taskData: Partial<Task>) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
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
      const response = await fetch("/api/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      setTasks(await response.json());
    } catch (error) {
      console.error("Failed to refresh tasks:", error);
    }
  };

  const refreshEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
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
