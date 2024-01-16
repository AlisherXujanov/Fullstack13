import './style.scss'
import Rectangle from './Rectangle.png'

function Heading(props) {
    const size = `${48 / props.size}px`

    return (
        <h1 className='heading-component' style={{fontSize: size}}>
            <img src={Rectangle} alt="Rectangle" />
            {props.children}
        </h1>
    );
}

export default Heading;