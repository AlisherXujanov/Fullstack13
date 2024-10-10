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
        Наша команда
          Мы — это группа профессионалов, объединённых общей целью: создавать качественные, инновационные и эффективные решения для наших клиентов. В команде собраны специалисты разных областей — от разработчиков и дизайнеров до маркетологов и проектных менеджеров. Каждый из нас вносит свой уникальный вклад, благодаря чему мы достигаем выдающихся результатов в наших проектах.

          Почему мы?
          Опыт и экспертиза: Каждый член нашей команды имеет глубокие знания в своей области, что позволяет нам справляться с задачами любой сложности.
          Креативный подход: Мы не просто следуем трендам, мы их создаём, предлагая креативные и нестандартные решения для бизнеса.
          Клиентоориентированность: Мы всегда учитываем потребности наших клиентов и стремимся превзойти их ожидания.
          Работа в команде: Слаженная работа и обмен опытом внутри команды позволяют нам быстро адаптироваться к изменениям и оставаться на пике эффективности.
          Мы гордимся тем, что каждый проект — это результат тесного сотрудничества между всеми членами команды, где каждый голос важен, а вклад каждого ценен.
        </p>
      </div>


      <div className={props.grayscale ? "all-members-wrapper grayscale" : "all-members-wrapper"}>
        <a href="https://github.com/AlisherXujanov"><Member name="Алишер Худжанов" title="CFO" image={firstImage} /></a>
        <a href="https://github.com/azim0nt"><Member name="Azim0nt" title="CEO" image={secondImage} /></a>  
        <a href="https://github.com/Islom1214"><Member name="Эрджан Мусин" title="CFO" image={firstImage} /></a>
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
