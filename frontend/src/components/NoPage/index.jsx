import NoPageImage from '../../assets/images/404.png'
import "./style.scss";

function NoPage() {
    return (
        <main className="no-page-wrapper">
            <img src={NoPageImage} alt='No Page Found'/>
        </main>
    );
}

export default NoPage;