import "./style.scss"
import AboutImage from '../../assets/images/about.png'
import Licence from "../../assets/icons/licence.png"
function About() {
    return (
        <div className="about-wrapper">
            <div className="about-content">
                <h2>About</h2>
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