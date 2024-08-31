import NoPageImage from '../../assets/images/404.png'
import "./style.scss";

function NoPage() {
    return (
        <main className="no-page-wrapper">
            <img src={NoPageImage} alt='No Page Found'/>

            <br />
            <br />

            <a href="/" className='warning-btn'>
                Home
            </a>
        </main>
    );
}

export default NoPage;