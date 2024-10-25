import { Link, NavLink, useNavigate } from "react-router-dom";
import Heading from "../../common/Heading";
import Authentication from "../../Authentication";
import { useEffect, useContext, useState } from "react";
import { BASE_URL, globalContext } from "../../../store";
import { getUserProfile, fetchLogout } from "../../../store/helpers";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Arrowdown from "../../../assets/icons/arrowdown.svg";
import "./style.scss";

function Navbar() {
  const state = useContext(globalContext);
  const navigate = useNavigate();
  const [, setIsLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [isOpen, setIsOpen] = useState(false); // Состояние для выпадающего списка

  useEffect(() => {
    fetchGetUserProfile();
  }, []);

  async function fetchGetUserProfile(profilePictureUpdate = false) {
    if (!profilePictureUpdate) {
      setIsLoading(true);
    }
    const userData = await getUserProfile();
    setIsLoading(false);
    setProfile(userData);
  }

  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ru" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  function closeModal() {
    state.dispatch({ type: "SET_AUTH_MODAL", payload: false });
  }

  async function logout() {
    state.dispatch({ type: "LOGOUT" });
    await fetchLogout();
    navigate("/");
    toast.success("You have successfully logged out", { theme: "dark" });
  }

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Переключаем состояние выпадающего списка
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
              <h4 onClick={toggleDropdown}>
                <img
                  src={BASE_URL + profile?.image}
                  alt=""
                  className="profile-img-in-navbar"
                />
                {state.profile?.user?.username}
                <img src={Arrowdown} alt="" className="arrow-dropdown" />
              </h4>
              {isOpen && (
                <div className="dropdown-content">
                  <Link to="profile" className="dropdown-item">
                    <button className=" dropdown-item">Profile</button>
                  </Link>
                  <Link className="dropdown-item">
                    <button className="dropdown-item" onClick={logout}>
                      Выйти
                    </button>
                  </Link>
                </div>
              )}
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
              {state.authModalOpened && (
                <Authentication closeModal={closeModal} />
              )}
            </div>
          )}
          <button className="warning-btn" onClick={handleChangeLanguage}>
            {currentLanguage}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
