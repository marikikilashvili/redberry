"use client";
import { useState } from "react";
import Header from "./Components/Header/Header";
import Choices3 from "./Components/Choices3/Choices3";
import Cards from "./Components/Cards/Cards";
import Filter from "./Components/Filter/Filter";
import styles from "./page.module.css";
import cardStyles from "./Components/Cards/Cards.module.scss";
import { useTaskLogic } from "./useTascLogic";
import AddForm from "./Components/AddForm/AddForm";

export default function Home() {
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

  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <>
      {/* Render forms first */}
      {showEmployeeForm && (
        <AddForm onClose={() => setShowEmployeeForm(false)} />
      )}
      {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}

      {/* Wrap both header and content in the blur container */}
      <div
        className={`${styles.contentWrapper} ${
          showEmployeeForm || showTaskForm ? styles.blurred : ""
        }`}
      >
        <Header
          onAddEmployee={() => setShowEmployeeForm(true)}
          onAddTask={() => setShowTaskForm(true)}
        />

        <div className={styles.container}>
          <h1 className={styles.h1}>დავალებების გვერდი</h1>

          <div className={styles.Choices3}>
            <Choices3
              departments={departments}
              priorities={priorities}
              employees={employees}
              filters={filters}
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
