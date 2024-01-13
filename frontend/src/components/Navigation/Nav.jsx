import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <div className="left">
                <h2>Fonte</h2>
            </div>
            <div className="middle">
                <Link to={'about'}>О нас</Link>
                <Link to={'team'}>Команда</Link>
                <Link to={'blog'}>Блог</Link>
                <Link to={'products'}>Продукты</Link>
                <Link to={'contacts'}>Контакты</Link>
            </div>
            <div className="right">
                <button className='btn-warning'>
                    Войти
                </button>
                <span className='lang-toggler'>
                    Рус
                </span>
            </div>
        </nav>
    );
}

export default Nav;