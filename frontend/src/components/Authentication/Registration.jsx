import "./authContent.scss"
import Heading from '../common/Heading'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { registerNewUser } from "../../store/helpers.js"


function Registration(props) {
    const [regState, setRegState] = useState({
        username: '',
        email: '',
        password: '',
        re_password: ''
    })
    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        password: '',
        re_password: ''
    })

    async function submit(e) {
        e.preventDefault();

        if (!regState.username || !regState.email || !regState.password || !regState.re_password) {
            toast.error("Please, fill in all fields", { theme: 'dark' })
            return
        } else if (regState.password !== regState.re_password) {
            toast.error("Passwords do not match", { theme: 'dark' })
            return
        }
        const newUser = {
            username: regState.username,
            email: regState.email,
            password: regState.password,
            re_password: regState.re_password
        }
        try {
            let response = await registerNewUser(newUser)
            let status_code = response.status
            let data = await response.json()

            if (status_code == 400) {
                for (let key in data) {
                    toast.error(String(data[key]), { theme: 'dark' })
                }
            } else {
                toast.success("Account successfully created. Now You can log in!", { theme: 'dark' })
                props.setIsRegistered()
            }
        }
        catch (error) {
            toast.error(error, { theme: 'dark' })
        }
        finally {
            e.target.reset()
        }
    }

    function handleState(e) {
        validate(e.target)

        const key = e.target.name
        const val = e.target.value
        setRegState({ ...regState, [key]: val })
    }

    function validate({ name, value }) {
        const usernamePattern = /^[a-zA-Z0-9_]{1,10}$/
        const passwordPattern = /^[a-zA-Z0-9_$&]{5,}$/
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        let error_msg = ''
        if (value.length > 0) {
            if (name == 'username') {
                if (!usernamePattern.test(value)) {
                    error_msg = "Symbols are not allowed. Length 1-10"
                }
            }
            else if (name == 'password') {
                if (value.length >= 5 && !passwordPattern.test(value)) {
                    error_msg = "Symbols are not allowed except:($,&,_). Length 5+"
                }
            }
            else if (name == 're_password') {
                if (!passwordPattern.test(value)) {
                    error_msg = "Password confirmation is invalid"
                }
            }
            else if (name == 'email') {
                if (!emailPattern.test(value)) {
                    error_msg = "Invalid email"
                }
            }
            else {
                throw new Error('Unknown input field')
            }
        }
        setFormErrors({ ...formErrors, [name]: error_msg })
    }


    return (
        <div className="auth-content-wrapper">
            <Heading size={1.2}>Sign up</Heading>

            <form onSubmit={submit}>
                <div className="form-control">
                    <label htmlFor="name">Username</label>
                    <input
                        className={formErrors.username ? "error" : ""}
                        type="name" id="name" placeholder='Username' name='username'
                        onChange={handleState}
                    />
                    {
                        formErrors.username.length > 0 ?
                            <p className='error'>{formErrors.username}</p>
                            : null
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input
                        className={formErrors.email ? "error" : ""}
                        type="email" id="email" placeholder='Email' name='email'
                        onChange={handleState}
                    />
                    {
                        formErrors.email.length > 0 ?
                            <p className='error'>{formErrors.email}</p>
                            : null
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input
                        className={formErrors.password ? "error" : ""}
                        type="password" id="password" placeholder='Password' name='password'
                        onChange={handleState}
                    />
                    {
                        formErrors.password.length > 0 ?
                            <p className='error'>{formErrors.password}</p>
                            : null
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="password-conf">Password confirmation</label>
                    <input
                        className={formErrors.re_password ? "error" : ""}
                        type="password" id="password-conf" placeholder='Password confirmation' name='re_password'
                        onChange={handleState}
                    />
                    {
                        formErrors.re_password.length > 0 ?
                            <p className='error'>{formErrors.re_password}</p>
                            : null
                    }
                </div>
                <div className="form-control">
                    <button className='warning-btn'>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Registration;