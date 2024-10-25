import { Link, NavLink, useNavigate } from "react-router-dom"
import Heading from "../../common/Heading"
import Authentication from "../../Authentication"
import { useEffect, useContext } from "react"
import { BASE_URL, globalContext } from "../../../store"
import { getUserProfile, fetchLogout } from "../../../store/helpers"
import { toast } from "react-toastify"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import "./style.scss"

function Navbar() {
  const state = useContext(globalContext)
  const navigate = useNavigate()
  const [, setIsLoading] = useState(false)
  const [profile, setProfile] = useState()

  useEffect(() => {
    fetchGetUserProfile()
  }, [])

  async function fetchGetUserProfile(profilePictureUpdate = false) {
    if (!profilePictureUpdate) {
      setIsLoading(true)
    }
    const userData = await getUserProfile()
    setIsLoading(false)
    setProfile(userData)
  }

  const { t, i18n: { changeLanguage, language } } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(language)

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ru" : "en"
    setCurrentLanguage(newLanguage)
    changeLanguage(newLanguage)
  }

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
          <NavLink
            to="about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("navigation.about-us")}
          </NavLink>
          <NavLink
            to="team"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("navigation.team")}
          </NavLink>
          <NavLink
            to="blog"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("navigation.blog")}
          </NavLink>
          <NavLink
            to="products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("navigation.products")}
          </NavLink>
          <NavLink
            to="contacts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("navigation.contacts")}
          </NavLink>
          <NavLink
            to="faq"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            FAQ
          </NavLink>
        </div>

        <div className="auth">
          {state.profile?.user?.username ? (
            <div className="logged-in-menu">
              <Link to="profile">
                <h4>
                  <img
                    src={BASE_URL + profile?.image}
                    alt=""
                    className="profile-img-in-navbar"
                  />
                  {state.profile?.user?.username}
                </h4>
              </Link>
              <div className="content">
                <button className="warning-btn" onClick={logout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF6600" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                  </svg>
                  Выйти
                </button>
              </div>
            </div>
          ) : (
            <div className="logged-out-menu">
              <button
                className="warning-btn"
                onClick={() =>
                  state.dispatch({ type: "SET_AUTH_MODAL", payload: true })
                }
              >
                Войти
              </button>
              {state.authModalOpened ? (
                <Authentication closeModal={closeModal} />
              ) : null}
            </div>
          )}
          <button className="warning-btn" onClick={handleChangeLanguage}>
            {currentLanguage}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
