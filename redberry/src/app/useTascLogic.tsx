import { useState, useMemo } from "react";
import { useTaskContext } from "./TaskContext"; // Adjust path

interface Filters {
  departments: string[];
  priorities: string[];
  employees: string[];
}

export const useTaskLogic = () => {
  const { tasks, departments, priorities, statuses, employees } = useTaskContext();
  const [filters, setFilters] = useState<Filters>({
    departments: [],
    priorities: [],
    employees: [],
  });

  const filteredTasks = useMemo(() => {
    const { departments, priorities, employees } = filters;

    return tasks.filter((task) => {
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
  }, [tasks, filters]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const removeFilter = (category: keyof Filters, value: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      newFilters[category] = newFilters[category].filter((item) => item !== value);
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