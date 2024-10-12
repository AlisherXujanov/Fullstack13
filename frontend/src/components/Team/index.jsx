import Heading from "../common/Heading";
import "./style.scss";
import firstImage from "../../assets/images/1.png";
import secondImage from "../../assets/images/2.png";
import thirdImage from "../../assets/images/3.png";
import fourthImage from "../../assets/images/4.png";
import fiveImage from "../../assets/images/5.png";
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

      <div className="text-wrapper">
        <div class="team-section">
          <h2><Heading size={1.2}>Наша команда</Heading></h2>
            <p class="team-intro">
                Мы — это группа профессионалов, объединённых общей целью: создавать качественные, инновационные и эффективные решения для наших клиентов.
                Каждый из нас вносит свой уникальный вклад, что позволяет нам достигать выдающихся результатов в наших проектах.
            </p>

          <ul class="team-list">
              <li>
                  <h3>Опыт и экспертиза</h3>
                  <p>Каждый член нашей команды имеет глубокие знания в своей области, что позволяет нам справляться с задачами любой сложности.</p>
              </li>
              <li>
                  <h3>Креативный подход</h3>
                  <p>Мы не просто следуем трендам, мы их создаём, предлагая нестандартные решения для бизнеса.</p>
              </li>
              <li>
                  <h3>Клиентоориентированность</h3>
                  <p>Мы всегда учитываем потребности наших клиентов и стремимся превзойти их ожидания.</p>
              </li>
              <li>
                  <h3>Работа в команде</h3>
                  <p>Слаженная работа и обмен опытом внутри команды позволяют нам адаптироваться к изменениям и оставаться эффективными.</p>
              </li>
          </ul>
        </div> 
      </div>


      <div className={props.grayscale ? "all-members-wrapper grayscale" : "all-members-wrapper"}>
        <a href="https://github.com/AlisherXujanov"><Member name="Алишер Худжанов" title="CFO" image={firstImage} /></a>
        <a href="https://github.com/azim0nt"><Member name="Azim0nt" title="CEO" image={secondImage} /></a>  
        <a href="https://github.com/Islom1214"><Member name="Islom" title="CFO" image={thirdImage} /></a>
        <Member name="Max Batmanbek" title="CEO" image={fourthImage} />
        <Member name="Леша" title="CFO" image={fiveImage} />
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
