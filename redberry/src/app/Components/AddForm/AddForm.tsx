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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
    setAvatarFile(file);
  };

  const handleSubmit = async () => {
    if (!name || !surname || departmentId === null || !avatarFile) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("department_id", departmentId.toString());
    formData.append("avatar", avatarFile);

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

      if (response.ok) {
        await refreshEmployees();
        onClose();
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to create employee");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(error instanceof Error ? error.message : "Network error");
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
          <Saxeli label="სახელი*" value={name} onChange={setName} />
          <Saxeli label="გვარი*" value={surname} onChange={setSurname} />
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
          <CreateTanamsh text="გაუქმება" onClick={onClose} />
          <CreateAccount text="დაამატე თანამშრომელი" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AddForm;
