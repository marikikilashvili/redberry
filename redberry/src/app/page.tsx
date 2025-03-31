"use client";
import Choices3 from "./Components/Choices3/Choices3";
import Cards from "./Components/Cards/Cards";
import Filter from "./Components/Filter/Filter";
import styles from "./page.module.css";
import cardStyles from "./Components/Cards/Cards.module.scss";
import { useTaskLogic } from "./useTascLogic";

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

  return (
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
                      key={task.id}
                      text={task.status?.name || "Unknown Status"} // Add fallback
                      date={task.due_date.split("T")[0]}
                      title={task.name}
                      description={task.description}
                      imgSrc={task.employee.avatar || "/default-avatar.jpg"}
                      comments={0}
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
  );
}
