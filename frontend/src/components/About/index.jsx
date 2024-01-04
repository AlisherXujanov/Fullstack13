import "./style.scss"
import AboutImage from "../../assets/images/about.png"
import Licence from "../../assets/icons/licence.png"
import Heading from "../common/Heading"
import Values from "./Values.jsx"
import Teams from "./Teams.jsx"
import Marquee from "../common/Marquee"
import CarouselComponent from "../common/Carousel"

import img1 from "../../assets/images/img-1.png"
import img2 from "../../assets/images/img-2.png"
import img3 from "../../assets/images/img-3.png"
import img4 from "../../assets/images/img-4.png"
import img5 from "../../assets/images/img-5.png"

function About() {
    const images = [img1, img2, img3, img4, img5]

    return (
        <div className="about-wrapper">
            <CarouselComponent images={images} blurred={true} >
                <h1>Хедж-фонд</h1>
                <p>Классический выбор профессиональных инвесторов с заданными умеренными параметрами риска. Основан на инвестировании в бумаги индекса S&P 500 с диверсификацией по 11 секторам экономики.</p>
                <button className="warning-btn">
                    Подробнее
                </button>
            </CarouselComponent>

            <div className="about-content">
                <Heading size={2}>О нас</Heading>
                <div className="content-info">
                    <img src={AboutImage} alt="About"
                        width={"100%"} height={400}
                    />
                    <div>
                        <p>Наша Команда успешно осуществляет деятельность на нескольких рынках инвестиций. Богатство выбора инструментов этих рынков позволяет Нам успешно сохранять и преумножать капитал клиентов. </p>
                        <br />
                        <p>Вступить в партнерство с Fonte могут как профессиональные инвестора, так и частные лица, только начинающие открывать для себя новые перспективы. Наша юрисдикция - Международный финансовый центр «Астана» (МФЦА). Комфортные налоговые условия и регуляторные политики обеспечивают необходимые свободы и преимущества для достижения целей инвестиций. </p>
                        <br />
                        <p>В партнерстве с Fonte Capital LTD, инвесторы имеют возможность воспользоваться не только проверенными стратегиями, но и смогут совместно разработать персональные инвестиционные решения.</p>
                        <br />

                        <button className="warning-btn">
                            <img src={Licence} alt="Licence" />
                            Лицензии
                        </button>
                    </div>
                </div>
            </div>

            <Marquee />

            <div className="values-content">
                <Heading size={2}>Наши ценности</Heading>
                <Values />
            </div>

            <Marquee reversed={true} />

            <div className="teams-content">
                <Heading size={2}>Наша команда</Heading>
                <Teams />
            </div>

        </div>
    );
}

export default About;