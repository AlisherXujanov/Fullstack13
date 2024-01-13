import "./style.scss"
import { Outlet } from 'react-router-dom';
import Nav from "./Nav.jsx"

function Navigation() {
    return (
        <div className="navigation-wrapper">
            <header>
                <Nav />
            </header>

            <Outlet />

            <footer>
                <small>Footer</small>
            </footer>
        </div>
    );
}

export default Navigation;