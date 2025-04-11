// src/app/components/forms/EmployeeForm.tsx
"use client";
import { Formik, Form } from "formik";
import Saxeli from "./Saxeli";
import { employeeSchema } from "../../../../src/lib/validationSchemas";
import styles from "./EmployeeForm.module.css";
interface FormValues {
  name: string;
  surname: string;
  department: string;
}

interface EmployeeFormProps {
  onSubmit: (values: FormValues) => void;
  initialValues?: FormValues;
}

const EmployeeForm = ({
  onSubmit,
  initialValues = { name: "", surname: "", department: "" },
}: EmployeeFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={employeeSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.formContainer}>
          <Saxeli label="სახელი" name="name" />
          <Saxeli label="გვარი" name="surname" />

          <div className={styles.formActions}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? "იგზავნება..." : "დადასტურება"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeForm;
