import { useState } from "react";
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

  if (!show && !isClosing) return null;

  return (
    <div className={`modal-overlay ${isClosing ? "fade-out" : ""}`}>
      <div className={`modal-content ${isClosing ? "fade-out" : ""}`}>
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="modal-buttons">
          <button onClick={handleClose}>Закрыть</button>
          <NavLink to={link} onClick={handleClose} className="nav-button">
            Перейти
          </NavLink>
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
              <span onClick={() => handleLinkClick("О нас", "Наша команда Fullstack – это не просто коллектив, это настоящий отряд героев, готовых покорять любые инвестиционные вершины. Глава Алишер всегда держит руку на пульсе, давая стратегические указания, а AkerFer и Ойбеки без устали оптимизируют и масштабируют. Когда ночь спускается на код, на помощь приходит Batman — никто не знает, когда он спит, но все знают, что он спасет проект в самый неожиданный момент. ", "/")}>
                О нас
              </span>
              <span onClick={() => handleLinkClick("Команда", "Мы — команда опытных программистов, увлеченных созданием инновационных решений и совершенствованием цифрового мира. Наш коллектив состоит из специалистов с разнообразным опытом в разработке веб-приложений, мобильных приложений, баз данных и многого другого. Мы гордимся нашим подходом к работе: используем новейшие технологии, стремимся к постоянному обучению и следуем принципам качественного кода.", "/team")}>
                Команда
              </span>
              <span onClick={() => handleLinkClick("Блог", "Добро пожаловать в наш блог программистов! Здесь мы делимся опытом, идеями и новыми знаниями из мира разработки. Мы пишем статьи, которые будут полезны как начинающим разработчикам, так и опытным специалистам. Темы нашего блога охватывают широкий спектр технологий: от веб-разработки и мобильных приложений до работы с базами данных, DevOps и искусственного интеллекта.", "/blog")}>
                Блог
              </span>
              <span onClick={() => handleLinkClick("Продукты", "Наши продукты — это результат объединения креативности, технического мастерства и страсти к инновациям. Мы создаем программные решения, которые помогают бизнесам и пользователям достигать своих целей быстрее и эффективнее. Наша команда программистов разрабатывает разнообразные продукты — от веб- и мобильных приложений до сложных корпоративных систем и автоматизированных инструментов.", "/products")}>
                Продукты
              </span>
              <span onClick={() => handleLinkClick("Контакты", "Свяжитесь с нами.", "/contacts")}>
                Контакты
              </span>
            </div>
            <div className="right">
              <span onClick={() => handleLinkClick("Terms and conditions", "Правила и условия использования.", "/terms")}>
                Terms and conditions
              </span>

<span onClick={() => handleLinkClick("Privacy policy", "Политика конфиденциальности.", "/privacy")}>
                Privacy policy
              </span>
            </div>
          </div>
        </div>
        <div className="footer-social-media">
          <span><FaFacebookF className="social-icon facebook" /></span>
          <span><FaInstagram className="social-icon instagram" /></span>
          <span><FaTwitter className="social-icon twitter" /></span>
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