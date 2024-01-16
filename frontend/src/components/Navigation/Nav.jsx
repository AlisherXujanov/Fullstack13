import { Link } from 'react-router-dom';
import Heading from '../common/Heading'

function Nav() {
    return (
        <nav>
            <div className="left">
                <Heading size={1.5}>Fonte</Heading>
            </div>
            <div className="middle">
                <Link to={'about'}>О нас</Link>
                <Link to={'team'}>Команда</Link>
                <Link to={'blog'}>Блог</Link>
                <Link to={'products'}>Продукты</Link>
                <Link to={'contacts'}>Контакты</Link>
            </div>
            <div className="right">
                <button className='warning-btn'>
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