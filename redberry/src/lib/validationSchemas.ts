// src/lib/validationSchemas.ts
import * as Yup from "yup";

export const georgianTextSchema = Yup.string()
  .min(2, "მინიმუმ 2 სიმბოლო")
  .max(255, "მაქსიმუმ 255 სიმბოლო")
  .required("აუცილებელი ველი");

export const employeeSchema = Yup.object().shape({
  name: georgianTextSchema,
  surname: georgianTextSchema,
  department: Yup.string().required("გთხოვთ აირჩიოთ დეპარტამენტი"),
});
