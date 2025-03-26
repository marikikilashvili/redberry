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

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
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
        showLeft={true} // Left will be rendered
      />
      <Comment
        name="ემილია მორგანი"
        imageSrc="/qali.jpg"
        text="დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება."
      />
      <Cards text="დასაწყები" />
    </div>
  );
}
