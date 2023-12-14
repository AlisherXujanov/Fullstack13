import "./style.scss"
import HeadingVector from "../../../assets/icons/headingVector.png"

function Heading(props) {
    const fontSize = {
        fontSize: `calc(48px / ${props.size})`
    }

    return (
        <div className="heading-wrapper" style={fontSize}>
            <img src={HeadingVector} alt="Heading Vector" />
            <h2>{props.children}</h2>
        </div>
    );
}

export default Heading;