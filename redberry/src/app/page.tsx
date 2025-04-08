"use client";
import { useState } from "react";
import Header from "./Components/Header/Header";
import Choices3 from "./Components/Choices3/Choices3";
import Cards from "./Components/Cards/Cards";
import Filter from "./Components/Filter/Filter";
import styles from "./page.module.css"; // Adjust path if needed
import cardStyles from "./Components/Cards/Cards.module.scss";
import { useTaskLogic } from "./useTascLogic"; // Your custom hook for task logic
import AddForm from "./Components/AddForm/AddForm";

export default function Home() {
  // Fetch task-related data using your custom hook
  const {
    filteredTasks,
    departments,
    priorities,
    statuses,
    employees,
    filters,
    handleFilterChange,
    removeFilter,
    getColorClass,
  } = useTaskLogic();

  // State for showing the employee creation form
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  return (
    <>
      {/* Employee creation form (modal) */}
      {showEmployeeForm && (
        <AddForm onClose={() => setShowEmployeeForm(false)} />
      )}

      {/* Main content with blur effect when form is open */}
      <div
        className={`${styles.contentWrapper} ${
          showEmployeeForm ? styles.blurred : ""
        }`}
      >
        {/* Header with navigation to employee and task creation */}
        <Header
          onAddEmployee={() => setShowEmployeeForm(true)}
          onAddTask={() => {}} // Handled internally in Header
        />

        {/* Main content container */}
        <div className={styles.container}>
          <h1 className={styles.h1}>დავალებების გვერდი</h1>

          {/* Filter dropdowns */}
          <div className={styles.Choices3}>
            <Choices3
              departments={departments}
              priorities={priorities}
              employees={employees}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Active filters display */}
          <div>
            <Filter filters={filters} onRemoveFilter={removeFilter} />
          </div>

          {/* Task columns by status */}
          <div className={styles.cardsContainer}>
            {statuses.length > 0 ? (
              statuses.map((status) => {
                const statusTasks = filteredTasks.filter(
                  (task) => task.status.name === status.name
                );
                return (
                  <div key={status.id} className={styles.column}>
                    <button
                      className={`${cardStyles.button} ${
                        cardStyles[getColorClass(status.name)]
                      }`}
                    >
                      {status.name}
                    </button>
                    {statusTasks.length > 0 ? (
                      statusTasks.map((task) => (
                        <Cards
                          id={task.id}
                          key={task.id}
                          text={task.status?.name || "Unknown Status"}
                          date={task.due_date.split("T")[0]}
                          title={task.name}
                          description={task.description}
                          imgSrc={
                            task.employee?.avatar || "/default-avatar.jpg"
                          }
                          comments={task.total_comments}
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
      </div>
    </>
  );
}
