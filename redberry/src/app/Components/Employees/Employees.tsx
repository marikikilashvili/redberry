"use client";
import React, { useState } from "react";
import styles from "./Employees.module.scss";
import { useTaskContext } from "../../TaskContext"; // Adjust path
import Image from "next/image";
type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string | null;
  department: { id: number; name: string }; // Updated type
};

type EmployeesDropdownProps = {
  className?: string;
  selectedEmployee: string;
  onSelectEmployee: (id: string) => void;
  selectedDepartment: string;
};

const EmployeesDropdown = ({
  className,
  selectedEmployee,
  onSelectEmployee,
  selectedDepartment,
}: EmployeesDropdownProps) => {
  const { employees } = useTaskContext();
  const [isOpen, setIsOpen] = useState(false);

  // Debug log to inspect employees data
  console.log("Employees data:", employees);

  // Filter employees by selected department
  const filteredEmployees = selectedDepartment
    ? employees.filter(
        (emp) => emp.department?.id?.toString() === selectedDepartment
      )
    : employees;

  const handleClick = () => setIsOpen(!isOpen);

  const handleEmployeeClick = (employee: Employee) => {
    onSelectEmployee(employee.id.toString());
    setIsOpen(false);
  };

  const selected = employees.find(
    (emp) => emp.id.toString() === selectedEmployee
  );

  return (
    <div className={className || styles.className}>
      <p className={styles.title}>თანამშრომელი*</p>
      <div
        className={`${styles.box} ${isOpen ? styles.clicked : ""}`}
        onClick={handleClick}
      >
        <div className={styles.selectedEmployee}>
          {selected ? (
            <>
              <img
                className={styles.avatar}
                src={selected.avatar || "/images/default-avatar.png"}
                alt={`${selected.name} ${selected.surname}`}
              />
              <p>
                {selected.name} {selected.surname}
              </p>
            </>
          ) : (
            <p>თანამშრომელი</p>
          )}
        </div>
        <Image
          className={`${styles.img} ${isOpen ? styles.active : ""}`}
          src="/down.svg"
          width={14}
          height={14}
          alt="Toggle"
        />
      </div>
      {isOpen && (
        <div className={styles.newDiv}>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className={styles.dropdownItem}
                onClick={() => handleEmployeeClick(employee)}
              >
                <img
                  className={styles.avatar}
                  src={employee.avatar || "user.svg"}
                  alt={`${employee.name} ${employee.surname}`}
                />
                <p>
                  {employee.name} {employee.surname}
                </p>
              </div>
            ))
          ) : (
            <p>ამ დეპარტამენტში თანამშრომლები არ არიან</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeesDropdown;
