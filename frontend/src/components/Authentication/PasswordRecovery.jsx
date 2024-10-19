import "./authContent.scss"
import Heading from '../common/Heading'
import { useState, useContext } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { BASE_AUTH_URL, globalContext } from "../../store"


function PasswordRecovery(props) {
    const state = useContext(globalContext)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: "",
        emailError: ""
    })

    function submit(e) {
        e.preventDefault();
        setIsLoading(true)
        const URL = BASE_AUTH_URL + "users/reset_password/"
        try {
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: form.email })
            })
                .then(response => {
                    if (response.status == 204) {
                        toast.success("We have sent an email confirmation to your address", {theme:"dark"})
                        setIsLoading(false)
                        e.target.reset()
                        props.closeModal()
                        navigate('/')
                    } else {
                        setIsLoading(false)
                        toast.error("Ooops...!  Something went wrong.", {theme:"dark"})
                    }
                })
        }
        catch (e) {
            console.log(e)
        }
    }

    function goToLogin() {
        props.setSection("login")
    }

    function handleState(e) {
        const { name, value } = e.target;
        // =====================================================================
        // =====================================================================
        // VALIDATION
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        let error_msg = ''
        if (value.length > 0) {
            if (!emailPattern.test(value)) {
                error_msg = "Invalid email"
            }
        }
        // =====================================================================
        // =====================================================================
        setForm({
            ...form,
            [name]: value,
            [name + "Error"]: error_msg
        })
    }

    return (
        <div className="auth-content-wrapper">
            <Heading size={1.2}>Recover password</Heading>

            <button className="go-back-btn" onClick={goToLogin}>&lt;</button>
            {isLoading && (<div className="loading-content"><div className="hollow-dots-spinner">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div></div>)}
            <form onSubmit={submit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input
                        className={form.email ? "error" : ""}
                        type="email" id="email" placeholder='Email' name='email'
                        onChange={handleState}
                    />
                    {
                        form.emailError.length > 0 ?
                            <p className='error'>{form.emailError}</p>
                            : null
                    }
                    <p className="help-text">
                        Enter your email address and <br /> we will send you a link to reset your password.
                    </p>
                </div>

                <div className="form-control">
                    <button type="submit" className="warning-btn">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default PasswordRecovery;