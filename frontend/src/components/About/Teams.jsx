import "./teams.scss"

import Img1 from "../../assets/images/teams/1.png"
import Img2 from "../../assets/images/teams/2.png"
import Img3 from "../../assets/images/teams/3.png"
import Img4 from "../../assets/images/teams/4.png"
import Img5 from "../../assets/images/teams/5.png"

const team_members = [
    { img: Img1, fullname: "Ержан Мусин", position: "CEO" },
    { img: Img2, fullname: "Олжас Укенов", position: "CFO" },
    { img: Img3, fullname: "Это Я-евич", position: "Programmer" },
    { img: Img4, fullname: "Годжо Сатторович", position: "МАГ" },
    { img: Img5, fullname: "Два Лисых", position: "ЛИСЫЙ" },
    { img: Img2, fullname: "Олжас Укенов", position: "CFO" },
]


function Teams(props) {
    return (
        <div className="teams-wrapper">
            <p>Команда Fonte Capital LTD – основа успеха. Каждый сотрудник Компании – это ценный актив в рабочем процессе фонда. Наша цель – создание такой рабочей атмосферы и условий, которые позволят максимально раскрыть потенциал каждого сотрудника для достижения максимального результата.</p>

            <div className="members">
                {
                    team_members.map((member, index) => {
                        return (
                            <div className="member-wrapper" key={index}>
                                <img
                                    src={member.img}
                                    alt="Member"
                                    height={170}
                                />
                                <br />
                                <h3>{member.fullname}</h3>
                                <p>{member.position.toUpperCase()}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Teams;