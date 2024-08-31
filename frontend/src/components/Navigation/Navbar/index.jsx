import { Link } from "react-router-dom";
import Heading from "../../common/Heading";
import "./style.scss"

function Navbar() {
    return (
        <div className="nav-wrapper">
            <div className="logo">
                <h2>
                    <Link to={"/"}>
                        <Heading size={1.5}>Fonte</Heading>
                    </Link>
                </h2>
            </div>

            <div className="menu">
                <div className="nav-links">
                    <Link to="about">О нас</Link>
                    <Link to="team">Команда</Link>
                    <Link to="blog">Блог</Link>
                    <Link to="products">Продукты</Link>
                    <Link to="contacts">Контакты</Link>
                </div>

                <div className="auth">
                    <button className="warning-btn">Войти</button>
                    <a href="#">
                        <u>Рус</u>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;