// src/app/components/forms/EmployeeForm.tsx
"use client";
import { Formik, Form } from "formik";
import Saxeli from "./Saxeli";
import { employeeSchema } from "../../../../src/lib/validationSchemas";
// import styles from React

interface EmployeeFormProps {
  onSubmit: (values: any) => void;
  initialValues?: {
    name: string;
    surname: string;
    department: string;
  };
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

          {/* Add other fields like department select */}

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
