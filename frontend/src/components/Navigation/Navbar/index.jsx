import { Link, NavLink, useNavigate } from "react-router-dom"
import Heading from "../../common/Heading"
import Authentication from "../../Authentication"
import { useContext } from "react"
import { globalContext } from "../../../store"
import { fetchLogout } from "../../../store/helpers"
import { toast } from "react-toastify"

import "./style.scss"

function Navbar() {
    const state = useContext(globalContext)
    const navigate = useNavigate()

    function closeModal() {
        state.dispatch({ type: "SET_AUTH_MODAL", payload: false })
    }

    async function logout() {
        state.dispatch({ type: "LOGOUT" })
        await fetchLogout()
        navigate("/")
        toast.success("You have successfully logged out", { theme: "dark" })
    }

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
                    <NavLink to="about" className={({ isActive }) => isActive ? "active" : ""}>О нас</NavLink>
                    <NavLink to="team" className={({ isActive }) => isActive ? "active" : ""}>Команда</NavLink>
                    <NavLink to="blog" className={({ isActive }) => isActive ? "active" : ""}>Блог</NavLink>
                    <NavLink to="products" className={({ isActive }) => isActive ? "active" : ""}>Продукты</NavLink>
                    <NavLink to="contacts" className={({ isActive }) => isActive ? "active" : ""}>Контакты</NavLink>
                </div>

                <div className="auth">
                    {state.profile?.user?.username ?
                        <div className="logged-in-menu">
                            <h4>{state.profile?.user?.username}</h4>
                            <div className="content">
                                <button className="warning-btn" onClick={logout}>Выйти</button>
                            </div>
                        </div>
                        :
                        <div className="logged-out-menu">
                            <button className="warning-btn" onClick={() => state.dispatch({ type: "SET_AUTH_MODAL", payload: true })}>Войти</button>
                            {state.authModalOpened ?
                                <Authentication closeModal={closeModal} />
                                : null}
                        </div>
                    }
                    <a href="#">
                        <u>Рус</u>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Navbar;