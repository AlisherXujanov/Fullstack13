import Registration from './Registration.jsx';
import Login from './Login.jsx';
import { useState } from 'react';
import './style.scss'


function Authentication(props) {
    const [isRegistred, setIsRegistred] = useState(true)

    function setIsRegistered() {
        setIsRegistred(true)
    }

    return (
        <div id='authentication-wrapper'>
            <section className='content'>
                <button className="close-btn" onClick={props.closeModal}>&times;</button>
                {
                    isRegistred ? 
                        <Login closeModal={props.closeModal} /> 
                            : <Registration setIsRegistered={setIsRegistered} />
                }

                <p>
                    <small>
                        {isRegistred ? 'Don\'t have an account?' : 'Already have an account?'}

                        <button style={{ cursor: 'pointer' }} className='toggle-auth'
                            onClick={() => setIsRegistred(!isRegistred)}
                        >
                            {isRegistred ? 'Create an account' : 'Log in'}
                        </button>
                    </small>
                </p>
            </section>
        </div>
    );
}

export default Authentication;