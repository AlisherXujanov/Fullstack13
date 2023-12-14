import "./style.scss"
import AboutImage from "../../assets/images/about.png"
import Licence from "../../assets/icons/licence.png"
import Heading from "../common/Heading"

function About() {
    return (
        <div className="about-wrapper">
            <Heading size={2}>О нас</Heading>


            <div className="about-content">
                <img src={AboutImage}  alt="About" 
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
    );
}

export default About;