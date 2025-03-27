import styles from "./Header.module.scss";
import Image from "next/image";
import CreateTanamsh from "../CreateTanamsh/CreateTanamsh";
import CreateAccount from "../CreateAccount/CreateAccount";

const Header = () => {
  return (
    <div className={styles.container}>
      <div>
        <Image
          src="/header.svg"
          width={210}
          height={38}
          alt="header image"
        ></Image>
      </div>
      <div className={styles.buttons}>
        <CreateTanamsh text="თანამშრომლის შექმნა" />
        <CreateAccount text="შექმენი ახალი დავალება" />
      </div>
    </div>
  );
};

export default Header;
