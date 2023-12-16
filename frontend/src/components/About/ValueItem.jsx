function ValueItem(props) {
    return (
        <div className="value-item">
            <span></span>
            <img src={props.image} alt="Value" />
            <div className='value-info'>
                <h2>{props.title}</h2>
                <p>{props.subtitle}</p>
            </div>
        </div>
    );
}

export default ValueItem;