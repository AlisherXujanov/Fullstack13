

function Member(props) {
    return (
        <div className="member-wrapper">
            <img src={props.image} />
            <h4 className='name'>{props.name}</h4>
            <h4 className='title'>{props.title}</h4>
        </div>
    );
}

export default Member;