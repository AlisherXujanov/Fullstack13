import { useState } from 'react'
import "./consultation.scss"
import Wallpaper from "../../../assets/images/consultation-wallpaper.png"
import emailjs from 'emailjs-com'
import {useTranslation} from 'react-i18next'
function Consultation(props) {
    const {t} = useTranslation()
    const [consultationForm, setConsultationForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [showNotification, setShowNotification] = useState(false); // Состояние для уведомления

    function handleChange(e) {
        const { name, value } = e.target;
        setConsultationForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function submit(e) {
        e.preventDefault();

        emailjs.send(
            'service_bbzdt93',          
            'template_7vvcwpm',         
            consultationForm,           
            'NRrlEd80ZDPVi3h4-'  
        ).then((response) => {
            console.log('SUCCESS!', response.status, response.text);

            setConsultationForm({
                name: '',
                email: '',
                phone: '',
                message: ''
            });

            setShowNotification(true);

            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }).catch((err) => {
            console.error('FAILED...', err);
        });
    }

    return (
        <div className="consultation-wrapper">
            <form onSubmit={submit}>
                <div className="form-control">
                    <input 
                        id='consultation-person-fullname' 
                        type="text" 
                        name="name" 
                        placeholder={t('consultation.fullname')} 
                        value={consultationForm.name} 
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control row">
                    <div className="left">
                        <input 
                            id='consultation-person-email' 
                            type="email" 
                            name="email" 
                            placeholder={t('consultation.email')}
                            value={consultationForm.email} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="right">
                        <input 
                            id='consultation-person-phone' 
                            type="tel" 
                            name="phone" 
                            placeholder={t('consultation.phone')}
                            value={consultationForm.phone} 
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-control">
                    <textarea 
                        id="consultation-person-message" 
                        name="message" 
                        placeholder={t('consultation.message')}
                        value={consultationForm.message} 
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control">
                    <button className='warning-btn'>{t('consultation.get-consultation')}</button>
                </div>
            </form>

            {showNotification && (
                <div className="notification">
                    {t('consultation.notification')}!
                </div>
            )}

            <div className='image-wrapper'>
                <img src={Wallpaper} width={"100%"} height={550} />
            </div>
        </div>
    );
}

export default Consultation;
