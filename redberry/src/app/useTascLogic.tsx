// app/useTaskLogic.tsx
import { useState, useEffect } from "react";

// Define types for your data
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
}

interface Filters {
  departments: string[];
  priorities: string[];
  employees: string[];
}

export const useTaskLogic = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filters, setFilters] = useState<Filters>({
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

  const filterTasks = (currentFilters: Filters) => {
    const { departments, priorities, employees } = currentFilters;

    const filtered = tasks.filter((task: Task) => {
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

      const employeeMatch =
        employees.length === 0 ||
        (taskEmployeeName &&
          employees
            .map((emp) => emp.toLowerCase())
            .includes(taskEmployeeName.toLowerCase()));

      return departmentMatch && priorityMatch && employeeMatch;
    });

    setFilteredTasks(filtered);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    filterTasks(newFilters);
  };

  const removeFilter = (category: keyof Filters, value: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      newFilters[category] = newFilters[category].filter(
        (item) => item !== value
      );
      filterTasks(newFilters);
      return newFilters;
    });
  };

  const getColorClass = (statusName: string) => {
    switch (statusName) {
      case "დასაწყები":
        return "yellow";
      case "პროგრესში":
        return "orange";
      case "მზად ტესტირებისთვის":
        return "pink";
      case "დასრულებული":
        return "blue";
      default:
        return "";
    }
  };

  return {
    tasks,
    filteredTasks,
    departments,
    priorities,
    statuses,
    employees,
    filters,
    handleFilterChange,
    removeFilter,
    getColorClass,
  };
};
