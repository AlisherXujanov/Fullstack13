import "./style.scss"
import { Outlet, Link } from "react-router-dom"
import Heading from "../common/Heading"

function Navigation() {
    return (
        <div>
            <nav id="navigation-wrapper">
                <div className="left">
                    <h1>
                        <Link to={"/"}>
                            <Heading size={3}>Fonte</Heading>
                        </Link>
                    </h1>
                </div>
                <div className="middle">
                    <Link to="/about">О нас</Link>
                    <Link to="/team">Команда</Link>
                    <Link to="/blog">Блог</Link>
                    <Link to="/products">Продукты</Link>
                    <Link to="/contacts">Контакты</Link>
                </div>
                <div className="right">
                    <button className="warning-btn">Войти</button>
                    <a href="/#ru">Рус</a>
                </div>
            </nav>

            <div id="outlet">
                <Outlet />
            </div>
        </div>
    );
}

export default Navigation;