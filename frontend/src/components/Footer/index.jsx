import "./style.scss"
import Heading from "../common/Heading"
import { Link } from "react-router-dom"
import SM from "../../assets/icons/sm.png"

function Footer() {
    return (
        <div className="footer-wrapper">
            <div className="footer-top">
                <div className="footer-logo">
                    <Heading size={2.5} color={"darkgray"}>
                        Fonte
                    </Heading>
                </div>
                <div className="footer-links">
                    <div className="left">
                        <Link to={"#"}>О нас</Link>
                        <Link to={"#"}>Команда</Link>
                        <Link to={"#"}>Блог</Link>
                        <Link to={"#"}>Продукты</Link>
                        <Link to={"#"}>Контакты</Link>
                    </div>
                    <div className="right">
                        <Link to={"#"}>Terms and conditions</Link>
                        <Link to={"#"}>Privacy policy</Link>
                    </div>
                </div>
                <div className="footer-sm">
                    <img src={SM} alt="Social Media" />
                </div>
            </div>
            <div className="footer-bottom"></div>
        </div>
    );
}

export default Footer;