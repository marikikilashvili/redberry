"use client";
import React, { useState } from "react";
import styles from "./Priority.module.scss";
import { useTaskContext } from "../../TaskContext"; // Adjust path

type PriorityItem = {
  id: number;
  name: string;
  icon: string;
};

type Props = {
  onPriorityChange: (priorityId: string) => void; // Callback to notify parent
  initialPriorityId?: string; // Optional initial priority ID
};

const Priority = ({ onPriorityChange, initialPriorityId }: Props) => {
  const { priorities } = useTaskContext(); // Get priorities from TaskContext
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<PriorityItem | null>(
    initialPriorityId
      ? priorities.find((p) => p.id.toString() === initialPriorityId) || null
      : null
  );

  const handleClick = () => setIsOpen(!isOpen);

  const handleSelect = (priority: PriorityItem) => {
    setSelectedPriority(priority);
    onPriorityChange(priority.id.toString()); // Notify parent of the selected priority ID
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <p
        className={`${styles.title} ${isOpen ? styles.titlepurp : ""}`}
        onClick={handleClick}
      >
        პრიორიტეტი*
      </p>
      <div
        className={`${styles.box} ${isOpen ? styles.clicked : ""}`}
        onClick={handleClick}
      >
        <div className={styles.selectedPriority}>
          {selectedPriority ? (
            <>
              <img
                src={selectedPriority.icon}
                alt={selectedPriority.name}
                className={styles.selectedPriorityIcon}
              />
              <p>{selectedPriority.name}</p>
            </>
          ) : (
            <p>პრიორიტეტები</p>
          )}
        </div>
        <img
          className={`${styles.img} ${isOpen ? styles.active : ""}`}
          src="/down.svg"
          alt="Toggle"
        />
      </div>
      {isOpen && (
        <div className={styles.newDiv}>
          {priorities.map((priority) => (
            <div
              key={priority.id}
              className={styles.priorityItem}
              onClick={() => handleSelect(priority)}
            >
              <img
                src={priority.icon}
                alt={priority.name}
                className={styles.priorityIcon}
              />
              <p>{priority.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Priority;
