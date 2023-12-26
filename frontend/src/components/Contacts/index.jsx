import "./style.scss"
import Heading from "../common/Heading";

function Contacts() {
    function submit(e) {
        e.preventDefault()
    }

    return (
        <>
            <div className="contacts-wrapper">
                <div className="contacts-info">
                    <div className="left">
                        <Heading size={2}>Контакты</Heading>

                        <div className="info-bar">
                            <h3>Задайте нам любой вопрос</h3>
                            <p>+99833 4747477</p>
                        </div>
                        <div className="info-bar">
                            <h3>Электронная почта</h3>
                            <p>alisherxujanov163@gmail.com</p>
                        </div>
                        <div className="info-bar">
                            <h3>Юридический адрес</h3>
                            <p>Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Напоивший снова коварный которой, одна курсивных имеет предложения не. Запятых назад рыбными родного проектах необходимыми единственное своих продолжил толку мир.</p>
                        </div>
                    </div>
                    <div className="right">
                        <form onSubmit={submit}>
                            <input type="text" placeholder="Ваше полное имя" required />
                            <input type="email" placeholder="Email" required />
                            <input type="text" placeholder="Телефон" required />
                            <button className="submit">
                                Отправить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contacts;