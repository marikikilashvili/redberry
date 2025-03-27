"use client";
import { useState } from "react";
import CustomButton from "./Components/CustomButton/CustomButton";
import ColouredButton from "./Components/ColouredButton/ColouredButton";
import CreateAccount from "./Components/CreateAccount/CreateAccount";
import CreateTanamsh from "./Components/CreateTanamsh/CreateTanamsh";
import SixButtons from "./Components/SixButtons/SixButtons";
import Left from "./Components/Left/Left";
import Daamate from "./Components/Daamate/Daamate";
import Tanamshromeli from "./Components/Tanamshromeli/Tanamshromeli";
import Comment from "./Components/Comment/Comment";
import Cards from "./Components/Cards/Cards";
import Header from "./Components/Header/Header";
import Chamoshla from "./Components/Chamoshla/Chamoshla";
import Checkbox from "./Components/Checkbox/Checkbox";
import WomanCheckbox from "./Components/WomanCheckbox/WomanCheckbox";
import Choices3 from "./Components/Choices3/Choices3";
import styles from "./page.module.css";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className={styles.container}>
      <Header />
      <Choices3 />


      <CustomButton text="Button" />
      <ColouredButton color="pink" />
      <ColouredButton color="orange" />
      <ColouredButton color="blue" />
      <ColouredButton color="yellow" />
      <CreateAccount text="შექმენი ახალი დავალება" />
      <CreateTanamsh text="თანამშრომლის შექმნა" />
      <SixButtons priority="high" size="small" />
      <SixButtons priority="medium" size="small" />
      <SixButtons priority="low" size="small" />
      <SixButtons priority="medium" size="big" />
      <SixButtons priority="low" size="big" />
      <SixButtons priority="high" size="big" />
      <Left text="უპასუხე" />
      <Daamate text="დაამატე თანამშრომელი" />
      <Tanamshromeli text="თამარ კვანტალია" imageSrc="/qali.jpg" />
      <Comment
        text="დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება, რომ ელემენტებს ჰქონდეს შესაბამისი რეზოლუცია."
        imageSrc="/qali2.jpg"
        name="ემილია მორგანი"
        showLeft={true}
      />
      <Comment
        name="ემილია მორგანი"
        imageSrc="/qali.jpg"
        text="დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება."
      />

      <Cards
        text="მზად ტესტირებისთვის"
        date="22 იანვ, 2022"
        title="Redberry-ს საიტის ლენდინგის დიზაინი"
        description="შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს, ნავიგაციას."
        imgSrc="/qali.jpg"
        comments={8}
      />
      <WomanCheckbox />
      <Checkbox
        checked={isChecked}
        onChange={setIsChecked}
        label="Sample Checkbox"
      />
    </div>
  );
}
