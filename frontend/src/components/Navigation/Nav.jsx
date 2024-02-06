import Heading from "../common/Heading"
import { Link, useNavigate } from 'react-router-dom'
import { context } from "../../store"
import { useContext } from "react"
import { useTranslation } from "react-i18next";

// 1. Create a burger
// 2. Put the input checkbox onto the burger and make it invisible
// 3. Open the Nav-width div when the checkbox is checked

function Nav(props) {
    const { store, setStore } = useContext(context);
    const { t, i18n: { changeLanguage, language } } = useTranslation();

    const navigate = useNavigate();

    const handleChangeLanguage = () => {
        const newLanguage = language === "en" ? "ru" : "en";
        setStore({ type: "CHANGE_LANG", currentLanguage: newLanguage })
        changeLanguage(newLanguage);
    }

    const goToTeamsHash = () => {
        navigate('/about');
        setTimeout(() => {
            const element = document.getElementById('teams');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    };


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
                    <Link to={"/about"}>
                        About
                    </Link>
                    <button onClick={goToTeamsHash}>
                        Team
                    </button>
                    <Link to={"/blog"}>
                        Blog
                    </Link>
                    <Link to={"/products"}>
                        Products
                    </Link>
                    <Link to={"/contacts"}>
                        Contacts
                    </Link>
                </div>

                <div className="auth">
                    <button className="warning-btn">
                        Login
                    </button>
                    <span onClick={handleChangeLanguage}>
                        { language === "en" ? "Eng" : "Рус" }
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Nav;