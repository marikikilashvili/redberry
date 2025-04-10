"use client";
import { useState } from "react";
import Department from "../../Components/Department/Department";
import { Formik, Form, Field } from "formik";
import EmployeesDropdown from "../../Components/Employees/Employees";
import Priority from "../../Components/Priority/Priority";
import Statusi from "../../Components/Statusi/Statusi";
import localStyles from "./page.module.scss"; 
import globalStyles from "../../page.module.css";
import { useTaskContext } from "../../TaskContext";
import Header from "../../Components/Header/Header";
import AddForm from "../../Components/AddForm/AddForm";

export default function AddTaskPage() {
  const { departments, statuses, createTask } = useTaskContext();
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  const initialValues = {
    name: "",
    description: "",
    dueDate: "",
    selectedDepartment: "",
    selectedEmployee: "",
    selectedStatus: "დასაწყები",
    selectedPriorityId: "",
  };

  const getMessageColor = (value, minLength) => {
    const length = value.trim().length;
    if (length === 0) return "grey";
    if (length < minLength || length > 255) return "red";
    return "green";
  };

  const validate = (values) => {
    const errors = {};
    if (values.name.trim().length < 3 || values.name.trim().length > 255) {
      errors.name = "min 3 symbols, max 255";
    }
    if (
      values.description.trim().length < 4 ||
      values.description.trim().length > 255
    ) {
      errors.description = "min 4 symbols, max 255";
    }
    if (!values.selectedDepartment) {
      errors.selectedDepartment = "Please select a department.";
    }
    if (!values.selectedEmployee) {
      errors.selectedEmployee = "Please select an employee.";
    }
    if (!values.selectedPriorityId) {
      errors.selectedPriorityId = "Please select a priority.";
    }
    if (!values.dueDate) {
      errors.dueDate = "Please select a due date";
    } else {
      const selectedDate = new Date(values.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.dueDate = "Due date must be today or in the future.";
      }
    }
    return errors;
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const statusObj = statuses.find(
      (status) => status.name === values.selectedStatus
    );
    const statusId = statusObj ? statusObj.id : 1;

    const taskData = {
      name: values.name,
      description: values.description,
      due_date: values.dueDate ? `${values.dueDate} 00:00:00` : undefined,
      status_id: statusId,
      priority_id: parseInt(values.selectedPriorityId, 10),
      employee_id: parseInt(values.selectedEmployee, 10),
      department_id: parseInt(values.selectedDepartment, 10),
    };

    console.log("Task data being sent:", taskData);

    try {
      await createTask(taskData);
      alert("Task created successfully!");
      resetForm();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {showEmployeeForm && (
        <AddForm onClose={() => setShowEmployeeForm(false)} />
      )}
      <div
        className={`${globalStyles.contentWrapper} ${
          showEmployeeForm ? globalStyles.blurred : ""
        }`}
      >
        <Header
          onAddEmployee={() => setShowEmployeeForm(true)}
          onAddTask={() => {}}
        />
        <div className={globalStyles.container}>
          <div className={localStyles.main}>Create New Task</div>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              setFieldValue,
              values,
              isSubmitting,
              isValid,
            }) => (
              <Form>
                <div className={localStyles.box}>
                  <div className={localStyles.left}>
                    <div>
                      <p className={localStyles.title}>სათაური*</p>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Task Name"
                        className={localStyles.nameField} // Apply nameField style
                      />
                      <div style={{ color: getMessageColor(values.name, 3) }}>
                        <p>მინიმუმ 3 სიმბოლო</p>
                        <p>მაქსიმუმ 255 სიმბოლო</p>
                      </div>
                    </div>
                    <div>
                      <p className={localStyles.title}>აღწერა*</p>

                      <Field
                        name="description"
                        as="textarea"
                        placeholder="Description"
                        className={localStyles.descriptionField} // Apply descriptionField style
                      />
                      <div
                        style={{
                          color: getMessageColor(values.description, 4),
                        }}
                      >
                        <p>მინიმუმ 4 სიმბოლო</p>
                        <p>მაქსიმუმ 255 სიმბოლო</p>
                      </div>
                    </div>
                    <div className={localStyles.drops}>
                      <Priority
                        onPriorityChange={(value) =>
                          setFieldValue("selectedPriorityId", value)
                        }
                        initialPriorityId={initialValues.selectedPriorityId}
                      />
                      <Statusi
                        initialStatus={initialValues.selectedStatus}
                        onStatusChange={(value) =>
                          setFieldValue("selectedStatus", value)
                        }
                      />
                    </div>
                  </div>
                  <div className={localStyles.right}>
                    <div className={localStyles.department}>
                      <Department
                        onSelectDepartment={(value) => {
                          setFieldValue("selectedDepartment", value);
                          setFieldValue("selectedEmployee", "");
                          console.log("Selected department:", value);
                        }}
                        departments={departments}
                      />
                      {touched.selectedDepartment &&
                        errors.selectedDepartment && (
                          <p style={{ color: "red" }}>
                            {errors.selectedDepartment}
                          </p>
                        )}
                    </div>
                    <div className={localStyles.employee}>
                      <EmployeesDropdown
                        selectedEmployee={values.selectedEmployee}
                        onSelectEmployee={(value) => {
                          setFieldValue("selectedEmployee", value);
                          console.log("Selected employee:", value);
                        }}
                        selectedDepartment={values.selectedDepartment}
                      />
                      {touched.selectedEmployee && errors.selectedEmployee && (
                        <p style={{ color: "red" }}>
                          {errors.selectedEmployee}
                        </p>
                      )}
                    </div>
                    <div className={localStyles.date}>
                      <Field name="dueDate" type="date" />
                      {touched.dueDate && errors.dueDate && (
                        <p style={{ color: "red" }}>{errors.dueDate}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className={localStyles.create}
                      disabled={!isValid || isSubmitting}
                    >
                      Create Task
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
