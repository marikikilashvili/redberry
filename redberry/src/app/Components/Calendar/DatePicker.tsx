"use client";
import React, { useState } from "react";
import styles from "./DatePicker.module.scss";
import { DatePickerInput } from "./DatePickerInput";
import { DatePickerCalendar } from "./DatePickerCalendar";

export interface DatePickerProps {
  onChange?: (date: Date | null) => void;
  value?: Date | null;
}

export const DatePicker: React.FC<DatePickerProps> = ({ onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOk = () => {
    onChange?.(selectedDate);
    setIsOpen(false);
  };

  return (
    <section className={styles.datePicker}>
      <label className={styles.label}>დედლაინი</label>
      <div className={styles.container}>
        <DatePickerInput
          value={selectedDate}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <DatePickerCalendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onCancel={handleCancel}
            onOk={handleOk}
          />
        )}
      </div>
    </section>
  );
};

export default DatePicker;
