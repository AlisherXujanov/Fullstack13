import Heading from "../../common/Heading";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.scss";


function Footer() {
  return (
    <div className="footer-wrapper">
      <footer className="main-footer">
        <div className="left-side">
          <div className="heading-wrapper">
            <Heading size={1.2} gray={true}>Fonte</Heading>
          </div>
          <div className="footer-links">
            <div className="left">
              <a href="#">О нас</a>
              <Link to="team/">Команда</Link>
              <a href="#">Блог</a>
              <a href="#">Продукты</a>
              <a href="#">Контакты</a>
            </div>
            <div className="right">
              <a href="#">Terms and conditions</a>
              <a href="#">Privacy policy</a>
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
      <div className="section">
        <h3>©  {new Date().toString()}•  Fonte • All rights reserved</h3>
     
        <p>
          Частная компания « FONTE Capital Ltd.», зарегистрированная по адресу:
          Есильский район, г. Нур-Султан, Мангилик Ел, 55/20, офис 345-346, БИН
          220140900035, осуществляет свою деятельность в соответствии с
          законодательством Международного Финансового центра «Астана» (МФЦА)
          имеет право осуществлять регулируемую деятельность по управлению
          коллективными инвестициями – на основании лицензии №
          AFSA-A-LA-2022-0004, от 27 января 2022 года на бессрочной основе
          Стоимость инвестиции инвестора в инвестиционный фонд может
          увеличиваться или уменьшаться.    
        </p>
        <p>Результаты инвестирования в прошлом не
          определяют доходы в будущем. Управляющая компания инвестиционного
          фонда или МФЦА не гарантируют доходности инвестиций. Инвестору
          необходимо ознакомиться с Уставом (Constitution) и Инвестиционным
          меморандумом (Offering Memorandum) инвестиционного фонда, его
          инвестиционной декларацией и определенными рисками перед
          инвестированием активов в инвестиционный фонд.</p>
      </div>
    </div>
  );
}

export default Footer;


//  date : new Date().toString()