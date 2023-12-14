import "./style.scss"
import { Outlet } from "react-router-dom"

function Navigation() {
    return (
        <div>
            <nav id="navigation-wrapper">
                <div className="left">
                    <h1>Fonte</h1>
                </div>
                <div className="middle">
                    <a href="/#about">О нас</a>
                    <a href="/#team">Команда</a>
                    <a href="/#blog">Блог</a>
                    <a href="/#products">Продукты</a>
                    <a href="/#contacts">Контакты</a>
                </div>
                <div className="right">
                    <button>Войти</button>
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