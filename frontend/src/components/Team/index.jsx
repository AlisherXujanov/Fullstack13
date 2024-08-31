import Heading from "../common/Heading";
import "./style.scss";
import firstImage from "../../assets/images/1.png";
import secondImage from "../../assets/images/2.png";
import Member from "./Member";
import { useEffect } from "react";

function Team(props) {
  function goToTopSmoothly() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    document.title = "Team Members";
    goToTopSmoothly()
  }, [])

  return (
    <main className="team-page-wrapper">
      <Heading size={1.2}>Наша команда</Heading>

      <div className="text-wrapper">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam is
          cupiditate tempora deserunt numquam aliquam aspernatur impedit? Cumque
          laudantium quae, distinctio asperiores, beatae magnam quos repudiandae
          reiciendis, quas nulla dolor deserunt.lorem laudantium quae,reiciendis,
          distinctio asperiores, beatae magnam quos repudiandae reiciendis, quas
          nulla dolor deserunt.lorem
        </p>
      </div>


      <div className={props.grayscale ? "all-members-wrapper grayscale" : "all-members-wrapper"}>
        <Member name="Эрджан Мусин" title="CFO" image={firstImage} />
        <Member name="Олжас Укенов" title="CEO" image={secondImage} />
        <Member name="Эрджан Мусин" title="CFO" image={firstImage} />
        <Member name="Олжас Укенов" title="CEO" image={secondImage} />
        <Member name="Эрджан Мусин" title="CFO" image={firstImage} />
        <Member name="Олжас Укенов" title="CEO" image={secondImage} />

      </div>

      <div className="section">
        <Heading size={1.2}> Сторонники и Партнеры</Heading>
        <br />
        <div className="infos">
          <h2>SeedBox</h2>
          <h2>Freedom Finance</h2>
        </div>
      </div>
    </main>
  );
}

export default Team;
