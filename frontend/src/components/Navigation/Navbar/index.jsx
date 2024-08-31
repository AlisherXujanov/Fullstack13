import { Link, NavLink } from "react-router-dom";
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
                    <NavLink to="about" activeClassName="active">О нас</NavLink>
                    <NavLink to="team" activeClassName="active">Команда</NavLink>
                    <NavLink to="blog" activeClassName="active">Блог</NavLink>
                    <NavLink to="products" activeClassName="active">Продукты</NavLink>
                    <NavLink to="contacts" activeClassName="active">Контакты</NavLink>
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