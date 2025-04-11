// src/app/components/AddForm/AddForm.tsx
"use client";
import { useState, useRef } from "react";
import { useTaskContext } from "../../TaskContext";
import Saxeli from "../Saxeli/Saxeli";
import styles from "./AddForm.module.scss";
import PhotoAdd from "../PhotoAdd/PhotoAdd";
import Department from "../Department/Department";
import CreateAccount from "../CreateAccount/CreateAccount";
import CreateTanamsh from "../CreateTanamsh/CreateTanamsh";
import Image from "next/image";

interface AddFormProps {
  onClose: () => void;
}

const AddForm = ({ onClose }: AddFormProps) => {
  const { departments, refreshEmployees } = useTaskContext();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
    setAvatarFile(file);
  };

  const getMessageColor = (value: string, minLength: number) => {
    const length = value.trim().length;
    if (length === 0) return "grey";
    if (length < minLength || length > 255) return "red";
    return "green";
  };

  const validateFields = () => {
    if (!name || name.trim().length < 2 || name.trim().length > 255)
      return false;
    if (!surname || surname.trim().length < 2 || surname.trim().length > 255)
      return false;
    if (departmentId === null || !avatarFile) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      alert(
        "Please fill all required fields correctly: Name (min 3, max 255), Surname (min 2, max 255), Department, and Avatar."
      );
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("department_id", departmentId.toString());
    formData.append("avatar", avatarFile);

    console.log("Submitting form data:", Array.from(formData.entries()));

    try {
      const response = await fetch(
        "https://momentum.redberryinternship.ge/api/employees",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer 9e8e518a-1003-41e0-acac-9d948b639c5d",
          },
          body: formData,
        }
      );

      const responseText = await response.text();
      console.log("API response:", responseText);

      if (response.ok) {
        console.log("Employee added, refreshing...");
        await refreshEmployees();
        console.log("Refresh done!");
        alert("Employee created successfully!");
        onClose();
      } else {
        const error = JSON.parse(responseText);
        throw new Error(error.message || "Failed to create employee");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(error instanceof Error ? error.message : "Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.container}>
        <div className={styles.cancel} onClick={onClose}>
          <Image src="/Cancel.svg" width={40} height={40} alt="cancel" />
        </div>

        <h2 className={styles.h2}>თანამშრომლის დამატება</h2>

        <div className={styles.saxeligvari}>
          <div>
            <Saxeli label="სახელი*" value={name} onChange={setName} />
            <div style={{ color: getMessageColor(name, 2) }}>
              <p>მინიმუმ 3 სიმბოლო</p>
              <p>მაქსიმუმ 255 სიმბოლო</p>
            </div>
          </div>
          <div>
            <Saxeli label="გვარი*" value={surname} onChange={setSurname} />
            <div style={{ color: getMessageColor(surname, 2) }}>
              <p>მინიმუმ 2 სიმბოლო</p>
              <p>მაქსიმუმ 255 სიმბოლო</p>
            </div>
          </div>
        </div>

        <div className={styles.photo}>
          <PhotoAdd
            preview={avatarPreview}
            onFileSelect={handleImageUpload}
            fileInputRef={fileInputRef}
          />
        </div>

        <div className={styles.Department}>
          <Department
            onSelectDepartment={(id: string) =>
              setDepartmentId(parseInt(id, 10))
            }
            departments={departments}
          />
        </div>

        <div className={styles.buttons}>
          <CreateTanamsh
            text="გაუქმება"
            onClick={onClose}
            disabled={isLoading}
          />
          <CreateAccount
            text={isLoading ? "დამატება..." : "დაამატე თანამშრომელი"}
            onClick={handleSubmit}
            disabled={isLoading || !validateFields()}
          />
        </div>
      </div>
    </div>
  );
};

export default AddForm;
