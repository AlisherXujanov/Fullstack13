import "./style.scss"
import AboutImage from '../../assets/images/about.png'
import Licence from "../../assets/icons/licence.png"
import Heading from "../common/Heading"
import CarouselComponent from "../common/Carousel"

import Img1 from '../../assets/images/img1.png'
import Img2 from '../../assets/images/img2.png'
import Img3 from '../../assets/images/img3.png'
import Img4 from '../../assets/images/img4.png'
import Img5 from '../../assets/images/img5.png'

function About() {
    const images = [Img1, Img2, Img3, Img4, Img5]

    return (
        <div className="about-wrapper">
            <CarouselComponent images={images} blurred={true}/>

            <div className="about-content">
                <Heading size={1.8}>About</Heading>
                <div className="container">
                    <img src={AboutImage} width={"100%"} height={450} alt="Earth" />
                    <div>
                        <p>Наша Команда успешно осуществляет деятельность на нескольких рынках инвестиций. Богатство выбора инструментов этих рынков позволяет Нам успешно сохранять и преумножать капитал клиентов. </p>
                        <p>Вступить в партнерство с Fonte могут как профессиональные инвестора, так и частные лица, только начинающие открывать для себя новые перспективы. Наша юрисдикция - Международный финансовый центр «Астана» (МФЦА). Комфортные налоговые условия и регуляторные политики обеспечивают необходимые свободы и преимущества для достижения целей инвестиций. </p>
                        <p>В партнерстве с Fonte Capital LTD, инвесторы имеют возможность воспользоваться не только проверенными стратегиями, но и смогут совместно разработать персональные инвестиционные решения.</p>
                        <button className="warning-btn">
                            <img src={Licence} alt="Licence" />
                            Лицензии
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;