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