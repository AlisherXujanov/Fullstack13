import "./style.scss"
import HeadingVector from "../../../assets/icons/headingVector.png"

function Heading(props) {
    const style = {
        fontSize: `calc(48px / ${props.size})`,
        color: props.color ? props.color : "",
        filter: props.color ? "grayscale(100%)" : "",
    }

    return (
        <div className="heading-wrapper" style={style}>
            <img src={HeadingVector} alt="Heading Vector" />
            <h2>{props.children}</h2>
        </div>
    );
}

export default Heading;