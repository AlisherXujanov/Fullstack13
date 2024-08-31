import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'
import Footer from "./Footer"
import './style.scss'

function Navigation() {
    const [burgerMenuOpened, setBurgerMenuOpened] = useState(false)

    return (
        <div>
            <header>
                <div className={burgerMenuOpened ? "burger-menu-wrapper opened" : "burger-menu-wrapper"}>
                    <div className='top'></div>
                    <div className='middle'></div>
                    <div className='bottom'></div>
                </div>
                <input
                    id='burger-menu-toggler'
                    type="checkbox"
                    onClick={(e) => { setBurgerMenuOpened(e.target.checked) }}
                />
                {/* input:checked + .nav-wrapper > .menu */}
                <Navbar />
            </header>

            <div id='outlet'>
                <Outlet />
            </div>

            <footer id="footer">
                <Footer />
            </footer>
        </div>

    );
}

export default Navigation;