import './style.scss';

function LoadingSpinner() {
    return (
        <div className="spinner-wrapper">
            <div className="fulfilling-bouncing-circle-spinner">
                <div className="circle"></div>
                <div className="orbit"></div>
            </div>
        </div>
    );
}

export default LoadingSpinner;