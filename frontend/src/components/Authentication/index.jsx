import { useState,useEffect } from 'react'
import Registration from './Registration.jsx'
import Login from './Login.jsx'
import PasswordRecovery from './PasswordRecovery.jsx'
import './style.scss'

function Authentication(props) {
    const [authSection, setAuthSection] = useState("login")

    function setSection(section) {
        setAuthSection(section)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                props.closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [props.closeModal]);

    return (
        <div id='authentication-wrapper'>
            <section className='content'>
                <button className="close-btn" onClick={props.closeModal}>&times;</button>
                {
                    authSection == "passwordRecovery" ?
                        <PasswordRecovery setSection={setSection} closeModal={props.closeModal} />
                        :
                        authSection == "register" ?
                            <Registration setSection={setSection} />
                            :
                            <Login closeModal={props.closeModal} setSection={setSection} />
                }

                {
                    ["register", "login"].includes(authSection) &&
                    <p>
                        <small>
                            {authSection == "login" ? 'Don\'t have an account?' : 'Already have an account?'}

                            <button className='toggle-auth'
                                onClick={() => setSection(authSection == "register" ? 'login' : 'register')}
                            >
                                {authSection == "login" ? 'Create an account' : 'Sign in'}
                            </button>
                        </small>
                    </p>
                }
            </section>
        </div>
    );
}

export default Authentication;