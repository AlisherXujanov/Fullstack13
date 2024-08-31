import Heading from "../common/Heading"
import BagImage from "../../assets/icons/bag.png"
import DiamondImage from "../../assets/icons/diamond.png"
import HandShakeImage from "../../assets/icons/handShake.png"
import GraphImage from "../../assets/icons/graph.png"

function OurValues(props) {
    return (
        <div className="values-section-wrapper">
            <Heading size={1.2}>Our Values</Heading>

            <div className="content">
                {/* ----------------------------------------------- */}
                <div className="value">
                    <img src={DiamondImage} alt="" />
                    <div className="right">
                        <h1>Стабильность</h1>
                        <p>Сохранность капитала клиентов приоритетнее доходности - каждое решение взвешено, обдумано и оценено.</p>
                    </div>
                </div>
                {/* ----------------------------------------------- */}
                <div className="value">
                    <img src={GraphImage} alt="" />
                    <div className="right">
                        <h1>Устойчивость</h1>
                        <p>Устойчивое развитие — основа нашей бизнес-модели. Начиная с поиска и оценки предоставившихся возможностей для бизнеса до последовательного развития наших проектов и реаллокации капитала в новые возможности.</p>
                    </div>
                </div>
                {/* ----------------------------------------------- */}
                <div className="value">
                    <img src={BagImage} alt="" />
                    <div className="right">
                        <h1>Команда</h1>
                        <p>Команда Fonte Capital LTD – основа успеха. Каждый сотрудник Компании – это ценный актив в рабочем процессе фонда. Наша цель – создание такой рабочей атмосферы и условий, которые позволят максимально раскрыть потенциал каждого сотрудника для достижения максимального результата.</p>
                    </div>
                </div>
                {/* ----------------------------------------------- */}
                <div className="value">
                    <img src={HandShakeImage} alt="" />
                    <div className="right">
                        <h1>Репутация</h1>
                        <p>Ответственность и этика – основа нашей деятельности. Деятельность в рамках лучших практик (Корпоративный Кодекс этики и стандарты профессионального поведения) позволяет предлагать клиентам более качественные инвестиционные продукты, отвечающие высоким требованиям и ожиданиям самых требовательных клиентов.</p>
                    </div>
                </div>
                {/* ----------------------------------------------- */}
            </div>
        </div>
    );
}

export default OurValues;