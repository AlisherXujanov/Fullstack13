import "./style.scss"
import Heading from "../common/Heading"
import ImageAbout from "../../assets/images/about.png"
import { TbLicense } from "react-icons/tb"
import { useEffect } from 'react'
import Lycence from "../../assets/images/certificates/second.png"
import { useContext } from "react"
import { globalContext } from "../../store/index.js"


function About() {
  const state = useContext(globalContext)

  useEffect(() => {
    document.title = "About Us";
  }, []);

  return (
    <main className="about-page-wrapper">
      <Heading size={1.4}>О нас</Heading>

      <div className="content-wrapper">
        <img src={ImageAbout} alt="ImageAbout" width={"100%"} height={450} />

        <div className="info">
          <p>Наша Команда успешно осуществляет деятельность на нескольких рынках инвестиций. Богатство выбора инструментов этих рынков позволяет Нам успешно сохранять и преумножать капитал клиентов. </p>
          <p>Вступить в партнерство с Fonte могут как профессиональные инвестора, так и частные лица, только начинающие открывать для себя новые перспективы. Наша юрисдикция - Международный финансовый центр «Астана» (МФЦА). Комфортные налоговые условия и регуляторные политики обеспечивают необходимые свободы и преимущества для достижения целей инвестиций. </p>
          <p>В партнерстве с Fonte Capital LTD, инвесторы имеют возможность воспользоваться не только проверенными стратегиями, но и смогут совместно разработать персональные инвестиционные решения.</p>
          <a className="warning-btn" href={Lycence} download={"Lycence"} style={{ display: "inline-block"}}>
            <TbLicense /> Лицензии
          </a>

        </div>
      </div>

    </main>
  );
}

export default About;
