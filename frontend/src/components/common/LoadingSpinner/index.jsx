import './style.scss';


function LoadingSpinner(props) {
    return (
        <div className={props.offset ? "spinner-wrapper offset" : "spinner-wrapper"}>

            {
                props.offset ?
                    <div class="looping-rhombuses-spinner">
                        <div class="rhombus"></div>
                        <div class="rhombus"></div>
                        <div class="rhombus"></div>
                    </div>
                    :
                    <div className="fulfilling-bouncing-circle-spinner">
                        <div className="circle"></div>
                        <div className="orbit"></div>
                    </div>
            }
        </div>
    );
}

export default LoadingSpinner;