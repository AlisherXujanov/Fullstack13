import { useState,useEffect } from "react";
import Heading from "../../common/Heading";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./style.scss";

const Modal = ({ show, onClose, title, content, link }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (show) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [show]);

  if (!show && !isClosing) return null;

  return (
    <div className={`modal-overlay ${isClosing ? "fade-out" : ""}`}>
      <div className={`modal-content ${isClosing ? "fade-out" : ""}`}>
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="modal-buttons">
          <button onClick={handleClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "", link: "" });

  const handleLinkClick = (title, content, link) => {
    setModalContent({ title, content, link });
    setShowModal(true);
  };

  return (
    <div className="footer-wrapper">
      <footer className="main-footer">
        <div className="left-side">
          <div className="heading-wrapper">
            <Heading size={1.2} gray={true}>Fonte</Heading>
          </div>
          <div className="footer-links">
            <div className="left">
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>О нас</NavLink>
              <NavLink to="/team" className={({ isActive }) => isActive ? "active" : ""}>Команда</NavLink>
              <NavLink to="/blog" className={({ isActive }) => isActive ? "active" : ""}>Блог</NavLink>
              <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>Продукты</NavLink>
              <NavLink to="/contacts" className={({ isActive }) => isActive ? "active" : ""}>Контакты</NavLink>
            </div>
           <div className="right">
              <span className="Terms" onClick={() => handleLinkClick(`Terms and conditions", "
                Соглашение
                Используя наши Сервисы, вы соглашаетесь с этими Правилами. Если вы не согласны с этими Правилами, пожалуйста, не используйте наши Сервисы.
                Изменения
                Мы оставляем за собой право изменять эти Правила в любое время без предварительного уведомления. Последняя версия Правил будет опубликована на нашем веб-сайте. Ваша обязанность проверять эти Правила на наличие изменений. Продолжая использовать наши Сервисы после внесения изменений, вы соглашаетесь с новыми Правилами.
                Пользователи
                Наши Сервисы доступны только лицам, достигшим совершеннолетия в соответствии с законодательством своей страны. .`, "")}>
                Terms and conditions
              </span>

              <span className="Privacy" onClick={() => handleLinkClick(`Privacy policy", "* Введение. Краткое описание того, что такое ваша компания, какой сервис вы предоставляете, и как собираете и используете информацию. 
                * Какую информацию вы собираете. Опишите все типы информации, которые вы собираете, например, имя, адрес электронной почты, контактные данные, историю покупок, информацию о устройствах, данные о местоположении, сведения о cookies, и другую информацию, которую вы получаете от пользователей. 
                * Как вы используете собранную информацию. Объясните, для каких целей вы используете собранную информацию, например, для предоставления сервисов, улучшения сервисов, отправки рекламных сообщений, проведения исследований, персонализации контента, обеспечения безопасности и защиты от мошенничества.
                * С кем вы делитесь информацией. Укажите, кому вы можете передавать собранную информацию, например, вашим партнерам, поставщикам услуг, рекламным сетям, государственным органам. 
                * Как вы защищаете информацию. Опишите, какие меры безопасности вы применяете для защиты личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения.
                * Права пользователей. Укажите, какие права у пользователей в отношении собранной информации, например, право доступа к информации, право на ее исправление, право на удаление, право отказаться от обработки данных, право на перенос данных. 
                * Изменения в политике конфиденциальности. Укажите, что вы можете время от времени вносить изменения в политику конфиденциальности и как вы будете уведомлять пользователей об этих изменениях. 
                * Как связаться с нами. Укажите, как пользователи могут связаться с вами по вопросам, связанным с политикой конфиденциальности.
                * Cookie-файлы. Укажите, что вы используете cookie-файлы и для чего они используются. 
                * Информация для детей. Если вы собираете информацию от детей, вам нужно включить специальный раздел, посвященный защите информации детей.
                .`, "/")}>
                Privacy policy
               </span>
            </div>

          </div>
        </div>
        <div className="footer-social-media">
        <span>
            <FaFacebookF className="facebook" />
          </span>
          <span>
            <FaInstagram className="instagram" />
          </span>
          <span>
            <FaTwitter className="twitter" />
          </span>
        </div>
      </footer>

      <Modal 
        show={showModal}
        onClose={() => setShowModal(false)}
        title={modalContent.title}
        content={modalContent.content}
        link={modalContent.link}
      />
    </div>
  );
}

export default Footer;