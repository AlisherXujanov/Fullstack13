import "./style.scss"
import Heading from "../common/Heading"

function Footer() {
    return (
        <div className="footer-wrapper">
            <div className="footer-top">
                <div className="footer-logo">
                    <Heading size={2.5} color={"darkgray"}>
                        Fonte
                    </Heading>
                </div>
                <div className="footer-links"></div>
                <div className="footer-sm"></div>
            </div>
            <div className="footer-bottom"></div>
        </div>
    );
}

export default Footer;