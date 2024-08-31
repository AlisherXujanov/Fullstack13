import Vector from '../../../assets/icons/Vector.png';
import './style.scss'




function Heading(props) {
    let fontSize = props.size
        ? (40 / props.size) + "px"
        : '40px';

    let smallScreen = 750
    if (window.innerWidth < smallScreen) {
        fontSize = '25px'
    }

    return (
        <div className={props.gray ? "heading-wrapper gray" : "heading-wrapper"}>
            <h1 style={{ fontSize }}>
                <span>{props.children}</span>
                <img src={Vector} alt="Vector" />
            </h1>
        </div>
    );
}

export default Heading;