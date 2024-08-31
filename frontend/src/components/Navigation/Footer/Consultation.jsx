import { useState } from 'react'
import "./consultation.scss"
import Wallpaper from "../../../assets/images/consultation-wallpaper.png"

function Consultation(props) {
    const [consultationForm, setConsultationForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
    function submit(e) {
        e.preventDefault()
    }

    return (
        <div className="consultation-wrapper">
            <form onSubmit={submit}>
                <div className="form-control">
                    <input id='consultation-person-fullname' type="text" name="fullname" placeholder='Full name' />
                </div>
                <div className="form-control row">
                    <div className="left">
                        <input id='consultation-person-email' type="email" name="email" placeholder='Email' />
                    </div>
                    <div className="right">
                        <input id='consultation-person-phone' type="tel" name="phone" placeholder='Phone' />
                    </div>
                </div>
                <div className="form-control">
                    <textarea id="consultation-person-message" name="message" placeholder="Message" />
                </div>
                <div className="form-control">
                    <button className='warning-btn'>Получить консультацию</button>
                </div>
            </form>
            <div className='image-wrapper'>
                <img src={Wallpaper} width={"100%"} height={550} />
            </div>
        </div>
    );
}

export default Consultation;