import './style.scss'

function Heading(props) {
    const size = `${48 / props.size}px`

    return (
        <h1 style={{fontSize: size}}>
            {props.children}
        </h1>
    );
}

export default Heading;