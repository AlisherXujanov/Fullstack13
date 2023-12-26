import "./style.scss"
import AboutImage from "../../assets/images/about.png"
import Licence from "../../assets/icons/licence.png"
import Heading from "../common/Heading"
import Values from "./Values.jsx"
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
            <CarouselComponent images={images} />


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

        </div>
    );
}

export default About;